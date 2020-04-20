const { mongo } = require("../config");
const { MongoClient, ObjectID } = require("mongodb");
const USER = encodeURIComponent(mongo.user);
const PASSWORD = encodeURIComponent(mongo.password);
const DB_NAME = mongo.database;
const MONGO_URI = `mongodb://${USER}:${PASSWORD}@192.168.18.21/?authSource=redsocial`;

let connection;
async function handleCon() {
  connection = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    connection = await connection.connect();
    console.log("[DB-MONGO] connected!!!");
  } catch (err) {
    setTimeout(handleCon, 2000);
  }

  connection.on("error", (err) => {
    console.log("[DB err]", err);
    throw err;
  });

  // connection.on("disconect", (err) => {
  //   console.log("[DB err]", err);
  //   throw err;
  // });
}

handleCon();

list = (collection, query) => {
  return (
    connection.db(DB_NAME).collection(collection).find(query).toArray() || []
  );
};

get = (collection, id) => {
  return connection
    .db(DB_NAME)
    .collection(collection)
    .findOne({ _id: ObjectID(id) });
};

insert = (collection, data) => {
  return connection.db(DB_NAME).collection(collection).insertOne(data);
};

update = (collection, data) => {
  return connection
    .db(DB_NAME)
    .collection(collection)
    .updateOne({ _id: ObjectID(data.id) }, { $set: data }, { upsert: true });
};

module.exports = {
  list,
  get,
  insert,
  update,
};
