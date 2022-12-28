const _ = require('lodash');
const { Post, Comment } = require('../../models');
const { createGeneralResponse, getSelectedFieldsWithoutRecursive, code, statusCode } = require('../../utils');
const { throwError } = require('../../../utils');

async function comment(args, context) {
  const { user } = context;
  const { postId, ...content } = args.input;
  const post = await Post.findOne({
    _id: postId,
  }, { status: 1 }).lean();

  if (!post || post.status === 'Hidden' || post.status === 'Draft' || post.status === 'Deleted') {
    throwError(code.BAD_REQUEST, 'Comment failed', statusCode.BAD_REQUEST);
  }

  const newComment = new Comment({
    post: postId,
    user: user._id,
    ...content,
  });
  return newComment.save();
}

async function updateComment(args, context, info) {
  const { user } = context;
  const { commentId, ...content } = args.input;
  const fields = getSelectedFieldsWithoutRecursive(info.fieldNodes[0].selectionSet.selections);

  const commentInDB = await Comment.findOneAndUpdate({
    _id: commentId,
    user: user._id,
  }, { ...content }, { returnDocument: 'after' }).select(fields).lean();

  if (!commentInDB) {
    throwError(code.BAD_REQUEST, 'Update Comment failed', statusCode.BAD_REQUEST);
  }

  return commentInDB;
}

async function reply(args, context) {
  const { user } = context;
  const { commentId, ...content } = args.input;

  const commentInDB = await Comment.findOne({
    _id: commentId,
  }, { _id: 1, post: 1 }).lean();

  if (!commentInDB) {
    throwError(code.BAD_REQUEST, 'Reply comment failed', statusCode.BAD_REQUEST);
  }

  const newReplyComment = new Comment({
    ...content,
    user: user._id,
    post: commentInDB.post,
    parent: commentId,
  });
  return newReplyComment.save();
}

async function deleteComment(args, context) {
  const { user } = context;
  const { id } = args;
  let ids = [id];
  const deleteResult = await Comment.deleteOne({
    user: user._id,
    _id: id,
  });
  do {
    const subComment = await Comment.find({
      _id: ids,
    }, { _id: 1 }).lean();
    ids = [...subComment];
    await Comment.deleteMany({
      _id: subComment._id,
    });
  } while (!ids);

  if (!deleteResult.deletedCount) {
    return createGeneralResponse(false, 'Delete comment failed');
  }

  return createGeneralResponse(true, 'Delete comment succeed');
}
module.exports = {
  comment,
  updateComment,
  deleteComment,
  reply,
};
