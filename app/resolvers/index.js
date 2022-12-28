const queryResolver = require('./query');
const mutationResolver = require('./mutation');
const postResolver = require('./postResolver');
const userResolver = require('./userResolver');
const scalarResolver = require('./scalarResolver');
const commentResolver = require('./commentResolver');

module.exports = {
  Query: queryResolver,
  Mutation: mutationResolver,
  ...scalarResolver,
  ...postResolver,
  ...userResolver,
  ...commentResolver,
};
