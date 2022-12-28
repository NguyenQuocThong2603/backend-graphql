const { Clap, Post } = require('../../models');
const { createGeneralResponse } = require('../../utils');

async function clapPost(args, context) {
  const { user } = context;
  const { postId, count } = args;

  const post = await Post.findOne({
    _id: postId,
  }, { owner: 1 }).lean();

  if (!post || post.status === 'Hidden' || post.status === 'Draft' || post.status === 'Deleted') {
    return createGeneralResponse(false, 'Clap post failed');
  }

  const clapInDB = await Clap.findOne({
    user: user._id,
    post: postId,
  }, { _id: 1 }).lean();

  if (!clapInDB) {
    const newClap = new Clap({
      user: user._id,
      post: postId,
      postOwner: post.owner,
      count,
    });
    await newClap.save();
    return createGeneralResponse(true, 'Clap post succeed');
  }
  await Clap.updateOne({
    user: user._id,
    post: postId,
  }, { $inc: { count } });
  return createGeneralResponse(true, 'Clap post succeed');
}

async function unclapPost(args, context) {
  const { user } = context;
  const { postId } = args;

  const deleteResult = await Clap.deleteOne({
    user: user._id,
    post: postId,
  });

  if (!deleteResult.deletedCount) {
    return createGeneralResponse(false, 'Unclap failed');
  }
  return createGeneralResponse(true, 'Unclap succeed');
}

module.exports = {
  clapPost,
  unclapPost,
};
