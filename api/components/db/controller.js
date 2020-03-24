module.exports = function(injectStore) {
  let store = injectStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  function list(table) {
    return store.list(table);
  }

  function get(table, id) {
    return store.get(table, id);
  }

  function remove(table, id) {
    return store.remove(table, id);
  }

  function upsert(table, data) {
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
