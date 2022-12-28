const DataLoader = require('dataloader');
const _ = require('lodash');
const { User, Post } = require('../models');

async function getUserByIds(ids) {
  const users = await User.find({
    _id: ids,
  }).lean();
  return ids.map(id => users.find(user => _.isEqual(id, user._id)));
}

const commentLoaderUser = new DataLoader(getUserByIds);

async function getPostByIds(ids) {
  const posts = await Post.find({
    _id: ids,
  }).lean();
  return ids.map(id => posts.find(post => _.isEqual(id, post._id)));
}
const commentLoaderPost = new DataLoader(getPostByIds);
module.exports = {
  commentLoaderUser,
  commentLoaderPost,
};
