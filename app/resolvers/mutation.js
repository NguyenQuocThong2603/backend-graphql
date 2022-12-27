const mutationResolver = {
  // auth
  register: (_, args, context) => context.dataSources.authController.register(args),
  login: (_, args, context, info) => context.dataSources.authController.login(args, context, info),

  // post
  createPost: (_, args, context, __) => context.dataSources.postController.createPost(args, context),
  updatePost: (_, args, context, info) => context.dataSources.postController.updatePost(args, context, info),
};

module.exports = mutationResolver;
