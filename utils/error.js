function error(message, statusCode = 500) {
  let e = new Error(message);
  e.statusCode = statusCode;
  return e;
}

module.exports = error;
