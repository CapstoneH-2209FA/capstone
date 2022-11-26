import React from "react";
import { connect } from "react-redux";
import VideoChat from "./VideoChat";
import styled from "styled-components";
import socket from "../socket";
import Classroom from "./Classroom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


/**
 * COMPONENT
 */

const dummyClasses = ["Fullstack Academy", "History", "Math"];

export const Home = (props) => {
  const { username } = useSelector((state) => state.auth);

  // const { username } = props;
  console.log("socket", socket);
  socket.emit("new-message", `${username} is connected to the socket`);

  return (
    <div>
      <h3>Welcome, {username}</h3>
      {/* <VideoChat /> */}

      <h2>Your classes</h2>
      <ClassesContainer>
        {dummyClasses.map((c, i) => (
          <Link key={i} to="/classroom">
            <p>{c}</p>
          </Link>
        ))}
      </ClassesContainer>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);

const ClassesContainer = styled.div`
  border: 1px solid black;
`;
