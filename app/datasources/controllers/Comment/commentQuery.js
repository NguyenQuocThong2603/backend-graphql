const { getSelectedFieldsWithoutRecursive } = require('../../utils');
const { Comment } = require('../../models');

async function replies(args, info) {
  const { commentId, limit, offset } = args.input;
  const fields = getSelectedFieldsWithoutRecursive(info.fieldNodes[0].selectionSet.selections);

  const comments = await Comment.find({
    parent: commentId,
  }).select(fields).limit(limit).skip(offset)
    .lean();

  return comments;
}

// Dataloader functions

async function getUser(parent, context) {
  const { user } = parent;
  if (!user) return null;
  const userInDB = await context.dataSources.loaders.commentLoader.commentLoaderUser.load(user);
  return userInDB;
}

async function getPost(parent, context) {
  const { post } = parent;
  if (!post) return null;
  const postInDB = await context.dataSources.loaders.commentLoader.commentLoaderPost.load(post);
  return postInDB;
}
module.exports = {
  replies,
  getUser,
  getPost,
};
