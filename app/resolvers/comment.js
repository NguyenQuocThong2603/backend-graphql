function getUser(parent, args, context, info) {
  return context.dataSources.Comment.getUser(parent, args, context, info);
}

function getPost(parent, args, context, info) {
  return context.dataSources.Comment.getPost(parent, args, context, info);
}

const commentResolver = {
  user: getUser,
  post: getPost,
};

module.exports = commentResolver;
