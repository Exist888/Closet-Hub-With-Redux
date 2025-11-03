import { createAction } from "../../utils/reducer/reducerUtils";
import { CATEGORIES_ACTION_TYPES } from "./categoriesActionTypes";

// Use in App.jsx to update categories state
export function setCategories(categoryObjectsArray) {
    return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoryObjectsArray);
}