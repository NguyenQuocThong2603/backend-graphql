const { throwError } = require('../../../utils');
const { User } = require('../../models');
const { getSelectedFieldsWithoutRecursive } = require('../../utils');

async function getProfile(parent, args, context, info) {
  try {
    const { user } = context;
    const fields = getSelectedFieldsWithoutRecursive(info.fieldNodes[0].selectionSet.selections);
    const userInDB = await User.findOne({
      _id: user._id,
    }).select(fields).lean();

    if (!userInDB) {
      throwError('User not found');
    }
    return userInDB;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    throwError('Internal server error');
  }
}

async function getUsers(parent, args, context, info) {
  try {
    const fields = getSelectedFieldsWithoutRecursive(info.fieldNodes[0].selectionSet.selections);

    const users = await User.find({
      firstName: args.name,
    }).select(fields).lean();

    if (!users) {
      throwError('Users not found');
    }
    return users;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    throwError('Internal server error');
  }
}

// Dataloader functions

async function getFollowerCount(parent, args, context, info) {
  const { _id } = parent;
  if (!_id) return null;
  const followerCount = await context.loaders.followerCountOfUser.load(_id.toString());
  return followerCount;
}

module.exports = {
  getProfile,
  getUsers,
  getFollowerCount,
};
