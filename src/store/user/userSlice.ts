// FOR TOOLKIT: import createSlice method and change file name to userSlice
// FOR TS: import PayloadAction to type the action in reducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../../types";

const INITIAL_STATE: UserState = {
    currentUser: null
};

// FOR TOOLKIT: use createSlice to replace handle name, state, and actions
export const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    reducers: {
        // FOR TS: PayloadAction will always be of type User
        // This is the same type to which our state (currentUser) is assigned
        setCurrentUser: (state, action: PayloadAction<User>) => {
            // Syntax looks mutable but Toolkit uses library that returns new object instead
            state.currentUser = action.payload;
        }
    }
});

export const { setCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;