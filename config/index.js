const dotenv = require("dotenv");
dotenv.config();

const config = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  nyApi: process.env.NY_API,
  nykey: process.env.NY_KEY,
  openlibraryApi: process.env.OPEN_LIBRARY_API,
  version: process.env.VERSION,
};

module.exports = { config };
