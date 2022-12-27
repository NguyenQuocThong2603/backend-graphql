const { Post } = require('../../models');
const { getSelectedFieldsWithoutRecursive, code, statusCode, createGeneralResponse } = require('../../utils');
const { throwError } = require('../../../utils');

function createPost(args, context) {
  const { user } = context;
  const { title, content, status } = args;
  const post = new Post({
    title,
    owner: user._id,
    content,
    status,
  });
  return post.save();
}

async function updatePost(args, context, info) {
  const { user } = context;
  const { id, ...updateInformation } = args.input;
  const fields = getSelectedFieldsWithoutRecursive(info.fieldNodes[0].selectionSet.selections);
  const post = await Post.findOneAndUpdate({
    _id: id,
    owner: user._id,
  }, { ...updateInformation }, { returnDocument: 'after' }).select(fields).lean();

  if (!post) {
    throwError(code.BAD_REQUEST, 'Update post failed', statusCode.BAD_REQUEST);
  }
  return post;
}

async function deletePost(args, context) {
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
}

async function hidePost(args, context) {
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
}

module.exports = {
  createPost,
  updatePost,
  deletePost,
  hidePost,
};
