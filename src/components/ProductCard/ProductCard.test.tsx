import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../testing/test-utils";
import { ProductCard } from "./ProductCard";

describe("ProductCard test", () => {
    test("increment total count when product cart button is clicked", () => {
        const mockProduct = {
            id: 1,
            imageUrl: "test",
            name: "Item A",
            price: 10,
            quantity: 1
        }

        // Destructure new store from return value from renderWithProviders
        const { store } = renderWithProviders(
            <ProductCard product={mockProduct}/>, 
            {
                preloadedState: {
                    cart: {
                        cartItems: []
                    }
                }
            }
        );
        const addToCartBtnElement = screen.getByText(/add to cart/i);
        fireEvent.click(addToCartBtnElement);

        const totalItemsCount = store.getState().cart.cartItems.length;
        expect(totalItemsCount).toBe(1);
    });
});