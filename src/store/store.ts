// FOR TOOLKIT: replace vanilla redux imports with configureStore import from toolkit
// For TS: import Middleware type
import { configureStore, Middleware } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import { persistStore, persistReducer,
    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./rootReducer";

const middlewares: Middleware[] = []

const isDevMode = process.env.NODE_ENV !== "production";

if (isDevMode) {
    middlewares.push(logger);
}

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
        }).concat(middlewares);
    },
    devTools: isDevMode
});

// Pass persistor as prop into PersistGate in index.jsx
export const persistor = persistStore(store);

// For TS: Define type for RootState to assign to state in selectors
export type RootState = ReturnType<typeof store.getState>;
// For TS: Define type for dipatch to ensure type safety for dispatching in components
export type AppDispatch = typeof store.dispatch;