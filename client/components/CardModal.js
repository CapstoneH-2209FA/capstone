import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";

import Modal from "./ReusableModal";
import { toggleModal } from "../store/uiSlice";
import { fetchCards, updateCard } from "../store/cardSlice";
import { assignToCard, removeFromCard } from "../store/userCardSlice";

const CardModal = () => {
  const dispatch = useDispatch();
  const { selectedCard } = useSelector((state) => state.ui)
  const selectedProject = useSelector((state) => state.project.selectedProject)
  const projectUsers = selectedProject.users
  console.log('selectedCard.users', selectedCard.users)
  
  useEffect(() => {
    setFormVals(selectedCard)
  }, [selectedCard]) 

  const [formVals, setFormVals] = useState({
    title: selectedCard.title,
    description: selectedCard.description,
    cardId: selectedCard.cardId,
  });                            
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCard({ ...formVals, title: formVals.title, description: formVals.description, cardId: formVals.cardId }));
    dispatch(toggleModal("card"));
    dispatch(fetchCards(selectedProject.id));
  };

  const handleChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
  };

  const handleAssign = (user) => {
    dispatch(assignToCard({userId: user.id, cardId: selectedCard.cardId})); 
  };

  const handleRemove = (user) => {
    dispatch(removeFromCard({userId: user.id, cardId: selectedCard.cardId})); 
  };

  let assignedUserIds
  if (selectedCard.users) {
    assignedUserIds = selectedCard.users.map((user) => user.id)
  } 

  return (
    <div>
      <Modal  modalName="card">
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="title">Title</label>
            <TextareaAutosize
              style={styles.titleTextArea}
              name="title"
              value={formVals.title}
              onChange={handleChange}
            />
            <label htmlFor="title">Description</label>
            <TextareaAutosize
              style={styles.descriptionTextArea}
              name="description"
              value={formVals.description} 
              onChange={handleChange}
            />
          </div>

          <p>Assigned</p>
          <div style={styles.usersContainer}>
            {selectedCard.users && selectedCard.users.map((user) => (
                <div key={user.id} style={styles.userContainer}>
                  <img
                    src={user.avatarURL}
                    height="50px"
                    width="50px"
                    style={styles.avatar}
                  />
                  <div style={styles.assignedUserName}>{user.fullName}</div>
                  <button onClick={() => handleRemove(user)}>Remove</button>
                </div>
            ))}
          </div>
          
          <p>Team Members</p>
          <div style={styles.UsersContainer}>
            {projectUsers && projectUsers.filter((user) => assignedUserIds && !assignedUserIds.includes(user.id)).map((user) => (
                <div key={user.id} style={styles.userContainer}>
                  <img
                    src={user.avatarURL}
                    height="50px"
                    width="50px"
                    style={styles.avatar}
                  />
                  <div>{user.fullName}</div>
                  <button onClick={() => handleAssign(user)}>Assign</button>
                </div>
            ))}
          </div>
          <button type="submit">Save</button>
        </form>
      </Modal>
    </div>
  );
};

const styles = {
  avatar: { 
    borderRadius: "100px", 
    marginLeft: 4 
  },
  descriptionTextArea: {
    resize: "none",
    width: "100%",
  },
  form: { 
    // display: "flex", 
    // flexDirection: "column" 
  },
  projectMembers: {
    // display: "flex",
    // flexDirection: "column",
    // flexWrap: "wrap",
  },
  titleTextArea: {
    resize: "none",
    width: "100%",
  },
  userContainer: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
  },
  usersContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  userName: {
  },
};

export default CardModal;