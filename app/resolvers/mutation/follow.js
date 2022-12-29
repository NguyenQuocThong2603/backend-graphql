function follow(parent, args, context, info) {
  return context.dataSources.Follow.follow(parent, args, context, info);
}

function unfollow(parent, args, context, info) {
  return context.dataSources.Follow.unfollow(parent, args, context, info);
}

module.exports = {
  follow,
  unfollow,
};
