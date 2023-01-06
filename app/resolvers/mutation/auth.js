function register(parent, args, context, info) {
  return context.dataSources.register(parent, args, context, info);
}

function login(parent, args, context, info) {
  return context.dataSources.login(parent, args, context, info);
}

function logout(parent, args, context, info) {
  return context.dataSources.logout(parent, args, context, info);
}
module.exports = {
  register,
  login,
  logout,
};
