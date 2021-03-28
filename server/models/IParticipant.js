const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const ParticipantSchema = mongoose.Schema({
  name: { type: String },
  socketId: { type: String, index: true },
  status: { type: String, default: "online", index: true },
  event: { type: ObjectId, index: true },
  isConferenceOwner: { type: Boolean },
  user: { type: ObjectId },
});

module.exports = mongoose.model("Participant", ParticipantSchema);
