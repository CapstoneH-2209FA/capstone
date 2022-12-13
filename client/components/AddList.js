import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createList, fetchLists } from "../store/listSlice";
import "../styles/Board.css";
import "../styles/AddList.css";

const AddList = ({ projectid }) => {
  const dispatch = useDispatch();
  const [showAddList, setShowAddList] = useState(false);
  const [titleValue, setTitleValue] = useState({
    title: "",
  });

  const handleChange = (event) => {
    setTitleValue({ ...titleValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("TITLEVALUE>>>>", titleValue);
    if (titleValue === "") {
      // console.log("TITLEVALUE IN>>>>", titleValue);
      setShowAddList(!showAddList);
      // console.log("hello");
      return;
    }
    setShowAddList(!showAddList);
    dispatch(createList({ ...titleValue, projectId: projectid }));
  };
  return (
    <div className="Add-List">
      {showAddList ? (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              className="Add-List-Editor"
              name="title"
              value={titleValue.title}
              onChange={handleChange}
            />
            <button type="submit" className="Add-List-Button">
              Add List
            </button>
          </form>
        </div>
      ) : (
        <div
          className="Add-List-Button"
          onClick={() => setShowAddList(!showAddList)}
        >
          <ion-icon name="add" />
          Add a List
        </div>
      )}
    </div>
  );
};

export default AddList;
