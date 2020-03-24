const response = require("./response");
function error(err, req, res, next) {
  let message = err.message || "Error Interno";
  let statusCode = err.statusCode || 500;
  response.error(req, res, message, statusCode);
}

module.exports = error;
