import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { Draggable } from "react-beautiful-dnd";
import CardModal from "./CardModal";

const SingleCard = ({ cardId, title, description, index }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const handleClick = (e) => {
    dispatch(selectedCard({ title, description }));
    dispatch(toggleModal("card"));
  };

  // const cards = useSelector((state) => state.cards);

  return (
    <Draggable draggableId={cardId.toString()} index={index}>
      {(provided) => (
        <Card
          // style={styles.cardContainer}
          // onClick={handleClick}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {/* {modalOpen && (
        <CardModal
          setOpenModal={setModalOpen}
          cardId={cardId}
          title={title}
          description={description}
        />
      )} */}
          {/* <CardContent style={styles.cardContent}> */}
          {/* <Typography> */}
          {title}
          {/* </Typography> */}
          {/* </CardContent> */}
        </Card>
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
