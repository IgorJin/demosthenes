const express = require("express");
const db = require("../db");
const runHTTPServer = require("./http").runServer;
const config = require("../../etc/config.json");
const socketConnect = require("./sockets")

const app = express();
const server = require("http").createServer(app);

const setupGlobals = async () => {
  // global.config = await readConfig();
  // global.logger = defaultLogger;
  // global.HTTPStatus = HTTPStatus;
};

async function runServer() {
  db.setUpConnection();
  //await runMigrations();

  const port = config.port;
  runHTTPServer(app);
  socketConnect(server);

  if (process.env.NODE_ENV !== "test") {
    server.listen(port, () =>
      console.log(`Server listening at http://localhost:${port}`)
    );
  }

  return app;
}

async function run() {
  await setupGlobals();
  return await runServer();
}

module.exports = {
  setupGlobals,
  run,
  runServer,
};
