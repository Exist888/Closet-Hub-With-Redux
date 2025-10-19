// import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
// FOR TOOLKIT: replace vanilla redux imports with configureStore import from toolkit
import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { rootReducer } from "./rootReducer.js";

const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(Boolean);

// // Use Redux DevTools Extension in development, fallback to default compose in production
// const composeEnhancer = ((
//     process.env.NODE_ENV !== "production"
//     && typeof window !== "undefined"
//     ) ? (
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ) : (
//         compose
//     )
// );

// const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// // Create persist configuration object (blaclist user as Firebase handles persist for user)
// const persistConfig = {
//     key: "root",
//     storage: storage,
//     blacklist: ["user"]
// }

// // Pass rootReducer into persistedReducer and pass new persistedReducer into store
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // STORE SETUP: 1) Set up Redux store - pass into Provider in index.jsx, dispatch actions in components
// export const store = createStore(persistedReducer, undefined, composedEnhancers);

// FOR TOOLKIT: replace createStore with configureStore method and pass in object with relevant props
// Toolkit comes with Thunk middleware by default - passing in middleware prop will replace defaults
export const store = configureStore({
    reducer: rootReducer,
    // Include Toolkit's default middleware (Thunk, serializability check, mutability check) plus logger
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(middleWares);
    }
});

// // Pass persistor as prop into PersistGate in index.jsx
// export const persistor = persistStore(store);