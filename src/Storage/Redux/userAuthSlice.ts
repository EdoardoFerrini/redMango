import { createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../../Interfaces";

const initialState : UserModel = {
    fullName: "",
    id: "",
    email: "",
    role: "",
};

export const userAuthSlice = createSlice({
   name:"userAuth" ,
   initialState: initialState,
   reducers:{
    setLoggedUser: (state, action)=>{
        state.fullName = action.payload.fullName,
        state.id = action.payload.id,
        state.email = action.payload.email
    }
   }
})

export const { setLoggedUser } = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;