const express = require("express");
const router = express.Router();
const response = require("../../../network/response");
const Controller = require("./");

router.post("/login", login);

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

module.exports = router;
