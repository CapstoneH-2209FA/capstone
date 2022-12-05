import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MUIModal from "@mui/material/Modal";
import styled from "styled-components";

import { toggleModal } from "../store/uiSlice";

const ReusableModal = ({ children, modalName }) => {
  const dispatch = useDispatch();
  const { modalIsOpen } = useSelector((state) => state.ui);

  const styles = {
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  return (
    <MUIModal
      style={styles.root}
      open={modalIsOpen[modalName]}
      onClose={() => dispatch(toggleModal(modalName))}
    >
      <div style={{ backgroundColor: "white", padding: 10 }}>
        <p style={{ textAlign: "right" }}>
          <button onClick={() => dispatch(toggleModal(modalName))}>X</button>
        </p>
        <Children>{children}</Children>
      </div>
    </MUIModal>
  );
};

export default ReusableModal;

const Children = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin: 20;
`;
