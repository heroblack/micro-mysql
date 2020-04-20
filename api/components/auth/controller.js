const TABLA = "auths";
const error = require("../../../utils/error");
const auth = require("../../../auth");
const bcrypt = require("bcrypt");
module.exports = function (injectStore) {
  let store = injectStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  async function login(username, password) {
    const data = await store.query(TABLA, { username: username });

    console.log(data);
    if (data) {
      let compare = await bcrypt.compare(password, data[0].password);
      if (compare) {
        const payload = {};
        payload.user_id = data[0].user_id;
        payload.username = data[0].username;
        return auth.sign(payload);
      } else {
        throw error("Informacion invalida", 401);
      }
    } else {
      throw error("error al ingresar login or password", 401);
    }
  }

  async function upsert(TABLA, data) {
    const authData = {
      user_id: data.user_id,
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
    login,
  };
};
