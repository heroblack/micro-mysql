const nanoid = require("nanoid");
const auth = require("../auth");
const TABLA = "posts";

module.exports = function (injectStore) {
  let store = injectStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  function list() {
    return store.list(TABLA);
  }

  return {
    list,
  };
};
