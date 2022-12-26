const { User } = require('../../models');
const { getSelectedFields, code, status } = require('../../utils');
const { throwError } = require('../../../utils');

async function getProfile(context, info) {
  const { user } = context;
  const fields = getSelectedFields(info.fieldNodes[0].selectionSet.selections);
  const userInDB = await User.findOne({
    email: user.email,
  }).select(fields).lean();
  if (!userInDB) {
    throwError(code.NOT_FOUND, 'User not found', status.NOT_FOUND);
  }
  return userInDB;
}
module.exports = {
  getProfile,
};
