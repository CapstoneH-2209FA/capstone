import io from "socket.io-client";
import store from "./store";
import { studentJoin, studentLeft } from "./store/classroom";
// import store, { gotNewMessageFromServer } from "./store";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("I am now connected to the server!");
  socket.on("student-joined", (student) => {
    console.log("a student has joined the classroom:", student);
    store.dispatch(studentJoin(student));
  });
  socket.on("student-left", (student) => {
    store.dispatch(studentLeft(student));
  });
});

export default socket;
