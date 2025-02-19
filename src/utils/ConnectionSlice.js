import { createSlice } from "@reduxjs/toolkit";

const connectionSlice=createSlice({
    name:"connection",
    initialState:null,
    reducers:{
        addConnetion:(state, action)=>{
            return action.payload;
        },
        removeConnection:(state, action)=>{
            return null;
        }
    }
});

export const {addConnetion,removeConnection}=connectionSlice.actions;
export default connectionSlice.reducer;