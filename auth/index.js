const jwt = require("jsonwebtoken");
const error = require("../utils/error");
const config = require("../config");

const secret = config.jwt.secret;

function sign(user) {
  return jwt.sign(user, secret);
}

function verify(token) {
  return jwt.verify(token, secret);
}

const check = {
  own: function(req, owner) {
    const decoded = decodeHeader(req);
    console.log("decoded:", decoded);
    if (decoded.user_id !== owner) {
      throw error("no cuentas permisos para editar", 401);
    }
  }
};

function getToken(auth) {
  if (!auth) {
    throw error("No hay token!!", 401);
  }
  if (auth.indexOf("Bearer ") === -1) {
    throw error("formato invalido!!", 402);
  }
  let token = auth.replace("Bearer ", "");
  return token;
}
function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);

  return decoded;
}

module.exports = {
  sign,
  check
};
