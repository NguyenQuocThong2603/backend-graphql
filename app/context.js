const { gql } = require('apollo-server-express');
const { clientRedis } = require('./datasources/utils');
const { scope, throwError, createLoaders } = require('./utils');

async function createContext({ req }) {
  const { query } = req.body;
  const token = req.headers.authorization;
  let userId;
  if (token) {
    userId = token.split(':')[1];
  }
  const role = await clientRedis.get(token);
  const queryAfterParse = gql(query);
  if (!role) {
    if (!scope.guestScope.some(operation => operation === queryAfterParse.definitions[0]
      .selectionSet.selections[0].name.value)) {
      throwError('Unauthorized');
    }
  } else if (role === 'User') {
    if (!scope.userScope.some(operation => operation === queryAfterParse.definitions[0]
      .selectionSet.selections[0].name.value)) {
      throwError('Unauthorized');
    }
  }
  const user = {
    _id: userId,
    role,
    token,
  };
  return { user, loaders: createLoaders() };
}

module.exports = createContext;
