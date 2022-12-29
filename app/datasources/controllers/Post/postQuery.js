const { Post } = require('../../models');
const { getSelectedFieldsWithoutRecursive } = require('../../utils');
const { throwError } = require('../../../utils');

async function getPost(parent, args, context, info) {
  try {
    const { id } = args;
    const fields = getSelectedFieldsWithoutRecursive(info.fieldNodes[0].selectionSet.selections);
    const post = await Post.findOne({
      _id: id,
    }).select(fields).lean();

    if (!post) {
      throwError('Post not found');
    }
    return post;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    throwError('Internal server error');
  }
}

async function getPosts(parent, args, context, info) {
  try {
    const { limit, offset, ...filter } = args.input;
    const fields = getSelectedFieldsWithoutRecursive(info.fieldNodes[0].selectionSet.selections);
    const posts = Post.find({
      ...filter,
    }).limit(limit).skip(offset).select(fields)
      .lean();

    if (!posts) {
      throwError('Posts not found');
    }

    return posts;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    throwError('Internal server error');
  }
}

// Dataloader functions

async function getClapCount(parent, args, context, info) {
  const { _id } = parent;
  if (!_id) return null;
  const clapCount = await context.loaders.clapCountOfPost.load(_id.toString());
  return clapCount;
}

async function getOwner(parent, args, context, info) {
  const { owner } = parent;
  if (!owner) return null;
  const ownerInDB = await context.loaders.ownerOfPost.load(owner.toString());
  return ownerInDB;
}

module.exports = {
  getPost,
  getPosts,
  getClapCount,
  getOwner,
};
