import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";

import AddSingleCard from "./AddSingleCard";
import SingleCard from "./SingleCard";
import { fetchCards } from "../store/cardSlice";

function List(props) {
  const { title, listid, cards } = props;
  const dispatch = useDispatch();
  const params = useParams();
  // const cards = useSelector((state) => state.cards);
  
  // const filterCards = cards.filter((item) => item.listId === listid);
  
  useEffect(() => {
    dispatch(fetchCards(params.projectId));
    console.log('list.cards', cards)
  }, [cards]);

  return (
    <Droppable droppableId={listid.toString()}>
      {(provided) => (
        <div
          style={styles.container}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h4>{title}</h4>

          {cards &&
            cards.map((card, index) => (
              <SingleCard
                key={card.id}
                cardId={card.id}
                title={card.title}
                description={card.description}
                index={index}
                users={card.users}
              />
            ))}
          {provided.placeholder}
          <AddSingleCard listid={listid} />
        </div>
      )}
    </Droppable>
  );
}

const styles = {
  container: {
    backgroundColor: "lightblue",
    borderRadius: 5,
    width: 300,
    padding: 7,
    marginRight: 8,
  },
};

export default List;
