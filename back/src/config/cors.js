const { corsOrigin } = require('./env');

const corsOptions = {
  origin: corsOrigin,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

module.exports = corsOptions;
