const { Clap, Post, Comment } = require('../../models');
const { createGeneralResponse } = require('../../utils');

async function clapPost(parent, args, context, info) {
  try {
    const { user } = context;
    const { postId, count } = args;

    const post = await Post.findOne({
      _id: postId,
    }, { owner: 1, status: 1 }).lean();

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
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return createGeneralResponse(false, 'Internal server error');
  }
}

async function unclapPost(parent, args, context, info) {
  try {
    const { user } = context;
    const { postId } = args;

    const post = await Post.findOne({
      _id: postId,
    }, { owner: 1, status: 1 }).lean();

    if (!post || post.status === 'Hidden' || post.status === 'Draft' || post.status === 'Deleted') {
      return createGeneralResponse(false, 'Unclap post failed');
    }

    const deleteResult = await Clap.deleteOne({
      user: user._id,
      post: postId,
    });

    if (!deleteResult.deletedCount) {
      return createGeneralResponse(false, 'Unclap post failed');
    }
    return createGeneralResponse(true, 'Unclap post succeed');
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return createGeneralResponse(false, 'Internal server error');
  }
}

async function clapComment(parent, args, context, info) {
  try {
    const { user } = context;
    const { commentId, count } = args;

    const comment = await Comment.findOne({
      _id: commentId,
    }, { owner: 1 }).lean();

    if (!comment) {
      return createGeneralResponse(false, 'Clap comment failed');
    }

    const clapInDB = await Clap.findOne({
      user: user._id,
      comment: commentId,
    }, { _id: 1 }).lean();

    if (!clapInDB) {
      const newClap = new Clap({
        user: user._id,
        comment: commentId,
        count,
      });
      await newClap.save();
      return createGeneralResponse(true, 'Clap comment succeed');
    }
    await Clap.updateOne({
      user: user._id,
      comment: commentId,
    }, { $inc: { count } });
    return createGeneralResponse(true, 'Clap comment succeed');
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return createGeneralResponse(false, 'Internal server error');
  }
}

async function unclapComment(parent, args, context, info) {
  try {
    const { user } = context;
    const { commentId } = args;

    const deleteResult = await Clap.deleteOne({
      user: user._id,
      comment: commentId,
    });

    if (!deleteResult.deletedCount) {
      return createGeneralResponse(false, 'Unclap comment failed');
    }
    return createGeneralResponse(true, 'Unclap comment succeed');
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return createGeneralResponse(false, 'Internal server error');
  }
}

module.exports = {
  clapPost,
  unclapPost,
  clapComment,
  unclapComment,
};
