// FOR TOOLKIT: import createSlice method and change file name to categoriesSlice
// FOR TS: import PayloadAction to type the action in reducer
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartState } from "../../types/types";

// Three helper functions that will be called in slice below
function addCartItem(cartItems: CartItem[], productToAdd: CartItem) {
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

function removeCartItem(cartItems: CartItem[], productToRemove: CartItem) {
    // Filter out the product to remove based on id - 
    // Filter is better than map here, as it returns only items that pass the condition
    const updatedCartItems = cartItems.filter((cartItem) => {
        return cartItem.id !== productToRemove.id;
    });
    return updatedCartItems;
}

function decrementCartItem(cartItems: CartItem[], productToDecrement: CartItem) {
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

// Set initialState to camel case for more modern convention
const initialState: CartState = {
    cartItems: [],
}

export const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        // FOR TS: PayloadAction will always be of type CartItem
        // This is the same type to which our state (cartItems) is assigned
        addItemToCart: (state, action: PayloadAction<CartItem>) => {
            state.cartItems = addCartItem(state.cartItems, action.payload);
        },
        removeItemFromCart: (state, action: PayloadAction<CartItem>) => {
            state.cartItems = removeCartItem(state.cartItems, action.payload);
        },
        decrementItem: (state, action: PayloadAction<CartItem>) => {
            state.cartItems = decrementCartItem(state.cartItems, action.payload);
        }
    }
});

export const { addItemToCart, removeItemFromCart, decrementItem } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;