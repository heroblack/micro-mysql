const express = require("express");
const app = express();
const morgan = require("morgan");

const routes = require("../network/router");
const error = require("../network/error");

//middlewares
//app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
routes(app);
app.use(error);

module.exports = app;
