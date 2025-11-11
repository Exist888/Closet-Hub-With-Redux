import { screen, fireEvent } from "@testing-library/react";
import { useLocation } from "react-router-dom"; // For navigation-related test
import { Fragment } from "react";
import { vi } from "vitest";
import { renderWithProviders } from "../../testing/test-utils";
import { Header } from "./Header";

// Mock the signOutUser function from firebase
vi.mock("../../services/firebase/firebase", () => {
    return { signOutUser: vi.fn() };
});

// For mocked functions, import the mocked function after setting up mock syntax above
import { signOutUser } from "../../services/firebase/firebase";

// Helper component to exose current location
function LocationDisplay() {
    const location = useLocation();
    return (
        // Set up test id so we can reference in the navigation test
        <div data-testid="location-test">
            {location.pathname}
        </div>
    );
}

describe("Header tests", () => {
    describe("link behavior", () => {

        const linksToTest = [
            { link: /home/i, destination: "/" }, 
            { link: /shop/i, destination: "/shop" },
            { link: /sign in/i, destination: "/auth" }
        ];

        // How to set up a dynamic test that iterates through an array
        test.each(linksToTest)(
            "navigate to correct destination when link is clicked", 
            // Destruction properties from each object in the linksToTest array
            ({ link, destination }) => {
            renderWithProviders(
                <Fragment>
                    <Header />
                    <LocationDisplay />
                </Fragment>, {
                    preloadedState: {
                        user: {
                            currentUser: null
                        }
                    },
                    router: "memory", // Override default BrowserRouter with MemoryRouter
                    initialEntries: ["/"] // Start at home
                }
            );
            const navLink = screen.getByText(link);
            fireEvent.click(navLink);

            const location = screen.getByTestId("location-test");
            expect(location).toHaveTextContent(destination);
        });

        test("mock sign out function when sign out is clicked", () => {
            renderWithProviders(<Header />, {
                preloadedState: {
                    user: {
                        currentUser: { email: "test"}
                    }
                }
            });
            const signOutLink = screen.getByText(/sign out/i);
            fireEvent.click(signOutLink);
            expect(signOutUser).toHaveBeenCalled();
        });
    });

    describe("link display tests", () => {
        test("display sign in and don't display sign out when no user is logged in", () => {
            renderWithProviders(<Header />, {
                preloadedState: {
                    user: {
                        currentUser: null
                    }
                }
            });
            const signInLink = screen.getByText(/sign in/i);
            expect(signInLink).toBeInTheDocument();

            const signOutLink = screen.queryByText(/sign out/i);
            expect(signOutLink).toBeNull();
        });

        test("display sign out and don't display sign in when user is logged in", () => {
            renderWithProviders(<Header />, {
                preloadedState: {
                    user: {
                        currentUser: { email: "test"}
                    }
                }
            });
            const signOutLink = screen.getByText(/sign out/i);
            expect(signOutLink).toBeInTheDocument();

            const signInLink = screen.queryByText(/sign in/i);
            expect(signInLink).toBeNull();
        });
    });

    describe("toggle cart dropdown visibility", () => {
        test("shows dropdown when CartIcon button is clicked", () => {
            renderWithProviders(<Header />);
            // Safely query for CartIcon by role as it is the only button in the header
            const cartIconBtn = screen.getByLabelText(/toggle shopping cart/i);
            fireEvent.click(cartIconBtn);
            const dropdownCtaTextElement = screen.getByText(/let's go shopping/i);
            expect(dropdownCtaTextElement).toBeInTheDocument();
        });
    
        test("hides dropdown when CartIcon button is not clicked", () => {
            renderWithProviders(<Header />);
            const dropdownCtaTextElement = screen.queryByText(/let's go shopping/i);
            expect(dropdownCtaTextElement).toBeNull();
        });
    });
});