function acceptCall(io, socket, data) {
  io.to(data.target).emit("answer", data);
}

module.exports = {
  endpoint: acceptCall,
};
