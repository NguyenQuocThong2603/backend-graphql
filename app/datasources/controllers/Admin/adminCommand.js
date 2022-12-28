const { User } = require('../../models');
const { createGeneralResponse } = require('../../utils');

async function disableUser(args, context) {
  try {
    const { clientRedis } = context.dataSources;
    const { id } = args;
    const user = await User.findOne({
      _id: id,
    }, { status: 1 });
    if (!user) {
      return createGeneralResponse(false, 'Disable user failed');
    }

    if (user.status === 'Deactivated') {
      return createGeneralResponse(false, 'User has been disable before');
    }

    let cursor = 0;

    do {
      const resultOfScan = await clientRedis.scan(cursor, 'MATCH', `*${user._id}`, 'COUNT', '10');
      cursor = resultOfScan[0];
      console.log(resultOfScan[1]);
      if (resultOfScan) {
        await clientRedis.del(resultOfScan[1]);
      }
    } while (cursor !== '0');

    user.status = 'Deactivated';
    await user.save();
    return createGeneralResponse(true, 'Disable user succeed');
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return createGeneralResponse(false, err.message);
  }
}

module.exports = {
  disableUser,
};
