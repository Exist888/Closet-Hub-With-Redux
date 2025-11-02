import { createSelector } from "reselect";
import type { RootState } from "../store"; // For TS

// Select the slice of Redux state containing the cart reducer
function selectCartReducer(state: RootState) {
    return state.cart;
}

export const selectCartItems = createSelector(
    [selectCartReducer], 
    (cart) => {
        return cart.cartItems;
    }
);

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => {
        const cartCount = cartItems.reduce((totalCount, cartItem) => {
            return totalCount + cartItem.quantity;
        }, 0);
        return cartCount;
    }
);

export const selectCartTotalPrice = createSelector(
    [selectCartItems], 
    (cartItems) => {
        const cartTotalPrice = cartItems.reduce((totalPrice, cartItem) => {
            return totalPrice + (cartItem.price * cartItem.quantity);
        }, 0);
        return cartTotalPrice;
    }
);