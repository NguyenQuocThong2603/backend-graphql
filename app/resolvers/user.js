async function getFollowerCount(user, args, context, info) {
  const { _id } = user;
  if (!_id) return null;
  const followerCount = await context.loaders.followerCountOfUser.load(_id.toString());
  return followerCount;
}
const userResolver = {
  followerCount: getFollowerCount,
};

module.exports = userResolver;
