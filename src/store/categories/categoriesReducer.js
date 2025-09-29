import { CATEGORIES_ACTION_TYPES } from "./categoriesActionTypes.js";

const INITIAL_STATE = {
    categoriesMap: {}
};

// Must set default value of action to empty object to avoid an error
export function categoriesReducer(state = INITIAL_STATE, action = {}) {
    const { type, payload } = action;

    switch(type) {
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
            return { ...state, categoriesMap: payload };
        default:
            return state;
    }
}