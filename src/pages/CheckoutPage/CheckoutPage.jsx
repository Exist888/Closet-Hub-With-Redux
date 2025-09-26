import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext.jsx";
import { Button } from "../../components/Button/Button.jsx";
import "./CheckoutPage.scss";

export function CheckoutPage() {
    const { 
        cartItems, 
        cartCount,
        cartTotalPrice, 
        addItemToCart, 
        removeItemFromCart, 
        decrementItemCount 
    } = useContext(CartContext);

    const cartItemTableRowsJsx = cartItems.map((cartItem) => {
        const { id, name, imageUrl, price, quantity } = cartItem;

        return (
            <tr className="table-product-row" key={id}>
                <td className="td-img"><img src={imageUrl} alt={`photo of ${name}`} /></td>
                <td className="td-name">{name}</td>
                <td className="td-quantity-btn-container">
                    <button 
                        onClick={() => decrementItemCount(cartItem)}
                        className="td-quantity-btn decrease-btn"
                        >
                        <i className="fa-solid fa-minus"></i>
                    </button>
                        {quantity}
                    <button 
                        onClick={() => addItemToCart(cartItem)}
                        className="td-quantity-btn increase-btn"
                        >
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </td>
                <td className="td-price">
                    <span className="subtotal">{price * quantity} USD</span>
                    <span className="price-explanation">({price} USD x {quantity})</span>
                </td>
                <td className="td-close-btn-container">
                    <button 
                        onClick={() => removeItemFromCart(cartItem)}
                        className="td-close-btn" 
                        >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <section className="checkout-section elements-container">
            <div className="checkout-section-top-container elements-container">
                <div className="icon-and-title-container">
                    <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i>
                    <article className="tagline-and-description-container">
                        <h1>Checkout</h1>
                        <p>Verify or modify your order</p>
                    </article>
                </div>
                <div className="cart-count-and-payment-container">
                    <article className="cart-count-container">
                            <span className="cart-count-text">Items in Cart: </span>
                            <span className="cart-count-number">{cartCount}</span>
                        </article>
                    <article className="payment-total-container">
                        <span className="payment-total-text">Your Current Total: </span>
                        <Button className="checkout">
                            <i className="fa-solid fa-credit-card"></i>
                            Pay {cartTotalPrice} USD
                        </Button>
                    </article>
                </div>
            </div>
            <div className="scroll-notification-container">
                <span className="scroll-notification">
                    Scroll to view full table 
                    <i className="fa-solid fa-arrow-right"></i>
                </span>
            </div>
            <table>
                <thead>
                    <tr className="table-header-row">
                        <th>Product Photo</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItemTableRowsJsx}
                </tbody>
            </table>
        </section>
    );
}