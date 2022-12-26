const mutationResolver = {
  register: (_, args, context) => context.dataSources.authController.register(args),
  login: (_, args, context, info) => context.dataSources.authController.login(args, context, info),
};

module.exports = mutationResolver;
