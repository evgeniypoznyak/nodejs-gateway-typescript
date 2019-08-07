const config = require('config');

module.exports = function() {
  if (!config.get('JWT_PRIVATE_KEY')) {
    throw new Error('FATAL ERROR: JWT_PRIVATE_KEY is not defined!');
  }
  if (!config.get('MONGO_USERS')) {
    throw new Error('FATAL ERROR: MONGO_USERS is not defined!');
  }
  if (!config.get('MONGO_LOGGING')) {
    throw new Error('FATAL ERROR: MONGO_LOGGING is not defined!');
  }
  if (!config.get('API_SKILLS')) {
    throw new Error('FATAL ERROR: API_SKILLS is not defined!');
  }
};
