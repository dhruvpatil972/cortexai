import { createSlice } from "@reduxjs/toolkit";

const userslice=createSlice({
    name:"user",
    initialState:{
        userData:null,

    },
    reducers:{
        setUserdata: (state, action)=>{
             state.userData=action.payload 
        } 
    }
})

export const {setUserdata}=userslice.actions
export default userslice.reducer