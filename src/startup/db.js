const logger = require('../middleware/logging');
const mongoose = require('mongoose');
const config = require('config');

const url = process.env.MONGO_USERS || config.get('MONGO_USERS');

module.exports = function() {
  mongoose.connect(url, {useNewUrlParser: true})
    .then(() => {
      logger.log({level: 'info', message: 'Mongo db Connected'});
    });
  mongoose.set('debug', true);
  mongoose.set('useCreateIndex', true);
};
