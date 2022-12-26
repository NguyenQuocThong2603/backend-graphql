const { GraphQLError } = require('graphql');

function throwError(code, message, status) {
  throw new GraphQLError(message, {
    extensions: {
      code,
      http: {
        status,
      },
    },
  });
}

module.exports = throwError;
