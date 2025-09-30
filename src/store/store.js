import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import { rootReducer } from "./rootReducer.js";

const middleWares = [logger];

// Enable redux devtools extension if available
// Clean up later for production:
const composeEnhancer = (
    (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
);

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// 1) Set up Redux store - actions are dispatched in App.jsx, store is passed into Provider in index.jsx 
export const store = createStore(rootReducer, undefined, composedEnhancers);