const express = require("express");
const app = express();
const morgan = require("morgan");
const morganBody = require("morgan-body");
const path = require("path");

const routes = require("../network/router");
const error = require("../network/error");
const expressJsx = require("../network/express-jsx");
//middlewares
//app.use(cors());
app.engine("jsx", expressJsx);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jsx");

app.get("/", function(req, res) {
  res.render("index", { hello: "hola", world: "mundo" });
});
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
morganBody(app);
routes(app);
app.use(error);

module.exports = app;
