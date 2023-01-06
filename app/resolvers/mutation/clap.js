function clapPost(parent, args, context, info) {
  return context.dataSources.clapPost(parent, args, context, info);
}

function unclapPost(parent, args, context, info) {
  return context.dataSources.unclapPost(parent, args, context, info);
}

function clapComment(parent, args, context, info) {
  return context.dataSources.clapComment(parent, args, context, info);
}

function unclapComment(parent, args, context, info) {
  return context.dataSources.unclapComment(parent, args, context, info);
}

module.exports = {
  clapPost,
  unclapPost,
  clapComment,
  unclapComment,
};
