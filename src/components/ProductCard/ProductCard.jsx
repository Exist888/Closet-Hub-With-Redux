import { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart/cartSlice";
import { Button, BUTTON_CLASSES } from "../Button/Button";
import { Notification } from "../../components/Notification/Notification";
import "./ProductCard.scss";

export function ProductCard({ product }) {
    const [isClicked, setIsClicked] = useState(false);

    const dispatch = useDispatch();

    const { imageUrl, name, price } = product;

    // FOR TOOLKIT: pass in one product param into dispatched action (instead of two params for redux)
    function addProductToCart() {
        dispatch(addItemToCart(product));

        setIsClicked(true);
        setTimeout(() => {
            setIsClicked(false);
        }, 2000);
    }

    // Use a dynamic key to force notification remount so animation restarts on each click
    return (
        <Fragment>
            {isClicked && (
                <Notification key={Date.now()} notificationClass="itemAddedMsg">
                    {"+ Added to cart"}
                </Notification>
            )}
            <article className="product-card">
                <img src={imageUrl} alt={`photo of ${name}`}/>
                <Button buttonClass={BUTTON_CLASSES.product} onClick={addProductToCart}>
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
        </Fragment>
    );
}