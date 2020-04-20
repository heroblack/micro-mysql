const db = require("mongoose");
const { mongo } = require("../config");

//const config = require("../config");
db.promise = global.Promise;
const USER = encodeURIComponent(mongo.user);
const PASSWORD = encodeURIComponent(mongo.password);
const DB_NAME = mongo.database;
const urlMongose =
  "mongodb://daniel:Apuestas2020@192.168.18.21/redsocial?retryWrites=true&w=majority";
//const url = `mongodb://${USER}:${PASSWORD}@192.168.18.21/?authSource=redsocial`;

async function connect() {
  await db.connect(urlMongose, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  console.log("[DB-MongoDB] Connected!!");
}

connect();

list = (Model, query) => {
  return Model.find();
};

insert = (Model, data) => {
  const model = new Model(data);
  return model.save();
};

module.exports = {
  list,
  insert,
};
