const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
  title: String,
  host: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  id: String,
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  sockets: [{ type: String }],
});

MeetingSchema.statics.findById = async (id) => {
  return await IMeeting.findOne({ id }).populate("host");
};

MeetingSchema.statics.addUser = async (id, userId) => {
  //await IMeeting.updateOne({ id }, { $addToSet: { users: userId } });
  await IMeeting.updateOne({ id }, { $addToSet: { sockets: userId } });
};
MeetingSchema.statics.getUsers = async (id) => {
  return await IMeeting.findOne({ id }).populate("host").populate("users");
};

const IMeeting = mongoose.model("IMeeting", MeetingSchema);

module.exports = IMeeting;
