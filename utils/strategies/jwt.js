const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const Controller = require("../../api/components/users");

passport.use(
  new Strategy(
    {
      secretOrKey: "nodesecret",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (tokenPayload, cb) {
      try {
        const user = await Controller.query("auths", {
          username: tokenPayload.username,
        });
        if (!user) {
          return cb("No Authorized!!", false);
        }

        return cb(null, user);
      } catch (error) {
        return cb(error);
      }
    }
  )
);
