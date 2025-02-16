import { createSlice } from "@reduxjs/toolkit";

const storeSlice=createSlice({
    name:"user",
    initialState:null,
    reducers:{
        addUsers:(state, action)=>{
            return action.payload;
        },
        removeUser:(state,action)=>{
            return  null;
        }
    }
})

export const{addUsers, removeUser}=storeSlice.actions;  

export default  storeSlice.reducer;