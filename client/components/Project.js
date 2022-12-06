import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { fetchLists, updateList, movingList } from "../store/listSlice";
import List from "./List";
import AddList from "./AddList";
import CopyLinkModal from "./CopyLinkModal";
import { fetchSelectedProject } from "../store/projectSlice";
import {
  fetchCards,
  movingCardLists,
  updateCardIndex,
} from "../store/cardSlice";

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

  const buttonClicked = () => {
    setModalOpen(true);
    setValue(window.location.href);
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    console.log("TYPE>>>", type);

    if (type === "list") {
      const [aListDrag] = lists.filter((item) => item.id === +draggableId);
      dispatch(
        movingList({
          listDragId: aListDrag.id,
          startingIndex: source.index,
          finishingIndex: destination.index,
          projectId: params.projectId,
        })
      );
      return;
    }

    const [startingList] = lists.filter(
      (item) => item.id === +source.droppableId
    );
    const [finishingList] = lists.filter(
      (item) => item.id === +destination.droppableId
    );
    const [aCardDrag] = cards.filter((item) => item.id === +draggableId);

    if (startingList.id === finishingList.id) {
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

      dispatch(
        updateCardIndex({
          cardDragId: aCardDrag.id,
          startingIndex: source.index,
          finishingIndex: destination.index,
          listId: startingList.id,
        })
      );
      dispatch(updateList(arrayOfObj));
      return;
    }
    dispatch(
      movingCardLists({
        startingIndex: source.index,
        finishingIndex: destination.index,
        startingListId: startingList.id,
        finishingListId: finishingList.id,
      })
    );
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="workspace-heading">
          <h2>{projects.selectedProject?.title}</h2>
          <button className="inviteBtn" onClick={buttonClicked}>
            + Invite
          </button>

          {modalOpen && (
            <CopyLinkModal setOpenModal={setModalOpen} value={value} />
          )}
        </div>
        <Droppable droppableId="all-columns" direction="horizontal" type="list">
          {(provided) => (
            <div
              style={styles.listsContainer}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {lists.length &&
                lists.map((list, index) => {
                  return (
                    <List
                      key={list.id}
                      title={list.title}
                      cards={list.cards}
                      listid={list.id}
                      index={index}
                    />
                  );
                })}
              {provided.placeholder}
              <AddList projectid={params.projectId} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

const styles = {
  listsContainer: {
    display: "flex",
    // flexDirection: "column",
  },
};

export default Project;
