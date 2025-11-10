import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { Button, BUTTON_CLASSES } from "./Button";

describe("Button tests", () => {
    describe("ensure button exists", () => {
        test("exists", () => {
            render(<Button />);
            const btnElement = screen.getByRole("button");
            expect(btnElement).toBeInTheDocument();
        });
    });

    describe("ensure css classes are triggered by buttonClass prop", () => {
        test("renders default button style when no buttonClass is passed in", () => {
            render(<Button />);
            const defaultBtn = screen.getByRole("button");
            // When using Vitest with scss, test styles by checking for class rather than style directly
            expect(defaultBtn).toHaveClass("sign-in");
        });

        test("renders sign-in button style when coinciding class is passed in", () => {
            render(<Button buttonClass={BUTTON_CLASSES.signIn} />);
            const signInBtn = screen.getByRole("button");
            expect(signInBtn).toHaveClass("sign-in");
        });

        test("renders sign-up button style when coinciding class is passed in", () => {
            render(<Button buttonClass={BUTTON_CLASSES.signUp} />);
            const signUpBtn = screen.getByRole("button");
            expect(signUpBtn).toHaveClass("sign-up");
        });

        test("renders google-sign-in button style when coinciding class is passed in", () => {
            render(<Button buttonClass={BUTTON_CLASSES.googleSignIn} />);
            const googleSignInBtn = screen.getByRole("button");
            expect(googleSignInBtn).toHaveClass("google-sign-in");
        });

        test("renders google-continue button style when coinciding class is passed in", () => {
            render(<Button buttonClass={BUTTON_CLASSES.googleContinue} />);
            const googleContinueBtn = screen.getByRole("button");
            expect(googleContinueBtn).toHaveClass("google-continue");
        });

        test("renders product button style when coinciding class is passed in", () => {
            render(<Button buttonClass={BUTTON_CLASSES.product} />);
            const productBtn = screen.getByRole("button");
            expect(productBtn).toHaveClass("product");
        });

        test("renders checkout button style when coinciding class is passed in", () => {
            render(<Button buttonClass={BUTTON_CLASSES.checkout} />);
            const checkoutBtn = screen.getByRole("button");
            expect(checkoutBtn).toHaveClass("checkout");
        });
    });

    describe("ensure button is not not clickable during loading state", () => {
        test("loading state makes button un-clickable", () => {
            render(<Button isLoading={true} />);
            const btnWhileLoading = screen.getByRole("button");
            expect(btnWhileLoading).toBeDisabled();
        });
    })
});