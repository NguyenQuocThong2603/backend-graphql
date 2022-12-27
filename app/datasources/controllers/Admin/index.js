const adminCommand = require('./adminCommand');
const adminQuery = require('./adminQuery');

module.exports = {
  ...adminQuery,
  ...adminCommand,
};
