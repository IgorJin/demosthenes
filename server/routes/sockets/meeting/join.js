const IUser = require("../../../models/IUser");
const IMeeting = require("../../../models/IMeeting");

async function join(io, socket, data) {
  console.log("join");
  const { room, currentUser } = data;
  socket.join(room);
  user = await IUser.findById(currentUser);
  user.socket = socket.id;
  // await user.save();
  const meeting = await IMeeting.findById(room);
  //if (meeting.host._id != currentUser) {
  await IMeeting.addUser(room, socket.id);
  //}
  const meetingUsers = await IMeeting.getUsers(room);
  if (meetingUsers.sockets.length > 1) {
    io.to(room).emit("NEW_USER", {
      user: "admin",
      newUser: user,
      meeting,
      meetingUsers,
      message: `Welcome to Room #${room}, ${user.displayName}`,
    });
  }
}

module.exports = {
  endpoint: join,
};
