module.exports = {
  api: {
    server: {
      port: process.env.NODE_PORT || 3005
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || "nodejssecret"
  },
  mysql: {
    host: process.env.MYSQL_HOST || "192.168.18.21",
    user: process.env.MYSQL_USER || "david",
    password: process.env.MYSQL_PASS || "F62856far1981*",
    database: process.env.MYSQL_DB || "redsocial"
  }
};
