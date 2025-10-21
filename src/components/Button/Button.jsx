import "./Button.scss";

const BUTTON_CLASSES = {
    signIn: "sign-in",
    signUp: "sign-up",
    googleSignIn: "google-sign-in",
    googleContinue: "google-continue",
    product: "product",
    checkout: "checkout"
}

export function Button({ children, buttonClass = "signIn", isLoading, ...otherProps}) {
    // Use dynamic key to conditionally include class based on button type
    // Children prop passes in text while otherProps handles all other button props
    const mappedClass = BUTTON_CLASSES[buttonClass] || "";
    return (
        <button 
            className={`button-container ${mappedClass}`}
            disabled={isLoading}
            {...otherProps}
        >
            {children}
        </button>
    );
}