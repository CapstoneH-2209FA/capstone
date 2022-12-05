import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext, onDragEnd } from "react-beautiful-dnd";

import { fetchLists, updateList } from "../store/listSlice";
import List from "./List";
import AddList from "./AddList";
import CopyLinkModal from "./CopyLinkModal";
import { fetchSelectedProject } from "../store/projectSlice";
import { fetchCards, updateCardIndex, updateCards } from "../store/cardSlice";

function Project() {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const projects = useSelector((state) => state.project);
  const cards = useSelector((state) => state.cards);
  const params = useParams();

  useEffect(() => {
    dispatch(fetchLists(params.projectId));
    dispatch(fetchSelectedProject(params.projectId));
    dispatch(fetchCards(params.projectId));
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState("");
  // const [state, setState] = useState(lists);
  // const [state, setState] = useState();

  const buttonClicked = () => {
    setModalOpen(true);
    setValue(window.location.href);
  };

  // console.log("STATE>>>>", state);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const [startingList] = lists.filter(
      (item) => item.id === +source.droppableId
    );
    const [finishingList] = lists.filter(
      (item) => item.id === +destination.droppableId
    );
    const [aCardDrag] = cards.filter((item) => item.id === +draggableId);

    if (startingList === finishingList) {
      const newCardIds = startingList.cards.map((item) => item);

      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, aCardDrag);

      const newList = {
        ...startingList,
        cards: newCardIds,
      };

      const index = lists.findIndex((object) => {
        return object.id === newList.id;
      });

      const arrangedList = lists.map((item) => item);

      arrangedList.splice(index, 1, newList);

      const newState = {
        lists: { ...arrangedList },
      };

      const arrayOfObj = Object.keys(newState.lists).map(
        (key) => (newState.lists[key] = newState.lists[key])
      );

      // console.log("newState>>>>", arrayOfObj);
      // setState(arrayOfObj);

      dispatch(
        updateCardIndex({
          cardDragId: aCardDrag.id,
          startingIndex: source.index,
          finishingIndex: destination.index,
          listId: startingList.id,
        })
      );
      dispatch(updateList(arrayOfObj));
      // dispatch(updateCards(newCard
      // console.log("AFTER SETSTATE >>>>", state);
      // }
      return;
    }
    const startCardIds = startingList.cards.map((item) => item);
    startCardIds.splice(source.index, 1);

    const newStart = {
      ...startingList,
      cards: startCardIds,
    };

    const finishCardIds = finishingList.cards.map((item) => item);
    finishCardIds.splice(destination.index, 0, aCardDrag);

    const newFinish = {
      ...finishingList,
      cards: finishCardIds,
    };

    // const index = newCardIds.findIndex((object) => {
    //   return object.id === aCardDrag.id;
    // });
    // console.log("a CARD DRAG", aCardDrag);
    // console.log("NEW CARD IDS", newCardIds);
    // console.log("the index", index);
    // newCardIds.splice(index, 1);
  };
  // console.log("THE LIST FROM REDUX", lists);
  // console.log("THE LIST FROM STATE", state);

  return (
    <div>
      <div className="workspace-heading">
        <h2>{projects.selectedProject?.title}</h2>
        <button className="inviteBtn" onClick={buttonClicked}>
          + Invite
        </button>

        {modalOpen && (
          <CopyLinkModal setOpenModal={setModalOpen} value={value} />
        )}
      </div>

      <div style={styles.listsContainer}>
        <DragDropContext onDragEnd={onDragEnd}>
          {lists.length &&
            lists.map((list) => {
              return (
                <List
                  key={list.id}
                  title={list.title}
                  cards={list.cards}
                  listid={list.id}
                />
              );
            })}
          <AddList projectid={params.projectId} />
        </DragDropContext>
      </div>
    </div>
  );
}

const styles = {
  listsContainer: {
    display: "flex",
    flexDirection: "row",
  },
};

export default Project;
