async function getUser(comment, args, context, info) {
  const { user } = comment;
  if (!user) return null;
  const userInDB = await context.loaders.userOfComment.load(user.toString());
  return userInDB;
}

async function getPost(comment, args, context, info) {
  const { post } = comment;
  if (!post) return null;
  const postInDB = await context.loaders.postOfComment.load(post.toString());
  return postInDB;
}

const commentResolver = {
  user: getUser,
  post: getPost,
};

module.exports = commentResolver;
