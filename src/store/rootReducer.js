import { combineReducers } from "redux";
import { userReducer } from "./user/userReducer.js";

// 2) Set up single root reducer where all reducers will live in a single global state
export const rootReducer = combineReducers({
    user: userReducer
});