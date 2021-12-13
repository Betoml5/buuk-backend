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
    mediaStackApi: process.env.MEDIA_STACK_API,
    mediaStackKey: process.env.MEDIA_STACK_KEY,
};

module.exports = { config };
