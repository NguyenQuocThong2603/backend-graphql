const { throwError } = require('../../../utils');
const { User } = require('../../models');
const { getSelectedFieldsWithoutRecursive } = require('../../utils');

async function getProfile(parent, args, context, info) {
  try {
    const { signature } = context;
    const fields = getSelectedFieldsWithoutRecursive(info.fieldNodes[0].selectionSet.selections);
    const userInDB = await User.findOne({
      _id: signature._id,
    }).select(fields).lean();
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
    return users;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    throwError('Internal server error');
  }
}

module.exports = {
  getProfile,
  getUsers,
};
