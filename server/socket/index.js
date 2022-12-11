//userPool collects the userId and tracks who is in which project and makes a map for their socketIds so individuals (or all members of a specific project) can be targeted for direct messages/notifications

//const userPool={ProjectID:{UserId:SocketId}}

const userPool = {};

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id, " has made a persistent connection to the server!");

    socket.on("user-joined", (joiner) => {
      //this is probably something socket will do for you. intended to be able to target specific users in a project for DMs...which we probably will not implement.
      if (userPool[joiner.projectId]) {
        userPool[joiner.projectId][joiner.userId] = socket.id;
      } else {
        userPool[joiner.projectId] = {};
        userPool[joiner.projectId][joiner.userId] = socket.id;
      }

      socket.join(joiner.projectId);
      io.to(joiner.projectId).emit(
        "user-joined",
        Object.keys(userPool[joiner.projectId]).map((item) => +item)
      );
    });

    socket.on("user-left", (leaver) => {
      delete userPool[leaver.projectId][leaver.userId];
      socket.leave(leaver.projectId);
      io.to(leaver.projectId).emit(
        "user-left",
        Object.keys(userPool[leaver.projectId]).map((item) => +item)
      );
    });
    socket.on("send_message", (data) => {
      socket.broadcast.emit("receive_message", data);
    });
  });
};
