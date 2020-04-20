const Model = require("./model");

addProduct = (producto) => {
  const myProduct = new Model(producto);
  return myProduct.save();
};

getProduct = (productId) => {
  let filter = {};
  if (productId) {
    filter = { id: productId };
  }
  return Model.find(filter);
};

module.exports = {
  addProduct,
  getProduct,
};
