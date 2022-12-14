import React, { useState } from "react";
import ReusableModal from "./ReusableModal";
import styled from "styled-components";
import { Avatar, } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import MUIModal from "@mui/material/Modal";
import { assignToCard, removeFromCard } from "../store/userCardSlice";
import { selectedCard, toggleModal } from "../store/uiSlice";
import { fetchCards, updateCard } from "../store/cardSlice";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

const CardModalNew = () => {
  const dispatch = useDispatch();
  const { modalIsOpen, selectedCard } = useSelector((state) => state.ui);
  const { selectedProject } = useSelector((state) => state.project);
  const { project } = useSelector((state) => state);

  const { users, cardId, title, description } = useSelector(
    (state) => state.ui.selectedCard
  );

  const userCard = useSelector((state) => state.userCard);
  
  const filterUserCard = userCard.filter((card) => card.id === cardId);
  let filterIndex = filterUserCard.length - 1;
  const filterUsers = filterUserCard[filterIndex]?.users;
  
  const [cardVals, setCardVals] = useState({
    title: "",
    description: "",
    id: cardId,
  });
  
  useEffect(() => {
    setCardVals({ title, description, cardId });
  }, [cardId]);

  const handleChange = (e) => {
    setCardVals({ ...cardVals, [e.target.name]: e.target.value });
  };

  const usersOnTask = (filterUsers ? filterUsers : users)?.map(
    (user) => user.id
  );
  
  const handleClick = (e, userId) => {
    const userCard = {
      userId,
      cardId,
      task: title,
      projectId: project.selectedProject.id,
      projectTitle: project.selectedProject.title,
    };
    !usersOnTask?.includes(userId)
      ? dispatch(assignToCard(userCard))
      : dispatch(removeFromCard(userCard));
  };

  const handleClose = () => {
    dispatch(updateCard({ title: cardVals.title, description: cardVals.description, id: cardId, }));
    dispatch(fetchCards(selectedProject.id));
    dispatch(toggleModal("card"));
  };

  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const pickedColor = "#" + randomColor;

  const date = selectedCard.updatedAt?.slice(0, 12);
  const time = selectedCard.updatedAt?.slice(14);


  const styles = {
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    backgroundSize: "cover",
    borderRadius: "50px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <MUIModal 
      style={styles.root}
      open={modalIsOpen.card}
      onClose={(handleClose)}
    >
      <Box sx={style}>
        <CardContainer sx={style}>
          <TextField
            style={{
              margin: "10px",
              backgroundColor: "white",
            }}
            value={cardVals.title}
            onChange={handleChange}
            id="outlined-basic"
            label="Title"
            name="title"
            variant="outlined"
            required
            inputProps={{ style: {fontFamily: "Ubutu" } }}
          />
          <TextField
            style={{ margin: "10px", backgroundColor: "white" }}
            value={cardVals.description}
            onChange={handleChange}
            id="outlined-basic"
            label="Description"
            name="description"
            variant="outlined"
            required
            inputProps={{ style: {fontFamily: "Ubutu" } }}
          />
          <h2 style={{ textAlign: "center" }}>Assignees</h2>
          <AssigneeBox>
            {(filterUsers ? filterUsers : users)?.map((u) => (
              <Assignee key={u.id}>
                {u.avatarURL ? (
                  <Frame>
                    <img height="60px" width="60px" src={u.avatarURL} />
                  </Frame>
                ) : (
                  <Avatar sx={{ bgcolor: pickedColor, width: 40, height: 40 }}>
                    {u.firstName.charAt(0).toUpperCase()}
                    {u.lastName.charAt(0).toUpperCase()}
                  </Avatar>
                )}
                <Typography sx={{ fontFamily: "Ubutu" }}>{u.firstName}</Typography>
              </Assignee>
            ))}
          </AssigneeBox>
          <hr />
          <ProjectMemberBox>
            {project.selectedProject.users?.map((u) => {
              return (
                <ProjectMember key={u.id}>
                  <div
                    style={{
                      borderRadius: "10px",
                      textAlign: "center",
                    }}
                  >
                  <Typography sx={{ fontFamily: "Ubutu" }}>{u.firstName}</Typography>
                  </div>
                    <Button
                      variant="contained"
                      onClick={(e) => handleClick(e, u.id)}
                    >
                    {usersOnTask?.includes(u.id) ? "remove" : "add"}
                  </Button>
                </ProjectMember>
              );
            })}
          </ProjectMemberBox>
          <hr />
          <CreatedAtBox>
            <Typography display="flex" sx={{ fontFamily: "Ubutu", justifyContent: "center" }} >
                <span>{"Updated at "}</span>
                <span>{time}</span>
                <span>{" on "}</span>
                <span>{date}</span>
              </Typography>
          </CreatedAtBox>
        </CardContainer>
      </Box>
    </MUIModal>
  );
};

export default CardModalNew;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 50px;
`;

const Assignee = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AssigneeBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const CreatedAtBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const ProjectMemberBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ProjectMember = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 5px;
`;

const Frame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  overflow: hidden;
`;
