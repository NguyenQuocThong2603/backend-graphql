const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { User } = require('../../models');
const { getSelectedFields, authUtils, createGeneralResponse } = require('../../utils');
const { throwError } = require('../../../utils');
const config = require('../../../config');
const { createLoginResponse } = require('../../utils/controllers/Auth');

async function register(parent, args, context, info) {
  try {
    const { email, password, username } = args;

    const existedUserWithEmail = User.findOne({
      email,
    }, { _id: 1 }).lean();

    const existedUserWithUsername = User.findOne({
      username,
    }, { _id: 1 }).lean();

    return Promise.all([existedUserWithEmail, existedUserWithUsername]).then(async existedUser => {
      if (existedUser[0]) {
        throwError('User already exists');
      }

      if (existedUser[1]) {
        throwError('User already exists');
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const user = new User({
        email,
        password: hash,
        username,
      });
      return user.save();
    });
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    throwError('Internal server error');
  }
}

async function login(parent, args, context, info) {
  try {
    const { clientRedis } = context.dataSources;
    const { username, password } = args;
    const fields = getSelectedFields(info.fieldNodes[0].selectionSet.selections);

    const selectedFields = fields.filter(field => field.includes('user')).map(field => field.split('.')[1]);
    selectedFields.push('password');

    if (!selectedFields.includes('status', 0)) {
      selectedFields.push('status');
    }
    const user = await User.findOne({
      username,
    }).select(selectedFields).lean();

    if (!user) {
      return authUtils.createLoginResponse(false, 'Email or password is incorrect', null, null);
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return authUtils.createLoginResponse(false, 'Email or password is incorrect', null, null);
    }

    if (user.status === 'Deactivated') {
      return authUtils.createLoginResponse(false, 'Account has been disabled', null, null);
    }
    const randomString = crypto.randomBytes(30).toString('hex');

    const token = `${randomString}:${user._id}`;

    await clientRedis.setex(token, config.redisDbs.expiredTime / 1000, user.role);
    return authUtils.createLoginResponse(true, 'Login succeed', token, user);
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return createLoginResponse(false, 'Internal server error', null, null);
  }
}

async function logout(parent, args, context, info) {
  try {
    const { user } = context;
    const { clientRedis } = context.dataSources;
    await clientRedis.del(user.token);
    return createGeneralResponse(true, 'Logout succeed');
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return createGeneralResponse(false, 'Internal server error');
  }
}

module.exports = {
  register,
  login,
  logout,
};
