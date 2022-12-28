const commentQuery = require('./commentQuery');
const commentCommand = require('./commentCommand');

module.exports = {
  ...commentQuery,
  ...commentCommand,
};
