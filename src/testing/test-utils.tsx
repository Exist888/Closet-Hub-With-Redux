import type { ReactElement, PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../store/rootReducer";
import type { RootState } from "../store/store";

type ExtendedRenderOptions = {
    // Partial type makes all properties of RootState type passed in optional
    preloadedState?: Partial<RootState>,
    store?: ReturnType<typeof configureStore>,
    // Two options for router type - use memory for testing navigation
    // Use specific strings as types when we only accept a specific string rather than any string
    router?: "browser" | "memory",
    initialEntries?: string[]
// Remove "queries" from RenderOptions type to avoid overriding RTL's query query functions
} & Omit<RenderOptions, "queries">;

// Wrap redux-related components in a new RTK store while testing
// We avoid using the real store to avoid data leakage
export function renderWithProviders(
    // First parameter is the component we will test
    ui: ReactElement, 
    // Second parameter includes additional options (including store configuration)
    extendedRenderOptions: ExtendedRenderOptions = {}
) {
    // Destructure configuration object from extended render options
    const { 
        // Optionally pass a preloaded state into the test (imitate actual state)
        preloadedState = {}, 
        // Pass a store config into the test based on new state defined per test and rootReducer
        // Create a new store for each test to avoid data leakage
        store = configureStore({ reducer: rootReducer, preloadedState }),
        // Default to browser router unless specified as memory router in test
        router = "browser", 
        // The starting url for MemoryRouter which is a built-in prop from react-router-dom
        initialEntries = ["/"],
        ...renderOptions
    } = extendedRenderOptions;

    // Create our global state provider for each tested component
    // Pass in the store configured above and wrap around the component
    // Wrapper provides a fresh Redux store to each test to avoid shared state between tests
    const Wrapper = ({ children }: PropsWithChildren) => {
        const Router = router === "memory" ? MemoryRouter : BrowserRouter
        return (
            <Provider store={store}>
                <Router>{children}</Router>
            </Provider>
        );
    }

    return {
        store,
        // Call RTL’s render with the Wrapper provider and any additional render options
        // Return all queries including the store
        // Spread operator adds store to the returned render object and merges all render methods
        ...render(ui, { wrapper: Wrapper, ...renderOptions })
    };
}


// EARLIER VERSION - From before looking at Redux docs
// Kept for reference to show evolution of this utility
// Less flexible: no wrapper, no extended render options
// -----------------------------------------------------

// // Preloaded state and store default to empty object when not passed in
// // Thus both must be optional props
// type renderWithProvidersOptions = {
//     // Partial type makes all properties of type passed in optional
//     preloadedState?: Partial<RootState>,
//     store?: ReturnType<typeof configureStore>
// }

// // Wrap redux-related components in a new RTK store while testing
// // We avoid using the real store to avoid data leakage
// export function renderWithProviders(
//     // First param is the ui component we pass in as child of the provider
//     ui: ReactElement,
//     // Second param is the configuration object
//     { 
//         // We can optionally pass a preloaded state into the test (imitate actual state)
//         preloadedState = {}, 
//         // We can pass a store we create in the test or default to root reducer with preloaded state
//         store = configureStore({ reducer: rootReducer, preloadedState }),
//     }: renderWithProvidersOptions = {} // Default to empty object if nothing is passed in
// ) {
//     return render(<Provider store={store}>{ui}</Provider>);
// }