const express = require("express");
const router = express.Router();
const response = require("../../../network/response");
const Controller = require("./");
const secure = require("./secure");
router.get("/", list);
router.get("/:id", get);
router.post("/", upsert);
router.put("/", secure("update"), upsert);
async function list(req, res, next) {
  try {
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

async function upsert(req, res, next) {
  try {
    let data = req.body;
    let user = await Controller.upsert(data);
    response.success(req, res, user);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
