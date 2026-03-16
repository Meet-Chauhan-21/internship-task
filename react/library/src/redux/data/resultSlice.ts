import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  marks: [
    {
      rno: 431,
      english: 89,
      maths: 78,
      coding: 99,
    },
  ],
};

export const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    showMark: (state)=>{
        state.marks
    },
    addMark: (state, action) => {
      state.marks.push(action.payload);
    },
    removeMark: (state, action) => {
      state.marks = state.marks.filter((d) => d.rno != action.payload);
    },
  },
});

export const { addMark, removeMark, showMark} = resultSlice.actions;

export default resultSlice.reducer;
