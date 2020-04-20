const express = require("express");
const router = express.Router();
const response = require("../../../network/response");
const Controller = require("./");
const passport = require("passport");
const jwt = require("jsonwebtoken");

require("../../../utils/strategies/basic");

router.post("/login", login);
router.post("/loginV2", loginV2);
async function login(req, res, next) {
  try {
    let username = req.body.username;
    let password = req.body.password;
    let token = await Controller.login(username, password);
    response.success(req, res, token);
  } catch (err) {
    next(err);
  }
}
async function loginV2(req, res, next) {
  passport.authenticate("basic", function (error, user) {
    try {
      if (error || !user) {
        throw new Error("No Authorized!!");
      }
      req.login(user, { session: false }, async function (error) {
        if (error) {
          next(error);
        }

        const payload = {
          user_id: user[0].user_id,
          username: user[0].username,
          //user_id: user.user_id,
          //username: user.username,
        };
        console.log("payload:", payload);
        const token = jwt.sign(payload, "nodesecret", {
          expiresIn: "15m",
        });
        return res.status(200).json({ access_token: token });
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
}

module.exports = router;
