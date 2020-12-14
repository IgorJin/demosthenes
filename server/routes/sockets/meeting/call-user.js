function callUser(io, socket, data) {
  console.log(data.to);
  io.to(data.to).emit("outgoing", {
    signal: data.signalData,
    from: data.from,
  });
}

module.exports = {
  endpoint: callUser,
};
