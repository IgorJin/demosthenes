const SockerIO = require("socket.io");
const socketRoutes = require("../routes/sockets")
//const redisAdapter = require("socket.io-redis");

function runServer(server) {
  const io = SockerIO(server, { transports: ["websocket"] });
  // const connectionOptions = { host: config.redis.host, port: config.redis.port };
  // if (config.redis.password) {
  //   connectionOptions.password = config.redis.password;
  // }

  // io.adapter(redisAdapter(connectionOptions));

  io.on("connection", (socket) => {
    console.log(`Socket ${socket.id} connected`);
    socketRoutes(io, socket);
  });
  return io;
}

module.exports = { runServer };
