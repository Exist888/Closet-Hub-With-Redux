import { JSX, memo } from "react";

import "./CartItem.scss";

type CartItem = {
    imageUrl: string,
    price: number,
    name: string,
    quantity: number
}

type CartItemProps = {
    cartItem: CartItem
}

// Memoize CartItem to prevent re-rendering unchanged items when the cart updates 
// Doing so improves performance for large carts
export const CartItem = memo(({ cartItem }: CartItemProps): JSX.Element => {
    const { imageUrl, price, name, quantity } = cartItem;

    return (
        <article className="cart-item-container">
            <img src={imageUrl} alt={`photo of ${name}`}/>
            <div className="cart-item-details">
                <span className="name">{name}</span>
                <span className="price">{quantity} x {price} USD</span>
            </div>
        </article>
    );
});