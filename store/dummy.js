const error = require("../utils/error");
const db = {
  users: [
    {
      user_id: "1",
      id: "88249432",
      tipodoc_id: 1,
      firstName: "Fabio",
      secondName: "Antonio",
      firstLastName: "Rojas",
      lastName: "Martha",
      email: "fabio.rojas@apuestascucuta75.co",
      celular: "88249432",
      birthdate: "1981-01-09",
      gender: "M",
      active: 1
    },

    {
      user_id: "2",
      id: "12345678",
      tipodoc_id: 1,
      firstName: "Neyla",
      secondName: "Liliam",
      firstLastName: "Martinez",
      lastName: "Duarte",
      email: "martinez.duarte@apuestascucuta75.co",
      celular: "3163895020",
      birthdate: "1985-11-28",
      gender: "F",
      active: 1
    }
  ],
  auths: [
    { user_id: "1", username: "fabio.rojas", password: "f62856far" },
    { user_id: "2", username: "neyla.liliam", password: "f62856far" }
  ]
};
async function list(tabla) {
  return db[tabla] || [];
}

async function get(tabla, id) {
  let dataTabla = await list(tabla);
  return dataTabla.filter(item => item.id_user === id)[0];
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
  return dataTable.filter(item => item[key] === q[key])[0] || null;
}

module.exports = {
  list,
  get,
  remove,
  upsert,
  query
};
