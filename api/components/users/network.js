const express = require("express");
const router = express.Router();
const response = require("../../../network/response");
const Controller = require("./");
const secure = require("./secure");
const passport = require("passport");
const cacheResponse = require("../../../utils/cacheResponse");
const { FIVE_MINUTES_IN_SECONDS } = require("../../../utils/time");

require("../../../utils/strategies/jwt");
router.get("/", list);
router.get("/:id", get);
router.get("/:id/following", following);

router.post("/", passport.authenticate("jwt", { session: false }), upsert);
router.put("/", upsert);
router.post("/follow/:id", secure("follow"), follow);
async function list(req, res, next) {
  //cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
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
    response.success(req, res, user.data);
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

async function follow(req, res, next) {
  try {
    console.log("user 1:", req.user.user_id);
    console.log("user 2:", req.params.id);
    let follow = await Controller.follow(req.user.user_id, req.params.id);
    response.success(req, res, follow, 201);
  } catch (err) {
    next(err);
  }
}

async function following(req, res, next) {
  try {
    let idUsuario = req.params.id;
    let followers = await Controller.following(idUsuario);
    response.success(req, res, followers, 200);
  } catch (err) {
    next(err);
  }
}

async function query(req, res, next) {
  try {
    console.log("<<<<--entra a query-->>>>");
    console.log("tabla:", req.params.tabla);
    console.log("query:", req.query);
    console.log("body:", req.body);
    let consulta = await Controller.query2(
      req.body.table,
      req.body.join,
      req.query
    );
    console.log(consulta);
    response.success(req, res, consulta, 201);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
