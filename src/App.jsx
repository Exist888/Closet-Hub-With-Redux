import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./routes/Layout/Layout.jsx";
import { Home } from "./routes/Home/Home.jsx";
import { Shop } from "./routes/Shop/Shop.jsx";
import { Auth } from "./routes/Auth/Auth.jsx";
import { Checkout } from "./routes/Checkout/Checkout.jsx";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop.jsx";
import { onAuthStateChangedListener, 
    createUserDocumentFromAuth,
    getCategoriesAndDocuments 
} from "./services/firebase/firebase.js";
import { setCurrentUser } from "./store/user/userSlice.ts"; // FOR TOOLKIT: import action from slice file
import { setCategories, setIsLoading } from "./store/categories/categoriesSlice.ts"; // FOR TOOLKIT: import from slice
import "./App.scss";

export function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Call listener to track auth state changes throughout app
        // Argument for user parameter is passed in automatically by Firebase - see services/firebase.js
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            // FOR TOOLKIT: Extract only serializable fields from Firebase user object (class constructor)
            const pickedUser = user ? { accessToken: user.accessToken, email: user.email } : null;
            // Pass new serializable object into Toolkit action to update state
            dispatch(setCurrentUser(pickedUser));
        });

        // Stop listener on unmount
        return unsubscribe;
    }, []);

    useEffect(() => {
        async function getCategories() {
            dispatch(setIsLoading(true));
            // Wrap fetch in try/finally block to prevent perpetual loading state
            try {
                const categoryObjectsArray = await getCategoriesAndDocuments();
                dispatch(setCategories(categoryObjectsArray));
            } finally {
                dispatch(setIsLoading(false));
            }
        }
        getCategories();
    }, []);

    return (
        <Fragment>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="shop/*" element={<Shop />} />
                    <Route path="auth" element={<Auth />} />
                    <Route path="checkout" element={<Checkout />} />
                </Route>
            </Routes>
        </Fragment>
    );
}