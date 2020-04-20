const express = require("express");
const router = express.Router();
const response = require("../../../network/response");
const Controller = require("./");

//Routers
router.get("/", list);

async function list(req, res, next) {
  try {
    let post = await Controller.list();
    response.success(req, res, post, 201);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
