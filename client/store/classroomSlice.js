import { createSlice, current } from '@reduxjs/toolkit'



const initialState = {
  students: [],
};

export const classroomSlice = createSlice({
  name: 'classroom',
  initialState,
  reducers:{
    studentLeft: (state, {payload})=>{
      state.students = state.students.filter(
        (s) => s !== payload
      );
    },
    studentJoin: (state, {payload})=>{
      debugger
      state.students.push(payload) ;
    }

    }
})

 export const {studentLeft, studentJoin} = classroomSlice.actions;

 export default classroomSlice.reducer;
