import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../testing/test-utils";
import { CartIcon } from "./CartIcon";

describe("CartIcon test", () => {
    test("uses preloaded state to render correct sum of quantities", () => {
        const initialCartItems = [
            { id: 1, name: "Item A", imageUrl: "test", price: 10, quantity: 1 },
            { id: 2, name: "Item B", imageUrl: "test", price: 10, quantity: 1 },
            { id: 3, name: "Item C", imageUrl: "test", price: 10, quantity: 1 },
        ];

        // Pass dummy props into CartIcon to satisfy TS prop requirements for its type
        renderWithProviders(
            <CartIcon 
                toggleDropdown={() => {}}
                isDropdownClicked={false}
            />, 
            {
                preloadedState: {
                    cart: {
                        cartItems: initialCartItems
                    }
                }
            }
        );

        const expectedCount = initialCartItems.reduce((sum, item) => {
            return sum + item.quantity;
        }, 0);
        const cartIconItemsCount = screen.getByText(expectedCount);
        expect(cartIconItemsCount).toBeInTheDocument();
    });
});