const mutationResolver = {
  register: (parent, args, context, info) => context.dataSources.authController.register(args, context, info),
};

module.exports = mutationResolver;
