const IUser = require("../../../models/IUser");
const IEvent = require("../../../models/IEvent");

function disconnect(io, socket, data) {
    console.log("disconnect");
}

module.exports = {
  endpoint: disconnect,
} 