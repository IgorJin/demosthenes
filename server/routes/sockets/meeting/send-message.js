const IUser = require("../../../models/IUser");

function sendMessage(io, socket, data) {
  const { room, currentUser } = data;
  socket.on("sendMessage", async (message) => {
    user = await IUser.findOne({ socket: message.user });
    io.to(message.room).emit("getMessage", {
      user: user.displayName,
      message: message.message,
    });
  });
}


module.exports = {
  endpoint: sendMessage,
} 