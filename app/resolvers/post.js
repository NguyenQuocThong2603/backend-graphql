function getClapCount(parent, args, context, info) {
  return context.dataSources.Post.getClapCount(parent, args, context, info);
}

function getOwner(parent, args, context, info) {
  return context.dataSources.Post.getOwner(parent, args, context, info);
}
const postResolver = {
  clapCount: getClapCount,
  owner: getOwner,
};

module.exports = postResolver;
