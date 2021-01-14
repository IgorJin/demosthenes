function offer(io, socket, data) {
  io.to(data.target).emit("offer", data);
}

module.exports = {
  endpoint: offer,
};
