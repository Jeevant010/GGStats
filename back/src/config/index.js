const env = require('./env');
const connectDatabase = require('./database');
const corsOptions = require('./cors');
const configurePassport = require('./passport');

module.exports = {
  env,
  connectDatabase,
  corsOptions,
  configurePassport,
};
