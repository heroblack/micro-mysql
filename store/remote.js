const RestApi = require("../utils/RestApi");

function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`;
  console.log("la url:", URL);
  const micro = new RestApi(URL);

  function list(table) {
    console.log("table:", table);
    return micro.get(`/${table}`);
  }

  function get(table, id) {
    return micro.get(`/${table}/${id}`);
  }

  function upsert(table, data) {
    return micro.post(`/${table}`, data);
  }

  return {
    list,
    get,
    upsert,
  };
}

module.exports = createRemoteDB;
