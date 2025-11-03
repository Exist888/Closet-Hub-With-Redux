import { SignInForm } from "../../components/SignInForm/SignInForm";
import { SignUpForm } from "../../components/SignUpForm/SignUpForm";
import "./AuthPage.scss";

export function AuthPage() {
    return (
        <section className="auth-section elements-container">
            <SignInForm />
            <SignUpForm />
        </section>
    );
}