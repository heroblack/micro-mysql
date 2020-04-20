const express = require("express");
const router = express.Router();
const response = require("../../../network/response");
const Controller = require("./");

const {
  ProductIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema,
} = require("../../../utils/schemas/products");

const validate = require("../../../network/validate");
//validation({productId: productIdSchema}, "params")
router.get("/", list);
router.get("/:id", get);
router.post("/", validate(createProductSchema), upsert);

async function list(req, res, next) {
  try {
    //throw new Error("kernel panic!!!");
    let id = req.params.id;
    let producto = await Controller.list(id);
    //res.render("products", { products });
    //res.send(producto);
    response.success(req, res, producto);
  } catch (err) {
    next(err);
  }
}

async function get(req, res, next) {
  try {
    let id = req.params.id;
    let producto = await Controller.get(id);
    //res.render("products", { producto });
    response.success(req, res, producto);
  } catch (err) {
    console.log("entro aqui :(", err);
    next(err);
  }
}

async function upsert(req, res, next) {
  try {
    let data = req.body;
    let producto = await Controller.addProduct(data);
    response.success(req, res, producto);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
