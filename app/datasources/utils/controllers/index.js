const getSelectedFields = require('./getSelectedFields');
const throwError = require('./throwError');

module.exports = {
  ...getSelectedFields,
  throwError,
};
