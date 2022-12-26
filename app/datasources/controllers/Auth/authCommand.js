const bcrypt = require('bcrypt');
const User = require('../../models');
const { getSelectedFields } = require('../../utils');

async function register(args, context, info) {
  try {
    const { email, password, username } = args;

    const existedUserWithEmail = User.findOne({
      email,
    }, { _id: 1 }).lean();

    const existedUserWithUsername = User.findOne({
      username,
    }, { _id: 1 }).lean();
    Promise.all([existedUserWithEmail, existedUserWithUsername]).then(async values => {
      console.log(values);
      // const salt = bcrypt.genSaltSync(10);
      // const hash = bcrypt.hashSync(password, salt);
      // const user = new User({
      //   email,
      //   password: hash,
      //   fullName,
      // });
      // await user.save();

      // const userDTO = {
      //   _id: user._id,
      //   email: user._id,
      //   fullName: user.fullName,
      //   avatar: user.avatar,
      //   isBanned: user.isBanned,
      //   role: user.role,
      //   top5Following: user.top5Following,
      // };
    });
  } catch (err) {
    logger.error(JSON.stringify(`${err.name}: ${err.message} `));
  }
}

module.exports = {
  register,
};
