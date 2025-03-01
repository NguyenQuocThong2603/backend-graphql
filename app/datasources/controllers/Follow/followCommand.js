const { Follow, User } = require('../../models');
const { createGeneralResponse } = require('../../utils');

async function follow(parent, args, context, info) {
  try {
    const { signature } = context;
    const { followee } = args;
    if (followee === signature._id) {
      return createGeneralResponse(false, 'Follow failed');
    }
    const followeeInDB = await User.findOne({
      _id: followee,
    }, { _id: 1 }).lean();

    if (!followeeInDB) {
      return createGeneralResponse(false, 'Follow failed');
    }

    const followInDB = await Follow.findOne({
      follower: signature._id,
      followee,
    }, { _id: 1 }).lean();

    if (followInDB) {
      return createGeneralResponse(false, 'You have already followed this user');
    }

    const newFollow = new Follow({
      follower: signature._id,
      followee,
    });
    await newFollow.save();
    return createGeneralResponse(true, 'Follow succeed');
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return createGeneralResponse(false, 'Internal server error');
  }
}

async function unfollow(parent, args, context, info) {
  try {
    const { signature } = context;
    const { followee } = args;
    const deleteResult = await Follow.deleteOne({
      follower: signature._id,
      followee,
    });

    if (!deleteResult.deletedCount) {
      return createGeneralResponse(false, 'Unfollow failed');
    }

    return createGeneralResponse(true, 'Unfollow succeed');
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return createGeneralResponse(false, 'Internal server error');
  }
}
module.exports = {
  follow,
  unfollow,
};
