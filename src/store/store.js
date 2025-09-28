import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import { rootReducer } from "./rootReducer.js";

const middleWares = [logger];

// Enable redux devtools extension if available
// Clean up later for production
// const composeEnhancer = (
//     (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
// );

const composedEnhancers = compose(applyMiddleware(...middleWares));

// 1) Set up Redux store
export const store = createStore(rootReducer, undefined, composedEnhancers);