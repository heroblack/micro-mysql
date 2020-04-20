const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const morganBody = require("morgan-body");
const path = require("path");
const engines = require("consolidate");
const routes = require("../network/router");
const { logError, clientErrorHandler, error } = require("../network/error");
const expressJsx = require("../network/express-jsx");
const products = require("../utils/mocks").getProducts();
const config = require("../config");
//const mongo = require("../store/mongoDB");

//middlewares
app.use(helmet());
//app.use(cors());
//app.engine("jsx", expressJsx);

//mongo(config.mongo.local);
//static files
app.use("/static", express.static(path.join(__dirname, "../public")));
//template engine
//app.engine("hbs", engines.handlebars);
app.set("views", path.join(__dirname, "views"));
//app.set("view engine", "hbs");
app.set("view engine", "pug");

//routes
app.get("/products", function (req, res) {
  //const products2 = products.getProducts();
  //console.log(products2);
  res.render("products", { products });
});

//logs
app.use(morgan("dev"));

//body and query
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// morganBody(app);

routes(app);
//app.use(logError);
app.use(error);

//excepciones sin manejar
process.on("unhandledRejection", (e) => {
  // Won't execute
  // throw e;
  console.log("unhandledRejection", error);
});

app.listen(config.api.server.port, () => {
  console.log(`server listen http://localhost:${config.api.server.port}`);
});

//module.exports = app;
