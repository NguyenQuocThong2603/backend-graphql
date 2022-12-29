const Post = require('./post');
const User = require('./user');
const Comment = require('./comment');

module.exports = {
  ...User,
  ...Post,
  ...Comment,
};
