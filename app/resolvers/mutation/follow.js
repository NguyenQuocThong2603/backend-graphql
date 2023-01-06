function follow(parent, args, context, info) {
  return context.dataSources.follow(parent, args, context, info);
}

function unfollow(parent, args, context, info) {
  return context.dataSources.unfollow(parent, args, context, info);
}

module.exports = {
  follow,
  unfollow,
};
