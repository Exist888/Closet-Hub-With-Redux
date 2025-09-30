import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
// import { logger } from "redux-logger";
import { rootReducer } from "./rootReducer.js";

const loggerMiddleWare = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log("type: ", action.type);
    console.log("payload: ", action.payload);
    console.log("current state: ", store.getState());

    next(action);

    console.log("next state: ", store.getState());
}

const middleWares = [loggerMiddleWare];

// Enable redux devtools extension if available - Clean up later for production:
// const composeEnhancer = (
//     (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
// );

// const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

const composedEnhancers = compose(applyMiddleware(...middleWares));

// 1) Set up Redux store - store is passed into Provider in index.jsx, actions are dispatched in App.jsx
export const store = createStore(rootReducer, undefined, composedEnhancers);