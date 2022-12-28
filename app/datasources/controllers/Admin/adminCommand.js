const { User } = require('../../models');
const { createGeneralResponse } = require('../../utils');

async function disableUser(args, context) {
  try {
    const { clientRedis } = context.dataSources;
    const { id } = args;
    const user = await User.findOne({
      _id: id,
    }, { email: 1, status: 1 });
    if (!user) {
      return createGeneralResponse(false, 'Disable user failed');
    }

    if (user.status === 'Deactivated') {
      return createGeneralResponse(false, 'User has been disable before');
    }

    const keysOfSession = await clientRedis.lrange(user.email, 0, -1);
    clientRedis.del(user.email);
    keysOfSession.forEach(key => {
      clientRedis.del(key);
    });

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
