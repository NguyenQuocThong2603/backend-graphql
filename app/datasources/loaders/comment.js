const { User, Post } = require('../models');

async function batchUserOfComment(ids) {
  const users = await User.find({
    _id: { $in: ids },
  }).lean();
  const usersMap = {};
  users.forEach(user => {
    usersMap[user._id.toString()] = user;
  });
  return ids.map(id => usersMap[id]);
}

async function batchPostOfComment(ids) {
  const posts = await Post.find({
    _id: { $in: ids },
  }).lean();
  const postsMap = {};
  posts.forEach(post => {
    postsMap[post._id.toString()] = post;
  });
  return ids.map(id => postsMap[id]);
}
module.exports = {
  batchUserOfComment,
  batchPostOfComment,
};
