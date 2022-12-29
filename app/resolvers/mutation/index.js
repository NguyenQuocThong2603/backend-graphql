const adminMutation = require('./admin');
const authMutation = require('./auth');
const clapMutation = require('./clap');
const commentMutation = require('./comment');
const followMutation = require('./follow');
const postMutation = require('./post');

module.exports = {
  ...adminMutation,
  ...authMutation,
  ...clapMutation,
  ...commentMutation,
  ...followMutation,
  ...postMutation,
};
