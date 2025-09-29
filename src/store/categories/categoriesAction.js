import { createAction } from "../../utils/reducer/reducerUtils.js";
import { CATEGORIES_ACTION_TYPES } from "./categoriesActionTypes.js";

export function setCategoriesMap(categoriesMap) {
    return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categoriesMap);
}