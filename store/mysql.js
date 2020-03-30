const mysql = require("mysql");
const error = require("../utils/error");
const config = require("../config");

const dbconf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  insecureAuth: true
};

let connection;

function handleCon() {
  console.log(dbconf);
  connection = mysql.createPool(dbconf);

  connection.getConnection(err => {
    if (err) {
      console.error("[DB err]", err);
      setTimeout(handleCon, 2000);
    } else {
      console.log("DB Connected!!!");
    }
  });

  connection.on("error", err => {
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
      resolve(data);
    });
  });
}

module.exports = {
  list
};
