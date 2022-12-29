function disableUser(parent, args, context, info) {
  return context.dataSources.Admin.disableUser(parent, args, context, info);
}
module.exports = {
  disableUser,
};
