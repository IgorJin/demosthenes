const IEvent = require("../../models/IEvent");

async function create({ hostId, title }) {
  return IEvent.create({
    title,
    host: hostId,
  });
}

async function getAll() {
  return IEvent.find({});
}

module.exports = {
  create,
  getAll,
};
