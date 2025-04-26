const express = require('express');
const cors = require('cors');
const http = require("http");
const swagger = require('./utils/swagger.js');
const ResponseFormatter = require('./utils/ResponseFormatter.js');

//ENV
require('dotenv').config();

//DB
require('./db/postgres.js');

//SERVER
const app = express();

// swagger
swagger(app);

//CORS
var corsOptionsDelegate = function (req, callback) {
  var corsOptions = { origin: true };
  callback(null, corsOptions);
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors(corsOptionsDelegate));

//routes
app.use(require("./routes/index"));

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  return res.status(status).json(ResponseFormatter.error(message, status));
});

const server = http.createServer(app);

server.listen(process.env.PORT, "0.0.0.0", () =>
  console.log(`Book server is listening on port ${process.env.PORT}!`)
);