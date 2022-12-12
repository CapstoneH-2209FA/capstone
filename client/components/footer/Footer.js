import React, { useState } from "react";
import { FaRegCopyright } from "react-icons/fa";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { toggleModal } from "../../store/uiSlice";
import TeamMemberModal from "./TeamMemberModal";

function Footer() {
  const dispatch = useDispatch();
  const [member, setMember] = useState("mattB");

  return (
    <Container>
      <TeamMemberModal modalName="footer" member={member} />
      <FaRegCopyright /> Copyright 2022 : Workflo
      <PhotoBox>

        {["mattB", "jerral", "erik", "peter"].map((memb) => {

          return (
            <img
              key={memb}
              onClick={() => {
                setMember(memb);
                dispatch(toggleModal("footer"));
              }}
              src={`/images/profilePic/${memb}.jpeg`}
              height="50px"
              width="50px"
              style={{ borderRadius: "100px" }}
            />
          );
        })}
      </PhotoBox>
    </Container>
  );
}

export default Footer;

const MemberPhotos = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-top: auto;
  color: rgb(252, 254, 255);
  background-color: #1976d2;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0;
  font-size: 12px;
`;

const PhotoBox = styled.div`
  margin: 10px;
`;
