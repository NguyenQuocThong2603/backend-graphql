function comment(parent, args, context, info) {
  return context.dataSources.Comment.comment(parent, args, context, info);
}

function updateComment(parent, args, context, info) {
  return context.dataSources.Comment.updateComment(parent, args, context, info);
}

function reply(parent, args, context, info) {
  return context.dataSources.Comment.reply(parent, args, context, info);
}

function deleteComment(parent, args, context, info) {
  return context.dataSources.Comment.deleteComment(parent, args, context, info);
}

module.exports = {
  comment,
  updateComment,
  reply,
  deleteComment,
};
