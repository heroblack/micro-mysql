//const store = require("../../../store/remote-mysql");
const config = require("../../../config");

let store, cache;
if (config.remoteDB === true) {
  store = require("../../../store/remote-mysql");
  cache = require("../../../store/remote-cache");
} else {
  store = require("../../../store/mysql");
  cache = require("../../../store/redis");
}
const ctr = require("./controller");

module.exports = ctr(store, cache);
