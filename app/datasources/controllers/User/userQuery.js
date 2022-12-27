const { User } = require('../../models');
const { getSelectedFieldsWithoutRecursive } = require('../../utils');

async function getProfile(context, info) {
  const { user } = context;
  const fields = getSelectedFieldsWithoutRecursive(info.fieldNodes[0].selectionSet.selections);
  const userInDB = await User.findOne({
    email: user.email,
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
module.exports = {
  getProfile,
  getUsers,
};
