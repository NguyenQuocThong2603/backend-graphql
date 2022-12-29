const { User } = require('../../models');
const { getSelectedFieldsWithoutRecursive } = require('../../utils');
const { throwError } = require('../../../utils');

async function getUserAdmin(parent, args, context, info) {
  try {
    const { ...filter } = args.input;
    const fields = getSelectedFieldsWithoutRecursive(info.fieldNodes[0].selectionSet.selections);

    const user = await User.findOne({
      ...filter,
    }).select(fields).lean();
    return user;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}

module.exports = {
  getUserAdmin,
};
