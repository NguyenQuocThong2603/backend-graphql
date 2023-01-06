const Auth = require('./Auth');
const User = require('./User');
const Post = require('./Post');
const Admin = require('./Admin');
const Clap = require('./Clap');
const Follow = require('./Follow');
const Comment = require('./Comment');

module.exports = {
  ...User,
  ...Auth,
  ...Post,
  ...Admin,
  ...Clap,
  ...Follow,
  ...Comment,
};
