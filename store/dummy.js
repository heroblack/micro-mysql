const error = require("../utils/error");
const db = {
  users: [
    { id: "1", name: "Fabio" },
    { id: "2", name: "Neyla" },
    { id: "3", name: "Daniel" },
    { id: "4", name: "David" }
  ]
};
async function list(tabla) {
  return db[tabla] || [];
}

async function get(tabla, id) {
  let dataTabla = await list(tabla);
  return dataTabla.filter(item => item.id === id)[0];
}

async function remove(tabla, id) {
  let dataTable = await list(tabla);
  let index = dataTable.findIndex(data => data.id == id);
  if (index == -1) {
    throw error("id no encotrado para eliminar!!", 501);
  }
  return db[tabla].splice(index, 1);
}

async function upsert(tabla, data) {
  if (!db[tabla]) {
    db[tabla] = [];
  }
  db[tabla].push(data);
  return data;
}

async function query(tabla, q) {
  let dataTable = await list(tabla);
  let keys = Object.keys(q);
  let key = keys[0];
  return dataTable.filter(item => item[key] === q[key])[0];
}

module.exports = {
  list,
  get,
  remove,
  upsert,
  query
};
