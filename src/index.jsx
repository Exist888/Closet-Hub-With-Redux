import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { App } from "./App.jsx";
// import { store, persistor } from "./store/store.js";
import { store } from "./store/store.js";
import "./index.scss";

const root = createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <Provider store={store}>
            {/* FOR TOOLKIT: temporarily comment out PersistGate until we enable store persistance again */}
            {/* <PersistGate loading={null} persistor={persistor}> */}
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            {/* </PersistGate> */}
        </Provider>
    </StrictMode>
);