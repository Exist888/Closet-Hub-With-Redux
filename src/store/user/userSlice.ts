// FOR TOOLKIT: import createSlice method and change file name to userSlice
// FOR TS: import PayloadAction to type the action in reducer
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User, UserState } from "../../types/types";

// Set initialState to camel case for more modern convention
const initialState: UserState = {
    currentUser: null
};

// FOR TOOLKIT: use createSlice to replace handle name, state, and actions
export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
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