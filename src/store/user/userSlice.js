// FOR TOOLKIT: import createSlice method and change file name to userSlice
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    currentUser: null
};

// FOR TOOLKIT: use createSlice to replace handle name, state, and actions
export const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    reducers: {
        setCurrentUser: (state, action) => {
            // Syntax looks mutable but Toolkit uses library that returns new object instead
            state.currentUser = action.payload;
        }
    }
});

export const { setCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;