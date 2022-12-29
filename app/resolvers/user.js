function getFollowerCount(parent, args, context, info) {
  return context.dataSources.User.getFollowerCount(parent, args, context, info);
}
const userResolver = {
  followerCount: getFollowerCount,
};

module.exports = userResolver;
