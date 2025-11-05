import { Fragment, useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { Spinner } from "./components/Spinner/Spinner";
import { onAuthStateChangedListener, 
    createUserDocumentFromAuth,
    getCategoriesAndDocuments 
} from "./services/firebase/firebase";
import { setCurrentUser } from "./store/user/userSlice"; // FOR TOOLKIT: import action from slice file
import { setCategories, setIsLoading } from "./store/categories/categoriesSlice"; // FOR TOOLKIT: import from slice
import "./App.scss";

// Implement lazy loading for routes to only bundle a page once the user needs to see it
const Layout = lazy(() => import("./routes/Layout/Layout"));
const Home = lazy(() => import("./routes/Home/Home"));
const Shop = lazy(() => import("./routes/Shop/Shop"));
const Auth = lazy(() => import("./routes/Auth/Auth"));
const Checkout = lazy(() => import("./routes/Checkout/Checkout"));

export function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Call listener to track auth state changes throughout app
        // Argument for user parameter is passed in automatically by Firebase - see services/firebase
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
            <Suspense fallback={<Spinner />}>
                <Routes>
                    <Route path="/" element={<Layout />} >
                        <Route index element={<Home />} />
                        <Route path="shop/*" element={<Shop />} />
                        <Route path="auth" element={<Auth />} />
                        <Route path="checkout" element={<Checkout />} />
                    </Route>
                </Routes>
            </Suspense>
        </Fragment>
    );
}