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
    return posts;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    throwError('Internal server error');
  }
}

module.exports = {
  getPost,
  getPosts,
};
