import { configureStore } from '@reduxjs/toolkit'
import auth from "./auth";
import classroomReducer from './classroomSlice'



const store = configureStore({
  reducer: {
    auth: auth,
    classroom: classroomReducer,
  }
})


export default store;
export * from "./auth";
