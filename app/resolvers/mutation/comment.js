function comment(parent, args, context, info) {
  return context.dataSources.comment(parent, args, context, info);
}

function updateComment(parent, args, context, info) {
  return context.dataSources.updateComment(parent, args, context, info);
}

function reply(parent, args, context, info) {
  return context.dataSources.reply(parent, args, context, info);
}

function deleteComment(parent, args, context, info) {
  return context.dataSources.deleteComment(parent, args, context, info);
}

module.exports = {
  comment,
  updateComment,
  reply,
  deleteComment,
};
