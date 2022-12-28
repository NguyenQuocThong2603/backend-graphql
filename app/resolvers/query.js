const queryResolver = {
  // admin
  user: (_, args, context, info) => context.dataSources.adminController.getUserAdmin(args, info),

  // user
  me: (_, __, context, info) => context.dataSources.userController.getProfile(context, info),
  users: (_, args, context, info) => context.dataSources.userController.getUsers(args, info),

  // post
  post: (_, args, context, info) => context.dataSources.postController.getPost(args, info),
  posts: (_, args, context, info) => context.dataSources.postController.getPosts(args, info),

  // comment
  replies: (_, args, context, info) => context.dataSources.commentController.replies(args, info),
};
module.exports = queryResolver;
