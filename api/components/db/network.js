const express = require("express");
const router = express.Router();
const response = require("../../../network/response");
const Controller = require("./");

router.get("/:table", list);
router.get("/:table/:id", get);
router.delete("/:table/:id", remove);
router.post("/:table", upsert);
async function list(req, res, next) {
  try {
    let table = req.params.table;
    let users = await Controller.list(table);
    response.success(req, res, users);
  } catch (err) {
    next(err);
  }
}

async function get(req, res, next) {
  try {
    let id = req.params.id;
    let table = req.params.table;
    let user = await Controller.get(table, id);
    console.log(user);
    response.success(req, res, user);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    let id = req.params.id;
    let table = req.params.table;
    await Controller.remove(table, id);
    response.success(req, res, "Usuario eliminado con exito.");
  } catch (error) {
    next(error);
  }
}

async function upsert(req, res, next) {
  try {
    let data = req.body;
    let table = req.params.table;
    console.log("data:", data);
    console.log("table:", table);
    let user = await Controller.upsert(table, data);
    response.success(req, res, user);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
