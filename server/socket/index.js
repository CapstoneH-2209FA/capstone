// const Message = require("../db/models/message");
// const Channel = require("../db/models/channel");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id, " has made a persistent connection to the server!");

    socket.on("student-joined", (student) => {
      console.log(student);
      socket.broadcast.emit("student-joined", student);
    });

    socket.on("student-left", (student) => {
      console.log(student);
      socket.broadcast.emit("student-left", student);
    });

    socket.on("message", (message) => {
      console.log(message);
      socket.broadcast.emit("message", message);
    })
    //=============================================
    socket.on("send_message", (data) => {
      socket.emit("receive_message", data);
      console.log(data)
    });
    // socket.on("new-channel", (channel) => {
    //   socket.broadcast.emit("new-channel", channel);
    // });
  });
};
