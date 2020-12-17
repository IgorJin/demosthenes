const { listen } = require("socket.io");

const listenEvent = require("../common").listenEvent

const join = require("./join").endpoint;
const sendMessage = require("./send-message").endpoint;
const callUser = require("./call-user").endpoint;
const acceptCall = require("./accept-call").endpoint;
const disconnect = require("./disconnect").endpoint;

module.exports = (io, socket) => {
  listenEvent("meeting:join", io, socket, join);
  listenEvent("meeting:send-message", io, socket, sendMessage);
  listenEvent("meeting:call-user", io, socket, callUser);
  listenEvent("meeting:accept-call", io, socket, acceptCall);
  listenEvent("meeting:disconnect", io, socket, disconnect);
}