const { Post, Comment } = require('../../models');
const { code, statusCode } = require('../../utils');
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
module.exports = {
  comment,
};
