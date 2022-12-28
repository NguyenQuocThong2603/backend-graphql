const commentResolver = {
  Comment: {
    user: (parent, _, context, __) => context.dataSources.commentController.getUser(parent, context),
    post: (parent, _, context, __) => context.dataSources.commentController.getPost(parent, context),
  },
};

module.exports = commentResolver;
