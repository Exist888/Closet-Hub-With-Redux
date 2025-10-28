import { createSlice } from "@reduxjs/toolkit";

// Three helper functions that will be called in slice below
function addCartItem(cartItems, productToAdd) {
    // Check whether current array includes product to add
    const existingCartItem = cartItems.find((cartItem) => {
        return cartItem.id === productToAdd.id;
    });

    if (existingCartItem) {
        const updatedCartItems = cartItems.map((cartItem) => {
            if (cartItem.id === productToAdd.id) {
                // Return all properties of cart item but increment quantity by 1
                return { ...cartItem, quantity: cartItem.quantity + 1 }
            } else {
                return cartItem;
            }
        });

        return updatedCartItems;

    } else {
        // Return all cart items plus new product with initial quantity of 1
        return [...cartItems, { ...productToAdd, quantity: 1 }];
    }
}

function removeCartItem(cartItems, productToRemove) {
    // Filter out the product to remove based on id - 
    // Filter is better than map here, as it returns only items that pass the condition
    const updatedCartItems = cartItems.filter((cartItem) => {
        return cartItem.id !== productToRemove.id;
    });
    return updatedCartItems;
}

function decrementCartItem(cartItems, productToDecrement) {
    // If quantity before decrementing is 1, remove item completely
    if (productToDecrement.quantity === 1) {
        return removeCartItem(cartItems, productToDecrement);
    }

    // Otherwise decrement the quantity by 1 for the matching product
    const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === productToDecrement.id) {
            return { ...cartItem, quantity: cartItem.quantity - 1 }
        } else {
            return cartItem;
        }
    });

    return updatedCartItems;
}

const INITIAL_STATE = {
    cartItems: [],
}

export const cartSlice = createSlice({
    name: "cart",
    initialState: INITIAL_STATE,
    reducers: {
        addItemToCart: (state, action) => {
            state.cartItems = addCartItem(state.cartItems, action.payload);
        },
        removeItemFromCart: (state, action) => {
            state.cartItems = removeCartItem(state.cartItems, action.payload);
        },
        decrementItem: (state, action) => {
            state.cartItems = decrementCartItem(state.cartItems, action.payload);
        }
    }
});

export const { addItemToCart, removeItemFromCart, decrementItem } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;