if (!process.env.MONGO_URI) {
  throw new Error("FATAL: MONGO_URI environment variable is missing.");
}
if (!process.env.TOKEN) {
  throw new Error("FATAL: TOKEN environment variable is missing.");
}

module.exports = {
  port: process.env.PORT || 9000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.TOKEN,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};
