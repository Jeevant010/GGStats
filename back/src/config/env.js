module.exports = {
  port: process.env.PORT || 9000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.TOKEN,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};
