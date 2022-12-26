const userQuery = require('./userQuery');
const userCommand = require('./userCommand');

module.exports = {
  ...userQuery,
  ...userCommand,
};
