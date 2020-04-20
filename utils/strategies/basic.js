const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const bcrypt = require("bcrypt");
const Controller = require("../../api/components/users/index");

passport.use(
  new BasicStrategy(async function (username, password, cb) {
    try {
      const user = await Controller.query("auths", { username: username });
      console.log("el usuario:", user);
      if (!user) {
        return cb("No Authorized!!", false);
      }

      if (!(await bcrypt.compare(password, user[0].password))) {
        return cb("No Autorized!!", false);
      }
      return cb(null, user);
    } catch (err) {
      return cb(err, null);
    }
  })
);
