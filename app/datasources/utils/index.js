const controllers = require('./controllers');
const redis = require('./redis');
const constants = require('./constants');

module.exports = {
  ...controllers,
  ...redis,
  ...constants,
};
