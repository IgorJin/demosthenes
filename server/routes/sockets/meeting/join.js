const IEvent = require("../../../models/IEvent");
const Participants = require("../../../controllers/internal/participants");

async function join(io, socket, data) {
  try {
    const { eventId, userId } = data;
    const event = IEvent.findById(eventId);
    if (!event) {
      throw Error("Can't find event");
    }
    const participant = await Participants.create({ socket, event, userId });

    const currentParticipantsState = await Participants.getState(event);
    console.log("join -> currentParticipantsState", currentParticipantsState)
    if (currentParticipantsState.length > 1) {
      io.to(room).emit("NEW_USER", {
        user: "admin",
        newUser: userId,
        participant: currentParticipantsState,
        event,
        message: `Welcome to Room #${event.title}, ${user?.displayName}`, //TODO guest can put name
      });
    }
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  endpoint: join,
};
