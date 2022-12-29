const queryResolver = require('./query');
const mutationResolver = require('./mutation');
const Post = require('./post');
const User = require('./user');
const DateTime = require('./datetime');
const Comment = require('./comment');

module.exports = {
  Query: queryResolver,
  Mutation: mutationResolver,
  DateTime,
  Post,
  User,
  Comment,
};
