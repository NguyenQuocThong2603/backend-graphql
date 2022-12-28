const { User } = require('../../models');
const { getSelectedFieldsWithoutRecursive } = require('../../utils');

async function getProfile(context, info) {
  const { user } = context;
  const fields = getSelectedFieldsWithoutRecursive(info.fieldNodes[0].selectionSet.selections);
  const userInDB = await User.findOne({
    _id: user._id,
  }).select(fields).lean();
  return userInDB;
}

async function getUsers(args, info) {
  const fields = getSelectedFieldsWithoutRecursive(info.fieldNodes[0].selectionSet.selections);

  const users = await User.find({
    firstName: args.name,
  }).select(fields).lean();
  return users;
}

// Dataloader functions

async function getFollowerCount(parent, context) {
  const { _id } = parent;
  if (!_id) return null;
  const followerCount = await context.dataSources.loaders.userLoader.load(_id);
  return followerCount;
}

module.exports = {
  getProfile,
  getUsers,
  getFollowerCount,
};
