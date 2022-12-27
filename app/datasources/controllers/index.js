const authController = require('./Auth');
const userController = require('./User');
const postController = require('./Post');
const adminController = require('./Admin');

module.exports = {
  userController,
  authController,
  postController,
  adminController,
};
