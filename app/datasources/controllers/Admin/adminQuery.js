const { User } = require('../../models');
const { getSelectedFieldsWithoutRecursive } = require('../../utils');

async function getUserAdmin(args, info) {
  const { ...filter } = args.input;
  const fields = getSelectedFieldsWithoutRecursive(info.fieldNodes[0].selectionSet.selections);

  const user = await User.findOne({
    ...filter,
  }).select(fields).lean();
  return user;
}

module.exports = {
  getUserAdmin,
};
