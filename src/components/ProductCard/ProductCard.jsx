import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext.jsx";
import { Button } from "../Button/Button.jsx";
import "./ProductCard.scss";

export function ProductCard({ product }) {
    const { imageUrl, name, price } = product;
    const { addItemToCart } = useContext(CartContext);

    function addProductToCart() {
        addItemToCart(product);
    }

    return (
        <article className="product-card">
            <img src={imageUrl} alt={`photo of ${name}`}/>
            <Button buttonClass="product" onClick={addProductToCart}>
                <div>
                    <i className="fa-solid fa-cart-plus"></i>
                    <span>Add to cart</span>
                </div>
            </Button>
            <div className="product-card-text">
                <span className="name">{name}</span>
                <span className="price">{price} USD</span>
            </div>
        </article>
    );
}