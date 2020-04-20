require("dotenv").config();
module.exports = {
  remoteDB: process.env.REMOTE_DB,
  dev: process.env.NODE_ENV !== "production",
  api: {
    server: {
      port: process.env.NODE_PORT,
    },
  },
  jwt: {
    username: process.env.AUTH_ADMIN_USERNAME,
    password: process.env.AUTH_ADMIN_PASSWORD,
    email: process.env.AUTH_ADMIN_EMAIL,
    password: process.env.AUTH_JWT_SECRET,
    secret: process.env.JWT_SECRET,
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  },
  mysqlService: {
    host: process.env.MYSQL_SVR_HOST,
    port: process.env.MYSQL_SVR_PORT,
  },
  cacheService: {
    host: process.env.MYSQL_SVR_HOST,
    port: process.env.MYSQL_SVR_PORT,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS,
  },
  mongo: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASS,
    database: process.env.MONGO_DB,
    remote: process.env.MONGO_REMOTE,
    local: process.env.MONGO_LOCAL,
  },
  sentry: {
    dns: process.env.SENTRY_DNS,
    id: process.env.SENTRY_ID,
  },
};
