const error = require("../../../utils/error");
const COLLECTIONS = "products";
const model = require("./model");
module.exports = function (injectStore) {
  let store = injectStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  addProduct = async (product) => {
    if (!product) {
      throw error("no existe producto para crear", 501);
    }
    return store.insert(model, product);
  };

  list = (tags) => {
    const query = tags && { name: { $in: tags } };
    return store.list(model, query);
  };

  get = (id) => {
    return store.get(COLLECTIONS, id);
  };

  return {
    addProduct,
    list,
    get,
  };
};
