const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mySchema = new Schema({
  id: Number,
  name: {
    type: String,
    unique: true,
    lowercase: true,
  },
  price: Number,
  image: String,
});

const model = mongoose.model("products", mySchema);

module.exports = model;
