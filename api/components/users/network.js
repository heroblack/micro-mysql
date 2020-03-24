const express = require("express");
const router = express.Router();
const response = require("../../../network/response");
const Controller = require("./");

router.get("/", list);
router.get("/:id", get);
async function list(req, res, next) {
  try {
    console.log("lista usuarios", test);
    console.log("entorno:");
    let users = await Controller.list();
    response.success(req, res, users);
  } catch (err) {
    next(err);
  }
}

async function get(req, res, next) {
  try {
    let id = req.params.id;
    let user = await Controller.get(id);
    response.success(req, res, user);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
