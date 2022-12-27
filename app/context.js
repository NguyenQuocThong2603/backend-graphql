const { gql } = require('apollo-server-express');
const { clientRedis, code, status } = require('./datasources/utils');
const { scope, throwError } = require('./utils');

async function createContext({ req }) {
  const { query } = req.body;
  const token = req.headers.authorization;
  const user = JSON.parse(await clientRedis.get(token));
  const queryAfterParse = gql(query);
  if (!user) {
    if (!scope.guestScope.some(operation => operation === queryAfterParse.definitions[0]
      .selectionSet.selections[0].name.value)) {
      throwError(code.UNAUTHORIZED, 'Unauthorized', status.UNAUTHORIZED);
    }
  } else if (user.role === 'User') {
    if (!scope.userScope.some(operation => operation === queryAfterParse.definitions[0]
      .selectionSet.selections[0].name.value)) {
      throwError(code.UNAUTHORIZED, 'Unauthorized', status.UNAUTHORIZED);
    }
  }

  return { query, user, req };
}

module.exports = createContext;
