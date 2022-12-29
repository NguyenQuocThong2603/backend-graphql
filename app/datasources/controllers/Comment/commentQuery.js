const { getSelectedFieldsWithoutRecursive } = require('../../utils');
const { Comment } = require('../../models');
const { throwError } = require('../../../utils');

async function replies(parent, args, context, info) {
  try {
    const { commentId, limit, offset } = args.input;
    const fields = getSelectedFieldsWithoutRecursive(info.fieldNodes[0].selectionSet.selections);

    const comments = await Comment.find({
      parent: commentId,
    }).select(fields).limit(limit).skip(offset)
      .lean();

    return comments;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}

// Dataloader functions

async function getUser(parent, args, context, info) {
  const { user } = parent;
  if (!user) return null;
  const userInDB = await context.loaders.userOfComment.load(user.toString());
  return userInDB;
}

async function getPost(parent, args, context, info) {
  const { post } = parent;
  if (!post) return null;
  const postInDB = await context.loaders.postOfComment.load(post.toString());
  return postInDB;
}
module.exports = {
  replies,
  getUser,
  getPost,
};
