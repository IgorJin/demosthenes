const meetingRoute = require("./meeting");

module.exports = (io, socket) => {
  meetingRoute(io, socket);
}