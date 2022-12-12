import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import socket from "../socket";
import history from "../history";
import { sendToken } from "./helperFunctions";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (message, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/chat", message, sendToken());
      socket.emit("send_message", message);
      thunkAPI.dispatch(sentMessage(data));
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (projectId, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/chat/${projectId}`, sendToken());
      thunkAPI.dispatch(allMessages(data));
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState = {
  online: [],
  messageList: [],
  messagesNumber: 0,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    userJoined: (state, action) => {
      state.online = action.payload;
    },
    userLeft: (state, action) => {
      state.online = action.payload;
    },
    sentMessage: (state, action) => {
      state.messageList.push(action.payload);
    },
    receiveMessage: (state, action) => {
      state.messageList.push(action.payload);
    },
    allMessages: (state, action) => {
      state.messageList = action.payload;
    },
    resetCounter: (state) => {
      state.messagesNumber = 0;
    },
    incrementMessageCounter: (state) => {
      state.messagesNumber = state.messagesNumber + 1;
    },
  },
});

export const {
  userJoined,
  userLeft,
  sentMessage,
  receiveMessage,
  allMessages,
  resetCounter,
  incrementMessageCounter,
} = chatSlice.actions;
export default chatSlice.reducer;
