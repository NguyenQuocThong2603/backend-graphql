const { Clap, Post } = require('../../models');
const { getSelectedFieldsWithoutRecursive, code, status } = require('../../utils');
const { throwError } = require('../../../utils');

async function getPost(args, info) {
  try {
    const { id } = args;
    const fields = getSelectedFieldsWithoutRecursive(info.fieldNodes[0].selectionSet.selections);
    const post = await Post.findOne({
      _id: id,
    }).select(fields).lean();
    return post;
  } catch (err) {
    return throwError(code.NOT_FOUND, 'Post not found', status.NOT_FOUND);
  }
}

async function getPosts(args, info) {
  const { limit, offset, ...filter } = args.input;
  const fields = getSelectedFieldsWithoutRecursive(info.fieldNodes[0].selectionSet.selections);
  const posts = Post.find({
    ...filter,
  }).limit(limit).skip(offset).select(fields)
    .lean();

  return posts;
}

async function getClapCount(parent, context) {
  const { _id } = parent;
  const numberOfClaps = await Clap.find({
    post: _id,
  }).count();
  return numberOfClaps;
}

async function getOwner(parent, context) {
  const { owner } = parent;
  if (!owner) return null;
  const ownerInDB = context.dataSources.loaders.postLoader.postLoaderOwner.load(owner);
  return ownerInDB;
}

module.exports = {
  getPost,
  getPosts,
  getClapCount,
  getOwner,
};
