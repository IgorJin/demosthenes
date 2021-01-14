function callUser(io, socket, data) {
  io.to(data.target).emit("ice-candidate", data.candidate);
}

module.exports = {
  endpoint: callUser,
};
