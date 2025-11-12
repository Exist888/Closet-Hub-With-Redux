import { createSelector } from "reselect"; // Library for memoizing selectors
import type { CategoriesState, CategoryMap, CategoryObject } from "../../types/types"; // FOR TS
import type { RootState } from "../store"; // FOR TS

// Select the slice of Redux state containing the categories reducer
function selectCategoryReducer(state: RootState): CategoriesState {
    return state.categories;
}

// Memoize the array of category objects from Firebase
export const selectCategoryObjectsArray = createSelector(
    [selectCategoryReducer], 
    (categoriesSlice: CategoriesState) => {
        return categoriesSlice.categoryObjectsArray;
    }
);

// Memoize the tranformed data
export const selectCategoriesMap = createSelector(
    [selectCategoryObjectsArray], 
    (categoriesArray: CategoryObject[]): CategoryMap => {
        // Transform categories into an object keyed by lowercase category title for quick lookup
        const updatedCategoriesObj = categoriesArray.reduce((acc, categoryObj) => {
            // Destructure title and items from the document data
            const { title, items } = categoryObj;
            // Insert lowercase title as key in accumulator object and assign items array as value
            acc[title.toLowerCase()] = items;
            // Return the updated accumulator object
            return acc;
        }, {} as CategoryMap);

        return updatedCategoriesObj;
    }
);

// Create a selector for global isLoading state
export function selectIsLoading(state: RootState): boolean {
    return state.categories.isLoading;
}