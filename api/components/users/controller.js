const nanoid = require("nanoid");
const auth = require("../auth");
const TABLA = "users";

module.exports = function (injectStore, injectCache) {
  let store = injectStore;
  let cache = injectCache;
  if (!store) {
    store = require("../../../store/dummy");
  }

  if (!cache) {
    store = require("../../../store/dummy");
  }

  async function list() {
    let users = await cache.list(TABLA);
    if (!users) {
      console.log("No estaba en cache");
      users = await store.list(TABLA);
      cache.upsert(TABLA, users);
    } else {
      console.log("nos traemos datos de cache");
    }
    return users;
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
      documento: data.documento,
      tipodoc_id: data.tipodoc_id,
      firstName: data.firstName,
      secondName: data.secondName,
      firstLastName: data.firstLastName,
      secondLastName: data.secondLastName,
      email: data.email,
      celular: data.celular,
      birthdate: data.birthdate,
      gender: data.gender,
      active: data.active,
    };
    if (data.password || data.username) {
      let auths = {
        user_id: user.user_id,
        username: data.username,
        password: data.password,
      };

      await auth.upsert("auths", auths);
    }

    return store.upsert(TABLA, user);
  }

  function query(table, q) {
    return store.query(table, q);
  }

  function query2(table, join, query) {
    return store.query2(table, join, query);
  }

  function following(user) {
    const table = { follow: "user_to" };
    const join = {};
    join[TABLA] = "user_id";
    const query = { user_from: user };
    return store.query(table, query, join);
  }

  function follow(from, to) {
    return store.upsert("follow", {
      user_from: from,
      user_to: to,
    });
  }

  return {
    list,
    get,
    remove,
    upsert,
    query,
    following,
    follow,
  };
};
