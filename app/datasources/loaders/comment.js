const { User, Post } = require('../models');

async function batchUserOfComment(ids) {
  try {
    const users = await User.find({
      _id: { $in: ids },
    }).lean();
    const usersMap = {};
    users.forEach(user => {
      usersMap[user._id.toString()] = user;
    });
    return ids.map(id => usersMap[id]);
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    throw err;
  }
}

async function batchPostOfComment(ids) {
  try {
    const posts = await Post.find({
      _id: { $in: ids },
    }).lean();
    const postsMap = {};
    posts.forEach(post => {
      postsMap[post._id.toString()] = post;
    });
    return ids.map(id => postsMap[id]);
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    throw err;
  }
}
module.exports = {
  batchUserOfComment,
  batchPostOfComment,
};
