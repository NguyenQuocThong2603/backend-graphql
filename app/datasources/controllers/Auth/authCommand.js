const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { User } = require('../../models');
const { getSelectedFields, throwError, code, status, authUtils } = require('../../utils');
const config = require('../../../config');

async function register(args) {
  const { email, password, username } = args;

  const existedUserWithEmail = User.findOne({
    email,
  }, { _id: 1 }).lean();

  const existedUserWithUsername = User.findOne({
    username,
  }, { _id: 1 }).lean();

  return Promise.all([existedUserWithEmail, existedUserWithUsername]).then(async existedUser => {
    if (existedUser[0]) {
      throwError(code.BAD_REQUEST, 'User already exists', status.BAD_REQUEST);
    }

    if (existedUser[1]) {
      throwError(code.BAD_REQUEST, 'User already exists', status.BAD_REQUEST);
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = new User({
      email,
      password: hash,
      username,
    });
    await user.save();

    return user;
  });
}

async function login(args, context, info) {
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
  const token = crypto.randomBytes(20).toString('hex');
  return Promise.all([clientRedis.setex(
    token,
    config.redisDbs.expiredTime / 1000,
    JSON.stringify({ email: user.email, role: user.role }),
  ),
  clientRedis.lpush(user.email, token),
  clientRedis.expire(user.email, config.redisDbs.expiredTime / 1000)])
    .then(() => authUtils.createLoginResponse(true, 'Login succeed', token, user));
}

module.exports = {
  register,
  login,
};
