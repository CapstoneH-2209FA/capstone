import React, { useState, useEffect } from "react";
import ReusableModal from "./ReusableModal";
import { useDispatch, useSelector } from "react-redux";
import { FaCopy } from "react-icons/fa";
import { Tooltip } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { copyLink } from "../store/copyLinkSlice";
import { toggleModal } from "../store/uiSlice";
import { useParams } from "react-router-dom";

const CopyLinkModal2 = () => {
  const params = useParams();

  const dispatch = useDispatch();
  const [copy, setCopy] = useState("");

  const [hashValue, setHashValue] = useState({
    hash: "",
  });

  const [disable, setDisable] = useState(false);

  const handleChange = () => {};

  const newHash = uuidv4().split("-").slice(-1)[0];
  useEffect(() => {
    if (hashValue.hash) {
      setCopy(`${window.location.href}/invite/${hashValue.hash}`);
    }
  }, [hashValue]);

  useEffect(() => {
    if (copy.length > 0) {
      dispatch(copyLink({ ...hashValue, projectId: params.projectId }));
      navigator.clipboard.writeText(copy);
    }
  }, [copy]);

  const handleCopy = async () => {
    setHashValue({ hash: newHash });
    setDisable(true);
  };

  return (
    <ReusableModal modalName="copyLink">
      <div style={styles.container}>
        <div >
          <h1 style={styles.invite}>Invite a New Member</h1>
        </div>
        <div className="body">
          <input value={window.location.href} onChange={handleChange} />

          <Tooltip title="Copy">
            <button onClick={handleCopy} disabled={disable}>
              <FaCopy />
            </button>
          </Tooltip>
        </div>
      </div>
    </ReusableModal>
  );
};

export default CopyLinkModal2;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "10",
    alignItems: "center",
    justifyContent: "center",
  },
  invite: {
    color: "#1975d2"
  }
}