const nanoid = require("nanoid");
const auth = require("../auth");
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

  async function upsert(data) {
    const user = {
      user_id: data.user_id ? data.user_id : nanoid(),
      id: data.id,
      tipodoc_id: data.tipodoc_id,
      firstName: data.firstName,
      secondName: data.secondName,
      firstLastName: data.firstLastName,
      secondLastName: data.secondLastName,
      email: data.email,
      celular: data.celular,
      birthdate: data.birthdate,
      gender: data.gender,
      active: data.active
    };
    if (data.password || data.username) {
      let auths = {
        user_id: user.user_id,
        username: data.username,
        password: data.password
      };

      await auth.upsert("auths", auths);
    }

    return store.upsert(TABLA, user);
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
