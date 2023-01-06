function createPost(parent, args, context, info) {
  return context.dataSources.createPost(parent, args, context, info);
}

function updatePost(parent, args, context, info) {
  return context.dataSources.updatePost(parent, args, context, info);
}

function deletePost(parent, args, context, info) {
  return context.dataSources.deletePost(parent, args, context, info);
}

function hidePost(parent, args, context, info) {
  return context.dataSources.hidePost(parent, args, context, info);
}

module.exports = {
  createPost,
  updatePost,
  deletePost,
  hidePost,
};
