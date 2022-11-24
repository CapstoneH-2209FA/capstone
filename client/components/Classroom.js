import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import socket from "../socket";
import {studentLeft, studentJoin} from "../store/classroomSlice";
import VideoChat from "./VideoChat";
// import { useParams } from "react-router-dom";

const Classroom = () => {
  const dispatch = useDispatch();
  // const params = useParams();
  const { students } = useSelector((state) => state.classroom);
  const { username } = useSelector((state) => state.auth);

  useEffect(() => {
    socket.emit("student-joined", username);
    dispatch(studentJoin(username));
    return () => {
      socket.emit("student-left", username);
      dispatch(studentLeft(username));
    };
  }, []);

  return (
    <div>
      {JSON.stringify(students)}
      <VideoChat />
    </div>
  );
};

export default Classroom;
