const verifyToken = require('./auth.middleware');
const errorHandler = require('./error-handler.middleware');

module.exports = {
  verifyToken,
  errorHandler,
};
