//const config = require("../config");
const config = require("../config");

function cacheResponse(res, seconds) {
  console.log("homer simsomps:", config.dev);
  if (!config.dev) {
    console.log("hago la cache");
    res.set("Cache-Control", `public, max-age=${seconds}`);
  }
}

module.exports = cacheResponse;
