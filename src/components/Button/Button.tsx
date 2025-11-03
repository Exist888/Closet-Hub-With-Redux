import type { JSX, ReactNode, ButtonHTMLAttributes } from "react"; // For TS
import "./Button.scss";

export enum BUTTON_CLASSES {
    signIn= "sign-in",
    signUp= "sign-up",
    googleSignIn= "google-sign-in",
    googleContinue= "google-continue",
    product= "product",
    checkout= "checkout"
}

// Use intersection ("&") to combine built-in button attributes with custom props
// Built-in attributes allow support for standard props like onClick, type, aria-label, etc
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    // children is of type ReactNode, which represents any value that React can render
    children: ReactNode
    buttonClass?: BUTTON_CLASSES
    isLoading?: boolean
}

export function Button({ 
    children, 
    buttonClass = BUTTON_CLASSES.signIn,
    isLoading, 
    ...otherProps
}: ButtonProps): JSX.Element {
    // For TS: use the enum value directly—no need for a dynamic key lookup
    // `buttonClass` already contains the correct CSS class string
    // `children` renders button text or elements; `otherProps` passes native button props
    const mappedClass = buttonClass;
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