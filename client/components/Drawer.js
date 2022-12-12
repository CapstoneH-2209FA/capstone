import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useSelector } from "react-redux";
import WhiteboardDrawer from "./WhiteboardDrawer";
import { Link } from "react-router-dom";
import NewChat from "./NewChat";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import CopyLinkModal from "./CopyLinkModal";
import { useParams } from "react-router-dom";
import { toggleModal } from "../store/uiSlice";
import { useDispatch } from "react-redux";
import { resetCounter } from "../store/chatSlice";

export default function TemporaryDrawer({ setMessageCounter }) {
  const dispatch = useDispatch();
  const { users, id } = useSelector((state) => state.project.selectedProject);
  const { online } = useSelector((state) => state.chat);
  const params = useParams();

  const [chatbox, setChatbox] = useState(false);

  // const onlineInProj = online
  //   .filter((user) => user.projectId === params.projectId)
  //   .map((u) => u.userId);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState("");

  const buttonClicked = () => {
    dispatch(toggleModal("copyLink"));
    setValue(window.location.href);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown"
      // (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    dispatch(resetCounter());

    setState({ ...state, [anchor]: open });
  };

  const toggleChat = () => {
    setChatbox(!chatbox);
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Invite", "Whiteboards"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              {text === "Invite" && (
                <p className="inviteBtn" onClick={buttonClicked}>
                  + Invite
                </p>
              )}
              {/* {modalOpen && (
                <CopyLinkModal
                  setOpenModal={setModalOpen}
                  value={value}
                  projectId={params.projectId}
                />
              )} */}
              {text === "Whiteboards" && <WhiteboardDrawer />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <div
          style={{
            textAlign: "center",
          }}
        ></div>
        <div
          style={{
            border: "1px solid grey",
            borderRadius: "10px",
            height: "430px",
            margin: "5px",
            backgroundColor: "whitesmoke",
            overflowY: "scroll",
            filter: "drop-shadow(-5px 5px 4px grey)",
          }}
        >
          {users?.map((user, index) => (
            <ListItem key={user.id} disablePadding>
              <ListItemButton>
                <ListItemText primary={user.firstName} />
                <div
                  style={{
                    borderRadius: "100px",
                    border: "1px groove grey",
                    height: "10px",
                    width: "10px",
                    backgroundColor: online.includes(user.id) ? "green" : "red",
                  }}
                ></div>
              </ListItemButton>
            </ListItem>
          ))}
        </div>

        {chatbox ? (
          <NewChat toggleChat={toggleChat} />
        ) : (
          <Button
            style={{ width: "100%" }}
            onClick={toggleChat}
            variant="contained"
            sx={{ fontFamily: "Ubutu" }}
          >
            Chat
          </Button>
        )}
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={toggleDrawer(anchor, true)}
          >
            <MoreVertIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
