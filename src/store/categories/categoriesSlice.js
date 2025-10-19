// FOR TOOLKIT: import createSlice method and change file name to categoriesSlice
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    categoryObjectsArray: []
};

// FOR TOOLKIT: use createSlice to replace handle name, state, and actions
export const categoriesSlice = createSlice({
    name: "categories",
    initialState: INITIAL_STATE,
    reducers: {
        setCategories: (state, action) => {
            state.categoryObjectsArray = action.payload
        }
    }
});

export const { setCategories } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;