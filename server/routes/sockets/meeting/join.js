const IUser = require("../../models/IUser");
const IMeeting = require("../../models/IMeeting");

function join(io, socket, data) {
  const { room, currentUser } = data;
  socket.join(room);
  user = await IUser.findById(currentUser);
  user.socket = socket.id;
  await user.save();
  meeting = await IMeeting.findById(room);
  if (meeting.host._id != currentUser) {
    await IMeeting.addUser(room, currentUser);
  }
  meeting = await IMeeting.getUsers(room);
  io.to(room).emit("NEW_USER", {
    user: "admin",
    newUser: user,
    meeting,
    message: `Welcome to Room #${room}, ${user.displayName}`,
  });
}


module.exports = {
  endpoint: join,
} 