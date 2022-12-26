const mongoose = require('mongoose');
const config = require('../config');

require('./models');
const controllers = require('./controllers');
const loaders = require('./loaders');
const { clientRedis } = require('./utils');

if (config.nodeEnv !== 'test') {
  mongoose.set('strictQuery', false);
  mongoose.connect(config.mongo.database, config.mongo.options, err => {
    if (err) {
      logger.info(`Mongodb connection failed ${err}`);
    } else {
      logger.info('Mongodb connected');
    }
  });
}

module.exports = () => ({ ...controllers, loaders, ...clientRedis });
