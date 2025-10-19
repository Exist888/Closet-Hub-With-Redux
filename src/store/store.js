// FOR TOOLKIT: replace vanilla redux imports with configureStore import from toolkit
import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import { persistStore, persistReducer,
    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./rootReducer.js";

const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(Boolean);

// Create persist configuration object (blaclist user as Firebase handles persist for user)
const persistConfig = {
    key: "root",
    storage: storage,
    blacklist: ["user"]
}

// Pass rootReducer into persistedReducer and pass new persistedReducer into store
const persistedReducer = persistReducer(persistConfig, rootReducer);

// FOR TOOLKIT: replace createStore with configureStore method and pass in object with relevant props
// Toolkit comes with Thunk middleware by default - passing in middleware prop will replace defaults
export const store = configureStore({
    reducer: persistedReducer,
    // Include Toolkit's default middleware (Thunk, serializability check, mutability check) plus logger
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            // Remove the check for non-serializable data from redux-persist
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(middleWares);
    },
    devTools: process.env.NODE_ENV !== "production"
});

// Pass persistor as prop into PersistGate in index.jsx
export const persistor = persistStore(store);