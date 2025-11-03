// FOR TOOLKIT: import combineReducers from toolkit instead of redux - same method name
// Import each reducer from the new slice file
import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice";
import { categoriesReducer } from "./categories/categoriesSlice";
import { cartReducer } from "./cart/cartSlice";

// 2) Set up single root reducer where all reducers will live in a single global state
export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer
});