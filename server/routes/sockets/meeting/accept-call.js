function acceptCall(io, socket, data) {
  io.to(data.to).emit("callAccepted", data.signal);
}

module.exports = {
  endpoint: acceptCall,
};
