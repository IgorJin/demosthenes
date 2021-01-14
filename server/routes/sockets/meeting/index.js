const listenEvent = require("../common").listenEvent

const join = require("./join").endpoint;
const sendMessage = require("./send-message").endpoint;
const offer = require("./offer").endpoint;
const answer = require("./answer").endpoint;
const addCandidate = require("./add-candidate").endpoint;
const disconnect = require("./disconnect").endpoint;

module.exports = (io, socket) => {
  listenEvent("meeting:join", io, socket, join);
  listenEvent("meeting:ice-candidate", io, socket, addCandidate);
  listenEvent("meeting:send-message", io, socket, sendMessage);
  listenEvent("meeting:offer", io, socket, offer);
  listenEvent("meeting:answer", io, socket, answer);
  listenEvent("meeting:disconnect", io, socket, disconnect);
}