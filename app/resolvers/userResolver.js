const userResolver = {
  User: {
    followerCount: (parent, _, context, __) => context.dataSources.userController.getFollowerCount(parent, context),
  },
};

module.exports = userResolver;
