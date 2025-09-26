import { createContext, useState, useMemo, useCallback } from "react";

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

export const CartContext = createContext({
    cartItems: [],
    cartCount: 0,
    cartTotalPrice: 0,
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    decrementItemCount: () => {},
});

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    // Replace useEffect with useMemo since cartCount is a derived value
    const cartCount = useMemo(() => {
        // Params include incrementing total and current item being iterated through
        return cartItems.reduce((totalCount, cartItem) => {
            // Add current item quantity to total
            return totalCount + cartItem.quantity
        // Include starting value
        }, 0);
    }, [cartItems]);

    const cartTotalPrice = useMemo(() => {
        return cartItems.reduce((totalPrice, cartItem) => {
            return totalPrice + (cartItem.price * cartItem.quantity);
        }, 0);
    }, [cartItems]);

    // Implement use callback on these function so React does not need to re-compute on each render
    const addItemToCart = useCallback((productToAdd) => {
        setCartItems((cartItems) => addCartItem(cartItems, productToAdd));
    }, []);

    const removeItemFromCart = useCallback((productToRemove) => {
        setCartItems((cartItems) => removeCartItem(cartItems, productToRemove));
    }, []);

    const decrementItemCount = useCallback((productToDecrement) => {
        setCartItems((cartItems) => decrementCartItem(cartItems, productToDecrement));
    }, []);

    // Implement useMemo on this object so React can store values until they change
    const value = useMemo(() => ({ 
        cartItems, 
        cartCount,
        cartTotalPrice,
        addItemToCart, 
        removeItemFromCart, 
        decrementItemCount 
    // Remove cartCount and cartTotal price from dependency array since they are derived from cartItems
    }), [cartItems, addItemToCart, removeItemFromCart, decrementItemCount]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}