import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MUIModal from "@mui/material/Modal";
import styled from "styled-components";
import { toggleModal } from "../store/uiSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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

  const style = {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "50px",
    border: "7px light gray",
    // border: "7px secondary: dark",
    boxShadow: 24,
    p: 4,
  };


  return (
    <MUIModal
      style={styles.root}
      open={modalIsOpen[modalName]}
      onClose={() => dispatch(toggleModal(modalName))}
    >
      <Box sx={style}>
        {/* <Typography id="modal-modal-title" variant="h6" component="h2">

          </Typography> */}
        {children}
        {/* <Children>{children}</Children> */}
      </Box>
    </MUIModal>
  );
};

export default ReusableModal;

// const Children = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: white;
//   margin: 20;
// `;
