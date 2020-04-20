const { mongo } = require("../config");
const { MongoClient } = require("mongodb");
const moment = require("moment");
const USER = encodeURIComponent(mongo.user);
const PASSWORD = encodeURIComponent(mongo.password);
const DB_NAME = mongo.database;

const MONGO_URI = `mongodb://${USER}:${PASSWORD}@192.168.18.21/?authSource=redsocial`;
console.log(MONGO_URI);
// const fechaActual = moment(new Date(), "DD/MM/YYYY");
// const fechaVence = moment("10/04/2020", "DD/MM/YYYY");

// if (fechaVence.isBefore(fechaActual)) {
//   console.log("factura vencida");
// }

class MongoLib {
  constructor(dbName) {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = dbName;
    this.connection();
  }

  async connection() {
    try {
      await this.client.connect();
    } catch (err) {
      console.log(err);
    }
  }

  getAll = async (collection, query) => {
    return this.client
      .db(this.dbName)
      .collection(collection)
      .find(query)
      .toArray();
  };
}

// const con = new MongoLib("redsocial");

// async function getProducts() {
//   try {
//     let products = await con.getAll("products", {});
//     console.log(products);
//   } catch (err) {
//     console.log(err);
//   }
// }
// getProducts();

module.exports = MongoLib;
