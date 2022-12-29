const _ = require('lodash');
const { Post, Comment } = require('../../models');
const { createGeneralResponse, getSelectedFieldsWithoutRecursive } = require('../../utils');
const { throwError } = require('../../../utils');

async function comment(parent, args, context, info) {
  try {
    const { user } = context;
    const { postId, ...content } = args.input;
    const post = await Post.findOne({
      _id: postId,
    }, { status: 1 }).lean();

    if (!post || post.status === 'Hidden' || post.status === 'Draft' || post.status === 'Deleted') {
      throwError('Comment failed');
    }

    const newComment = new Comment({
      post: postId,
      user: user._id,
      ...content,
    });
    return newComment.save();
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    throwError('Internal server error');
  }
}

async function updateComment(parent, args, context, info) {
  try {
    const { user } = context;
    const { commentId, ...content } = args.input;
    const fields = getSelectedFieldsWithoutRecursive(info.fieldNodes[0].selectionSet.selections);

    const commentInDB = await Comment.findOneAndUpdate({
      _id: commentId,
      user: user._id,
    }, { ...content }, { returnDocument: 'after' }).select(fields).lean();

    if (!commentInDB) {
      throwError('Update comment failed');
    }

    return commentInDB;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    throwError('Internal server error');
  }
}

async function reply(parent, args, context, info) {
  try {
    const { user } = context;
    const { commentId, ...content } = args.input;

    const commentInDB = await Comment.findOne({
      _id: commentId,
    }, { _id: 1, post: 1 }).lean();

    if (!commentInDB) {
      throwError('Reply comment failed');
    }

    const newReplyComment = new Comment({
      ...content,
      user: user._id,
      post: commentInDB.post,
      parent: commentId,
    });
    return newReplyComment.save();
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    throwError('Internal server error');
  }
}

async function deleteComment(parent, args, context, info) {
  const { user } = context;
  const { id } = args;
  const deleteResult = await Comment.deleteOne({
    user: user._id,
    _id: id,
  });

  if (!deleteResult.deletedCount) {
    return createGeneralResponse(false, 'Delete comment failed');
  }

  const idsOfSubComment = [];
  let subComments = null;
  let isFirstTime = true;
  let index = 0;

  do {
    if (isFirstTime) {
      isFirstTime = false;
      subComments = await Comment.find({
        parent: id,
      }, { _id: 1 }).lean();
      subComments.forEach(subComment => {
        idsOfSubComment.push(subComment._id);
      });
    } else {
      subComments = await Comment.find({
        parent: idsOfSubComment[index],
      }, { _id: 1 }).lean();
      subComments.forEach(subComment => {
        idsOfSubComment.push(subComment._id);
      });
      index += 1;
    }
  } while (index !== idsOfSubComment.length);

  await Comment.deleteMany({
    _id: { $in: idsOfSubComment },
  });

  return createGeneralResponse(true, 'Delete comment succeed');
}
module.exports = {
  comment,
  updateComment,
  deleteComment,
  reply,
};
