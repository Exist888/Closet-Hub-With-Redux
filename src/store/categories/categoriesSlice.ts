// FOR TOOLKIT: import createSlice method and change file name to categoriesSlice
// FOR TS: import PayloadAction to type the action in reducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// FOR TS: interfaces can stay in this file as they are small and not reused
interface CategoryItem {
    id: number,
    imageUrl: string,
    name: string,
    price: number
}

interface CategoryObject {
    title: string,
    imageUrl: string,
    items: CategoryItem[]
}

interface CategoriesState {
    categoryObjectsArray: CategoryObject[],
    isLoading: boolean
}

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