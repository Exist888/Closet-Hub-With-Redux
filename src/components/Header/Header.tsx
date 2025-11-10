import { Link } from "react-router-dom";
import { useState, useRef, JSX } from "react";
// FOR TS: import custom typed selector hook
import { useAppSelector } from "../../store/hooks"; 
import { selectCurrentUser } from "../../store/user/userSelector"; // Returns current state from Redux
import { signOutUser } from "../../services/firebase/firebase";
import { CartIcon } from "../CartIcon/CartIcon";
import { CartDropdown } from "../CartDropdown/CartDropdown";
import { Notification } from "../Notification/Notification";
import logo from "../../assets/logo.png";
import "./Header.scss";

export function Header(): JSX.Element {
    const [isDropdownClicked, setIsDropdownClicked] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    // Set up ref for CartIcon where it will be assigned using forwardRef so it can be sent to a sibling
    const cartIconRef = useRef<HTMLButtonElement | null>(null);

    // Get current user state from Redux store
    const currentUser = useAppSelector(selectCurrentUser);

    function toggleDropdown() {
        // setIsDropdownClicked((!isDropdownClicked));
        // This next line is safer than above if we get a more complex event chain later
        setIsDropdownClicked((prev) => !prev);
    }

    function closeDropdown() {
        setIsDropdownClicked(false);
    }

    async function signOutHandler() {
        try {
            await signOutUser();
            setErrorMsg(null);
        } catch (error) {
            // Check if error is of type Error (defaults to unknown until specified)
            if (error instanceof Error) {
                // Log error message only in dev mode
                if (import.meta.env.DEV) console.error(error.message);
            }
            setErrorMsg("Error signing out. Please try again.");
        }
    }

    return (
        <header>
            <nav className="elements-container" aria-label="Main Navigation">
                <Link to="/" className="logo">
                    <img src={logo} alt="Closet Hub Logo" />
                </Link>
                <div className="menu-container">
                    <ul className="menu">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        {currentUser ? (
                            <li><span onClick={signOutHandler} className="link">Sign Out</span></li>
                        ) : (
                            <li><Link to="/auth">Sign In</Link></li>
                        )}
                    </ul>
                    <CartIcon 
                        ref={cartIconRef}
                        toggleDropdown={toggleDropdown} 
                        isDropdownClicked={isDropdownClicked}
                    />
                </div>
                {isDropdownClicked && (
                    <CartDropdown 
                        closeDropdown={closeDropdown}
                        isDropdownClicked={isDropdownClicked}
                        cartIconRef={cartIconRef}
                    />
                )}
            </nav>
            {errorMsg && (
                <Notification notificationClass="errorMsg">{errorMsg}</Notification>
            )}
        </header>
    );
}