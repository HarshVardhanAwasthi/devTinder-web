import { createSlice } from "@reduxjs/toolkit";
const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      const newArray = state.filter((r) => r._id !== action.payload);
      return newArray;
    },
    logOut:(state,action)=>{
      return null
    }
  },
});
export const { addFeed, removeFeed,logOut } = feedSlice.actions;
export default feedSlice.reducer;
