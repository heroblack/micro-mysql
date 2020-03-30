const TABLA = "auths";
const error = require("../../../utils/error");
const auth = require("../../../auth");
const bcrypt = require("bcrypt");
module.exports = function(injectStore) {
  let store = injectStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  async function login(username, password) {
    const data = await store.query(TABLA, { username: username });
    console.log("la data:", data);
    let compare = await bcrypt.compare(password, data.password);
    if (compare) {
      return auth.sign(data);
    } else {
      throw error("Informacion invalida", 401);
    }
  }

  async function upsert(TABLA, data) {
    const authData = {
      user_id: data.user_id
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }

    return store.upsert(TABLA, authData);
  }

  return {
    upsert,
    login
  };
};
