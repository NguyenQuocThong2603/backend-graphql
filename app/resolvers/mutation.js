const mutationResolver = {
  // auth
  register: (_, args, context) => context.dataSources.authController.register(args),
  login: (_, args, context, info) => context.dataSources.authController.login(args, context, info),

  // admin
  disableUser: (_, args, context) => context.dataSources.adminController.disableUser(args, context),

  // follow
  follow: (_, args, context) => context.dataSources.followController.follow(args, context),
  unfollow: (_, args, context) => context.dataSources.followController.unfollow(args, context),

  // post
  createPost: (_, args, context) => context.dataSources.postController.createPost(args, context),
  updatePost: (_, args, context, info) => context.dataSources.postController.updatePost(args, context, info),
  deletePost: (_, args, context) => context.dataSources.postController.deletePost(args, context),
  hidePost: (_, args, context) => context.dataSources.postController.hidePost(args, context),

  // clap
  clapPost: (_, args, context) => context.dataSources.clapController.clapPost(args, context),
  unclapPost: (_, args, context) => context.dataSources.clapController.unclapPost(args, context),
  clapComment: (_, args, context) => context.dataSources.clapController.clapComment(args, context),
  unclapComment: (_, args, context) => context.dataSources.clapController.unclapComment(args, context),

  // comment
  comment: (_, args, context) => context.dataSources.commentController.comment(args, context),
  updateComment: (_, args, context, info) => context.dataSources.commentController.updateComment(args, context, info),
  reply: (_, args, context) => context.dataSources.commentController.reply(args, context),
  deleteComment: (_, args, context) => context.dataSources.commentController.deleteComment(args, context),
};

module.exports = mutationResolver;
