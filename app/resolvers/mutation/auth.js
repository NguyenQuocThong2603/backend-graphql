function register(parent, args, context, info) {
  return context.dataSources.Auth.register(parent, args, context, info);
}

function login(parent, args, context, info) {
  return context.dataSources.Auth.login(parent, args, context, info);
}

function logout(parent, args, context, info) {
  return context.dataSources.Auth.logout(parent, args, context, info);
}
module.exports = {
  register,
  login,
  logout,
};
