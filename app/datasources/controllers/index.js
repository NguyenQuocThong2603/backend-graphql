const authController = require('./Auth');
const userController = require('./User');
const postController = require('./Post');
const adminController = require('./Admin');
const clapController = require('./Clap');
const followController = require('./Follow');
const commentController = require('./Comment');

module.exports = {
  userController,
  authController,
  postController,
  adminController,
  clapController,
  followController,
  commentController,
};
