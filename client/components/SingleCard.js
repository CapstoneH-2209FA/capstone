import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Draggable } from "react-beautiful-dnd";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";

import CardModal from "./CardModal";
import { selectedCard, toggleModal  } from "../store/uiSlice";

const SingleCard = ({ cardId, title, description, index, users }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(selectedCard({ cardId, title, description, users }));
    dispatch(toggleModal("card"));
  };

  // const cards = useSelector((state) => state.cards);

  return (
    <Draggable draggableId={cardId.toString()} index={index}>
      {(provided) => (
        <div>
          <CardModal cardId={cardId} title={title} description={description}/>
          <Card
            onClick={handleClick}
            style={styles.cardContainer}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <CardContent style={styles.cardContent}>
              <Typography>{title}</Typography>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

const styles = {
  cardContainer: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    // backgroundColor: "red",
  },
  cardContent: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    // justifyContent: "flex-end",
    // backgroundColor: "green"
  },
  editIcon: {
    cursor: "pointer",
    height: 18,
    width: 18,
    // justifyContent: "flex-end"
  },
};
export default SingleCard;
