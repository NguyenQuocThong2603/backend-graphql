const { gql } = require('apollo-server-express');
const { clientRedis, code, statusCode } = require('./datasources/utils');
const { scope, throwError } = require('./utils');

async function createContext({ req }) {
  const { query } = req.body;
  const token = req.headers.authorization;
  const userId = token.split(':')[1];
  const role = await clientRedis.get(token);
  const queryAfterParse = gql(query);
  if (!role) {
    if (!scope.guestScope.some(operation => operation === queryAfterParse.definitions[0]
      .selectionSet.selections[0].name.value)) {
      throwError(code.UNAUTHORIZED, 'Unauthorized', statusCode.UNAUTHORIZED);
    }
  } else if (role === 'User') {
    if (!scope.userScope.some(operation => operation === queryAfterParse.definitions[0]
      .selectionSet.selections[0].name.value)) {
      throwError(code.UNAUTHORIZED, 'Unauthorized', statusCode.UNAUTHORIZED);
    }
  }
  const user = {
    _id: userId,
    role,
    token,
  };
  return { query, user, req };
}

module.exports = createContext;
