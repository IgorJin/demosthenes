const IUser = require("../../models/IUser");
const IMeeting = require("../../models/IMeeting");

function disconnect(io, socket, data) {
    console.log("disconnect");
}


module.exports = {
  endpoint: disconnect,
} 