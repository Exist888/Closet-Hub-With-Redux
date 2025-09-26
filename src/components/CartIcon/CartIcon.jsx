// Use forward Ref because we will pass this ref into a sibling component via the Header parent
import { useContext, forwardRef } from "react";
import { CartContext } from "../../contexts/CartContext.jsx";
import ShoppingBag from "../../assets/shopping-bag.svg?react";
import "./CartIcon.scss";

export function CartIconInner({ toggleDropdown, isDropdownClicked }, ref) {
    const { cartCount } = useContext(CartContext);

    return (
        <button 
            ref={ref}
            onClick={toggleDropdown} 
            className={`cart-icon-container ${isDropdownClicked ? "on" : ""}`} 
            aria-label="Toggle shopping cart"
            >
            <ShoppingBag className="shopping-bag-icon" aria-hidden="true" />
            <span className="item-count">{cartCount}</span>
        </button>
    );
}

export const CartIcon = forwardRef(CartIconInner);