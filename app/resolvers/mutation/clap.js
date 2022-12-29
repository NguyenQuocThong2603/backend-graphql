function clapPost(parent, args, context, info) {
  return context.dataSources.Clap.clapPost(parent, args, context, info);
}

function unclapPost(parent, args, context, info) {
  return context.dataSources.Clap.unclapPost(parent, args, context, info);
}

function clapComment(parent, args, context, info) {
  return context.dataSources.Clap.clapComment(parent, args, context, info);
}

function unclapComment(parent, args, context, info) {
  return context.dataSources.Clap.unclapComment(parent, args, context, info);
}

module.exports = {
  clapPost,
  unclapPost,
  clapComment,
  unclapComment,
};
