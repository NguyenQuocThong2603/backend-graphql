const { Follow, User } = require('../../models');
const { createGeneralResponse } = require('../../utils');

async function follow(args, context) {
  try {
    const { user } = context;
    const { followee } = args;
    if (followee === user._id) {
      return createGeneralResponse(false, 'Follow failed');
    }
    const followeeInDB = await User.findOne({
      _id: followee,
    }, { _id: 1 }).lean();

    if (!followeeInDB) {
      return createGeneralResponse(false, 'Follow failed');
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
    const deleteResult = await Follow.deleteOne({
      follower: user._id,
      followee,
    });

    if (!deleteResult.deletedCount) {
      return createGeneralResponse(false, 'Unfollow failed');
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
