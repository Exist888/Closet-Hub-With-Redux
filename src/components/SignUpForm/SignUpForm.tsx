import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { AuthErrorCodes } from "firebase/auth";
import type { AuthError } from "firebase/auth";
import { FormInput } from "../FormInput/FormInput";
import { Button, BUTTON_CLASSES } from "../Button/Button";
import { ButtonSeparator } from "../ButtonSeparator/ButtonSeparator";
import { Notification } from "../Notification/Notification";
import { Spinner } from "../Spinner/Spinner";
import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth,
    signInWithGooglePopup 
} from "../../services/firebase/firebase";
import "./SignUpForm.scss";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

export function SignUpForm() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { displayName, email, password, confirmPassword } = formFields;

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setErrorMsg(null);
        // Destructure input name and value when input changes
        const { name, value } = event.target;
        // Update state to new value where input changes while keeping remaining fields
        setFormFields({ ...formFields, [name]: value });
    }

    function resetFormFields() {
        setFormFields(defaultFormFields);
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        
        if (password !== confirmPassword) {
            setIsLoading(false);
            setErrorMsg("Passwords don't match. Please try again.");
            return;
        }

        try {
            const response = await createAuthUserWithEmailAndPassword(email, password);
            if (!response) return;
            await createUserDocumentFromAuth(response.user, { displayName });
            resetFormFields();
        } catch (error) {
            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                setErrorMsg("Cannot create account. Email already in use.")
            } else {
                setErrorMsg("Error creating account. Please try again or continue with Google instead.")
            }
        } finally {
            // Move setIsLoading(false) into finally block to ensure it runs even on an early return
            setIsLoading(false);
        }
    }

    async function signInWithGoogle() {
        await signInWithGooglePopup();
    }

    return (
        <section className="sign-up-form-section">
            {isLoading && (
                <Spinner>Signing Up</Spinner>
            )}
            {errorMsg && (
                <Notification notificationClass="errorMsg">{errorMsg}</Notification>
            )}
            <h1>New to Closet Hub?</h1>
            <p>
                <i aria-hidden="true" className="fa-solid fa-user-plus"></i>
                <span><span className="bold">Sign up</span> with your name, email, and password</span>
            </p>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Name"
                    id="name" 
                    type="text" 
                    onChange={handleChange}
                    name="displayName" 
                    value={displayName}
                    minLength={3}
                    maxLength={75}
                    autoComplete="new-name"
                />

                <FormInput
                    label="Email"
                    id="email" 
                    type="email" 
                    onChange={handleChange}
                    name="email" 
                    value={email}
                    minLength={5}
                    maxLength={75}
                    autoComplete="new-email"
                />

                <FormInput
                    label="Password"
                    id="password" 
                    type="password" 
                    onChange={handleChange}
                    name="password" 
                    value={password}
                    minLength={8}
                    maxLength={35}
                    autoComplete="new-password"
                />

                <FormInput
                    label="Confirm Password"
                    id="confirm-password" 
                    type="password" 
                    required 
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword} 
                    minLength={8}
                    maxLength={35}
                    autoComplete="new-confirm-password"
                />

                <Button buttonClass={BUTTON_CLASSES.signUp} type="submit">Sign Up</Button>
            </form>
            <ButtonSeparator />
            <Button buttonClass={BUTTON_CLASSES.googleContinue} onClick={signInWithGoogle}>
                <i className="fa-brands fa-google"></i>
                Continue With Google
            </Button>
        </section>
    );
}