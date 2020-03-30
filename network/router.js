const db = require("../api/components/db/network");
const users = require("../api/components/users/network");
const swaggerUi = require("swagger-ui-express");
const auth = require("../api/components/auth/network");
const apiDoc = require("../api/components/api-doc.json");
const routes = server => {
  server.use("/api/db", db);
  server.use("/api/users", users);
  server.use("/api/auths", auth);
  server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDoc));
};

module.exports = routes;
