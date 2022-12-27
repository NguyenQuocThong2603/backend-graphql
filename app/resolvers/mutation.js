const mutationResolver = {
  // auth
  register: (_, args, context) => context.dataSources.authController.register(args),
  login: (_, args, context, info) => context.dataSources.authController.login(args, context, info),

  // admin
  disableUser: (_, args, context) => context.dataSources.adminController.disableUser(args, context),

  // user
  follow: (_, args, context) => context.dataSources.userController.follow(args, context),
  unfollow: (_, args, context) => context.dataSources.userController.unfollow(args, context),

  // post
  createPost: (_, args, context) => context.dataSources.postController.createPost(args, context),
  updatePost: (_, args, context, info) => context.dataSources.postController.updatePost(args, context, info),
  deletePost: (_, args, context) => context.dataSources.postController.deletePost(args, context),
  hidePost: (_, args, context) => context.dataSources.postController.hidePost(args, context),
};

module.exports = mutationResolver;
