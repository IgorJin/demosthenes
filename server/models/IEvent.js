const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: String,
  host: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  startDate: Date,
});

EventSchema.statics.findById = async (id) => {
  return await IEvent.findOne({ id }).populate("host");
};

const IEvent = mongoose.model("IEvent", EventSchema);

module.exports = IEvent;
