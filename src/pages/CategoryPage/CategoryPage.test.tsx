import { screen } from "@testing-library/react";
import { vi } from "vitest";
import { renderWithProviders } from "../../testing/test-utils";
import { CategoryPage } from "./CategoryPage";

// Mock the react-route-dom library to customize a mock for useParams
vi.mock("react-router-dom", async (importOriginal) => {
    // Assign module object type to actual
    const actual: typeof import("react-router-dom") = await importOriginal();
    return {
        // Include all real methods from library in case our mock depends on some of them
        ...actual,
        // Create a mock of the useParams method for local test
        useParams: () => {
            return { category: "mens" }
        }
    }
});

describe("CategoryPage tests", () => {
    test("render Spinner when isLoading is true", () => {
        renderWithProviders(<CategoryPage />, {
            preloadedState: {
                categories: {
                    isLoading: true,
                    // Pass include a category as spinner display depends on a category text being present
                    categoryObjectsArray: [
                        {
                            title: "mens",
                            imageUrl: "test",
                            items: []
                        }
                    ]
                }
            }
        });
        const spinnerElement = screen.getByTestId("spinner");
        expect(spinnerElement).toBeInTheDocument();
    });

    test("render Categories and hide Spinner when isLoading is false", () => {
        renderWithProviders(<CategoryPage />, {
            preloadedState: {
                categories: {
                    isLoading: false,
                    categoryObjectsArray: [
                        {
                            title: "mens",
                            imageUrl: "test",
                            items: [
                                { id: 1, name: "Product 1", imageUrl: "test", price: 10, quantity: 1 },
                                { id: 2, name: "Product 2", imageUrl: "test", price: 10, quantity: 1 }
                            ]
                        }
                    ]
                }
            }
        });
        const spinnerElement = screen.queryByTestId("spinner");
        expect(spinnerElement).toBeNull();

        const productElement = screen.getByText(/product 1/i);
        expect(productElement).toBeInTheDocument();
    });
});