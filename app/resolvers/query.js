function getUserAdmin(parent, args, context, info) {
  return context.dataSources.getUserAdmin(parent, args, context, info);
}

function getProfile(parent, args, context, info) {
  return context.dataSources.getProfile(parent, args, context, info);
}

function getUsers(parent, args, context, info) {
  return context.dataSources.getUsers(parent, args, context, info);
}

function getPost(parent, args, context, info) {
  return context.dataSources.getPost(parent, args, context, info);
}

function getPosts(parent, args, context, info) {
  return context.dataSources.getPosts(parent, args, context, info);
}

function replies(parent, args, context, info) {
  return context.dataSources.replies(parent, args, context, info);
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
