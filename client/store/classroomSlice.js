import { createSlice, current } from '@reduxjs/toolkit'



const initialState = {
  students: [],
};

export const classroomSlice = createSlice({
  name: 'classroom',
  initialState,
  reducers:{
    studentLeft: (state, {payload})=>{
      return [...state.students].filter(
        (s) => s !== payload
      );
      return { ...state, students: newStudentList };
    },
    studentJoin: (state, {payload})=>{
      return { ...state, students: [...state.students, payload] };
    }

    }
})

 export const {studentLeft, studentJoin} = classroomSlice.actions;

 export default classroomSlice.reducer;
