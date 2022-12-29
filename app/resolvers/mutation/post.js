function createPost(parent, args, context, info) {
  return context.dataSources.Post.createPost(parent, args, context, info);
}

function updatePost(parent, args, context, info) {
  return context.dataSources.Post.updatePost(parent, args, context, info);
}

function deletePost(parent, args, context, info) {
  return context.dataSources.Post.deletePost(parent, args, context, info);
}

function hidePost(parent, args, context, info) {
  return context.dataSources.Post.hidePost(parent, args, context, info);
}

module.exports = {
  createPost,
  updatePost,
  deletePost,
  hidePost,
};
