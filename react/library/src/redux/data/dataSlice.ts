import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [
    {
      id: 1,
      name : "meet chauhan",
      rno : 431,
    }
  ]
}

export const dataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    addData: (state,action)=>{
      state.data.push(action.payload)
    },
    removeData: (state,action)=>{
      state.data = state.data.filter((d)=> d.id != action.payload)
    }
  }
})

export const { addData, removeData } = dataSlice.actions

export default dataSlice.reducer