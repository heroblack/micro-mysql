const response = require("./response");
const { sentry } = require("../config");
const Sentry = require("@sentry/node");
const config = require("../config");
Sentry.init({
  dsn: `https://${sentry.dns}@o376092.ingest.sentry.io/${sentry.id}`,
});

function logError(err, req, res, next) {
  console.log("1). logerror");
  console.log(err.stack);
  next(err);
}

function error(err, req, res, next) {
  Sentry.captureException(err);
  //catch error  while streaming
  if (res.headersSent) {
    next(err);
  }

  if (!config.dev) {
    delete err.stack;
  }

  let message = err.message || "Error Interno";
  let statusCode = err.statusCode || 500;
  response.error(req, res, message, statusCode);
  /*
  if (req.xhr) {
    response.error(req, res, message, statusCode);
  } else {
    res.status(statusCode);
    res.render("error", { error: err });
  }
  */
}

module.exports = {
  logError,
  error,
};
