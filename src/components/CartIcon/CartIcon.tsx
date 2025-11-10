import { forwardRef } from "react";
import type { JSX, Ref } from "react";
// FOR TS: import custom typed selector hook
import { useAppSelector } from "../../store/hooks"; 
import { selectCartCount } from "../../store/cart/cartSelector";
// Import svg as react component so it can be styled
// FOR TS: declare module for *.svg?react in src/types/custom.d.ts
import ShoppingBag from "../../assets/shopping-bag.svg?react";
import "./CartIcon.scss";

type CartIconInnerProps = {
    toggleDropdown(): void,
    isDropdownClicked: boolean
}

// Use forwardRef and inner component because we will pass this into a sibling via the Header parent
export function CartIconInner({ 
    toggleDropdown, 
    isDropdownClicked 
}: CartIconInnerProps, ref: Ref<HTMLButtonElement>): JSX.Element {
    const cartCount = useAppSelector(selectCartCount);

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