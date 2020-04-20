# Configurando database MongoDB

## crear usuarios

```js
db.createUser({
  user: "admin",
  pwd: "****",
  roles: [
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "readWriteAnyDatabase", db: "admin" },
    { role: "dbAdminAnyDatabase", db: "admin" },
    { role: "clusterMonitor", db: "admin" },
  ],
});

db.grantRolesToUser("admin", [{ role: "clusterMonitor", db: "admin" }]);

db.createUser({
  user: "daniel",
  pwd: "*******",
  roles: [
    { role: "userAdmin", db: "redsocial" },
    { role: "dbAdmin", db: "redsocial" },
    { role: "readWrite", db: "redsocial" },
  ],
});
```

```bash
  sudo vim /etc/mongod.conf

  security:
    authorization: 'enabled'

  # network interfaces
  net:
    port: 27017
    bindIp: 0.0.0.0   #default value is 127.0.0.1

  sudo service mongod restart
```

# Iniciar db admin o cualquier otra base de datos

```bash
# to access the admin database
mongo -u admin -p myadminpassword 127.0.0.1/admin
# to access the other databases
mongo -u user1 -p user1password 127.0.0.1/sampledb
```

# Postman

```js
//test
var jsonData = JSON.parse(responseBody);
postman.setEnvironmentVariable("access_token", jsonData.access_token);
```

# Cors

El Intercambio de Recursos de Origen Cruzado (Cross-Origin Resource Sharing) es un mecanismo que agrega unos encabezados (Headers) adicionales HTTP para permitir que un user agent (generalmente un navegador) obtenga permisos para acceder a los recursos de un servidor en un origin distinto (dominio) del que pertenece.

Por ejemplo una solicitud de origen cruzado seria hacer una petición AJAX desde una aplicación que se encuentra en https://dominio-a.com para cargar el recurso https://api.dominio-b.com/data.json.

Por razones de seguridad, los navegadores restringen las solicitudes HTTP de origen cruzado iniciadas dentro de un script.

Si necesitamos permitir request desde un dominio diferente al del servidor podemos usar el middleware cors para permitirlo, pero es importante no dejarlo expuesto a todos los dominios.

Habilitar CORS para todos los request (No recomendado en producción)

```js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/products/:id", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.listen(8000, function () {
  console.log("CORS-enabled web server listening on port 8000");
});
```

# Habilitar CORS para los request especificos de un cliente (Recomendado para producción)

```js
const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = { origin: "http://example.com" };

app.use(cors(corsOptions));

app.get("/products/:id", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for only example.com." });
});

app.listen(8000, function () {
  console.log("CORS-enabled web server listening on port 8000");
});
```

Debemos tener en cuenta que para aplicaciones server-side es poco probable que necesiten el uso de CORS debido a que las aplicaciones conviven en el mismo dominio. Sin embargo, es buena practica habilitarlo para los llamados externos de nuestra API.

Más información sobre el middleware cors en https://expressjs.com/en/resources/middleware/cors.html

# Ejemplo

```js
// Importar la libreria de cors
const cors = require("cors");

//Configuracion del cors
const ALLOWED_ORIGINS = ["https://miAPI.com", "http://localhost:8080"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.indexOf(origin) === -1)
        return callback(
          newError(`Origen no permitido ${origin}, bloqueado, por seguridad`),
          false
        );
      return callback(null, true);
    },
  })
);
```
