function disableUser(parent, args, context, info) {
  return context.dataSources.disableUser(parent, args, context, info);
}
module.exports = {
  disableUser,
};
