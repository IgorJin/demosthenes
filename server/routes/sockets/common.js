function listenEvent(event, io, socket, handler) {
  try {
    socket.on(event, async (data, callback) => {
      handler(io, socket, data, callback);
    });
  } catch (e) {
    console.error(e.toString());
  }
}

module.exports ={
  listenEvent,
}
