// FOR TOOLKIT: import createSlice method and change file name to categoriesSlice
// FOR TS: import PayloadAction to type the action in reducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryObject, CategoriesState } from "../../types/types";

const INITIAL_STATE: CategoriesState = {
    categoryObjectsArray: [],
    isLoading: false
};

// FOR TOOLKIT: use createSlice to replace handle name, state, and actions
export const categoriesSlice = createSlice({
    name: "categories",
    initialState: INITIAL_STATE,
    reducers: {
        // FOR TS: PayloadAction will always be of type CategoryObject[]
        // This is the same type to which our state (categoryObjectsArray) is assigned
        setCategories: (state, action: PayloadAction<CategoryObject[]>) => {
            state.categoryObjectsArray = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }
    }
});

export const { setCategories, setIsLoading } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;