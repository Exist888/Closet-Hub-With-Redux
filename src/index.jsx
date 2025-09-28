import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// import { UserProvider } from "./contexts/UserContext.jsx";
import { CategoriesProvider } from "./contexts/CategoriesContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { App } from "./App.jsx";
import { store } from "./store/store.js";
import "./index.scss";

const root = createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                {/* <UserProvider> */}
                    <CategoriesProvider>
                        <CartProvider>
                            <App />
                        </CartProvider>
                    </CategoriesProvider>
                {/* </UserProvider> */}
            </BrowserRouter>
        </Provider>
    </StrictMode>
);