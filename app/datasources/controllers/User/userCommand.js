const { Follow, User } = require('../../models');
const { createGeneralResponse } = require('../../utils');

async function follow(args, context) {
  try {
    const { user } = context;
    const { followee } = args;
    const followeeInDB = await User.findOne({
      _id: followee,
    }, { _id: 1 }).lean();

    if (!followeeInDB) {
      return createGeneralResponse(false, 'User not found');
    }

    const followInDB = await Follow.findOne({
      follower: user._id,
      followee,
    }, { _id: 1 }).lean();

    if (followInDB) {
      return createGeneralResponse(false, 'You have already followed this user');
    }

    const newFollow = new Follow({
      follower: user._id,
      followee,
    });
    await newFollow.save();
    return createGeneralResponse(true, 'Follow succeed');
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return createGeneralResponse(false, err.message);
  }
}

async function unfollow(args, context) {
  try {
    const { user } = context;
    const { followee } = args;
    const followeeInDB = await Follow.findOneAndDelete({
      follower: user._id,
      followee,
    }, { _id: 1, returnDocument: 'after' }).lean();

    if (!followeeInDB) {
      return createGeneralResponse(false, 'User not found');
    }

    return createGeneralResponse(true, 'Unfollow succeed');
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return createGeneralResponse(false, err.message);
  }
}
module.exports = {
  follow,
  unfollow,
};
