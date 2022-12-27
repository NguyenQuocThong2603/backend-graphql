const queryResolver = require('./query');
const mutationResolver = require('./mutation');
const postResolver = require('./postResolver');
const scalarResolver = require('./scalarResolver');

module.exports = {
  Query: queryResolver,
  Mutation: mutationResolver,
  ...scalarResolver,
  ...postResolver,
};
