const auth = require("../../../auth");
module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case "update":
        const owner = req.body.user_id;
        if (auth.check.own(req, owner)) {
          next();
        }
        break;

      case "follow":
        auth.check.logged(req);
        next();
        break;

      default:
        next();
    }
  }

  return middleware;
};
