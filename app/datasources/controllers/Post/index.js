const postQuery = require('./postQuery');
const postCommand = require('./postCommand');

module.exports = {
  ...postQuery,
  ...postCommand,
};
