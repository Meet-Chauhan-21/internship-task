import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      rno: 1,
      name: "meet chauhan",
      course: "BCA",
    },
  ],
};

export const dataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.data.push(action.payload);
    },
    removeData: (state, action) => {
      state.data = state.data.filter((d) => d.rno != action.payload);
    },
    updateData: (state, action) => {
      state.data = state.data.map((d) =>
        d.rno === action.payload.rno ? action.payload : d,
      );
    },
    checkPrint:()=>{
      console.log("print in dataSlice")
    }
  },
});

export const { addData, removeData, updateData, checkPrint } = dataSlice.actions;

export default dataSlice.reducer;
