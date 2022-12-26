const userQuery = {
  me: (_, __, context, info) => context.dataSources.userController.getProfile(context, info),
};
module.exports = userQuery;
