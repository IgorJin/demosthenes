const IParticipant = require("../../models/IParticipant");

async function create({ socket, event, userId }) {
  return await IParticipant.create({
    socketId: socket.id,
    event: event.id,
    isConferenceOwner: event.host == user,
    user: user ? user : null,
  });
}

async function getState(event) {
  return await IParticipant.find({ event: event.id });
}

module.exports = {
  create,
  getState,
};
