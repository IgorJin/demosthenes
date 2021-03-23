const express = require("express");
const db = require("../db");
const runHTTPServer = require("./http").runServer;
const etcConfig = require("../../etc/config.json");
const config = require("common").config;
const runSocketServer = require("./sockets").runServer;
const initFirebase = require("../firebase").init;

const app = express();
const server = require("http").createServer(app);

const setupGlobals = async () => {
  global.config = config;
  initFirebase();
};

async function runServer() {
  db.setUpConnection();
  //await runMigrations();

  const port = etcConfig.port;
  runHTTPServer(app);
  runSocketServer(server);

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
