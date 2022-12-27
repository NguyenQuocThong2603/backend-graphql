const postResolver = {
  Post: {
    clapCount: (parent, _, context, __) => context.dataSources.postController.getClapCount(parent, context),
    owner: (parent, _, context, __) => context.dataSources.postController.getOwner(parent, context),
  },
};

module.exports = postResolver;
