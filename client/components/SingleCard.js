import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';

import CardModal from './CardModal'



const SingleCard = ({ cardId, title, description }) => {

  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => setModalOpen(true)

  return (
    <Card style={styles.cardContainer} onClick={handleClick}>
      {modalOpen && <CardModal 
        setOpenModal={setModalOpen} 
        cardId={cardId}
        title={title} 
        description={description}/>}
      <CardContent style={styles.cardContent}>
        <Typography>{title}</Typography>
      </CardContent>
    </Card>
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
  }
};
export default SingleCard;
