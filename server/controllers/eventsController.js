const IEvent = require("../models/IEvent");
const Events = require("./internal/events");

async function create(req, res) {
  const { title, hostId } = req.body;
  const event = await Events.create({ title, hostId });
  res.send(event);
}

async function showAll(req, res) {
  await IEvent.find({ host: req.params.userId }, (err, meetings) => {
    if (err) return console.error(err);
  })
    .populate("host")
    .exec((err, webs) => {
      if (err) return console.error(err);
      res.send(webs);
    });
}

async function getAll(req, res) {
  const allEvents = await Events.getAll();
  res.send(allEvents);
}

module.exports = {
  create,
  showAll,
  getAll,
};
