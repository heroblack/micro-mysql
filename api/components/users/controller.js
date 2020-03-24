const TABLA = "users";

module.exports = function(injectStore) {
  let store = injectStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  function list() {
    return store.list(TABLA);
  }

  function get(id) {
    return store.get(TABLA, id);
  }

  function remove(table, id) {
    return store.remove(table, id);
  }

  function upsert(TABLA, data) {
    const user = {
      name: data.name
    };
    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid;
    }
    return store.upsert(table, data);
  }

  function query(table, q) {
    return store.query(table, q);
  }

  return {
    list,
    get,
    remove,
    upsert,
    query
  };
};
