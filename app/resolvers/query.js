function getUserAdmin(parent, args, context, info) {
  return context.dataSources.Admin.getUserAdmin(parent, args, context, info);
}

function getProfile(parent, args, context, info) {
  return context.dataSources.User.getProfile(parent, args, context, info);
}

function getUsers(parent, args, context, info) {
  return context.dataSources.User.getUsers(parent, args, context, info);
}

function getPost(parent, args, context, info) {
  return context.dataSources.Post.getPost(parent, args, context, info);
}

function getPosts(parent, args, context, info) {
  return context.dataSources.Post.getPosts(parent, args, context, info);
}

function replies(parent, args, context, info) {
  return context.dataSources.Comment.replies(parent, args, context, info);
}
const queryResolver = {
  // admin
  user: getUserAdmin,

  // user
  me: getProfile,
  users: getUsers,

  // post
  post: getPost,
  posts: getPosts,

  // comment
  replies,
};
module.exports = queryResolver;
