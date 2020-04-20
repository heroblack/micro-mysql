const mysql = require("mysql");
const error = require("../utils/error");
const config = require("../config");
const buildJoin = require("../utils/query");
const dbconf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  insecureAuth: true,
};

let connection;

function handleCon() {
  connection = mysql.createPool(dbconf);

  connection.getConnection((err) => {
    if (err) {
      console.error("[DB err]", err);
      setTimeout(handleCon, 2000);
    } else {
      console.log("[DB-MSQL] Connected!!!");
    }
  });

  connection.on("error", (err) => {
    console.error("[DB err]", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleCon();
    } else {
      throw err;
    }
  });
}

handleCon();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err);
      resolve(JSON.parse(JSON.stringify(data)));
    });
  });
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM ${table} where user_id='${id}'`;
    console.log(sql);
    connection.query(sql, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE id=?`,
      [data, data.id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

function upsert(table, data) {
  if (data && data.id) {
    return update(table, data);
  }
  return insert(table, data);
}

function query(table, query, join) {
  return new Promise((resolve, reject) => {
    let sql = buildJoin(table, join);
    connection.query(sql, query, (err, data) => {
      if (err) return reject(err);
      resolve(JSON.parse(JSON.stringify(data)));
    });
  });
}

module.exports = {
  list,
  get,
  upsert,
  query,
};
