const { Post } = require('../../models');
const { getSelectedFieldsWithoutRecursive, createGeneralResponse } = require('../../utils');
const { throwError } = require('../../../utils');

function createPost(parent, args, context, info) {
  try {
    const { user } = context;
    const { title, content, status } = args;
    const post = new Post({
      title,
      owner: user._id,
      content,
      status,
    });
    return post.save();
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    throwError('Internal server error');
  }
}

async function updatePost(parent, args, context, info) {
  try {
    const { user } = context;
    const { id, ...updateInformation } = args.input;
    const fields = getSelectedFieldsWithoutRecursive(info.fieldNodes[0].selectionSet.selections);
    const post = await Post.findOneAndUpdate({
      _id: id,
      owner: user._id,
    }, { ...updateInformation }, { returnDocument: 'after' }).select(fields).lean();

    if (!post) {
      throwError('Update post failed');
    }
    return post;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    throwError('Internal server error');
  }
}

async function deletePost(parent, args, context, info) {
  try {
    const { user } = context;
    const { id } = args;
    const post = await Post.findOne({
      _id: id,
      owner: user._id,
    }, { status: 1 });

    if (!post || post.status === 'Deleted') {
      return createGeneralResponse(false, 'Delete post failed');
    }
    post.status = 'Deleted';
    await post.save();
    return createGeneralResponse(true, 'Delete post succeed');
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return createGeneralResponse(false, 'Internal server error');
  }
}

async function hidePost(parent, args, context, info) {
  try {
    const { user } = context;
    const { id } = args;
    const post = await Post.findOne({
      _id: id,
      owner: user._id,
    }, { status: 1 });

    if (!post || post.status === 'Deleted' || post.status === 'Hidden') {
      return createGeneralResponse(false, 'Hide post failed');
    }
    post.status = 'Hidden';
    await post.save();
    return createGeneralResponse(true, 'Hide post succeed');
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return createGeneralResponse(false, 'Internal server error');
  }
}

module.exports = {
  createPost,
  updatePost,
  deletePost,
  hidePost,
};
