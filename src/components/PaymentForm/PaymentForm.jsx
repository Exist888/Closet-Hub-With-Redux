import { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { selectCartTotalPrice } from "../../store/cart/cartSelector";
import { selectCurrentUser } from "../../store/user/userSelector";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, BUTTON_CLASSES } from "../Button/Button";
import { Notification } from "../Notification/Notification";
import { Spinner } from "../Spinner/Spinner";
import logo from "../../assets/logo.png";
import "./PaymentForm.scss";

export function PaymentForm({ setOpenPaymentForm }) {
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [spinnerText, setSpinnerText] = useState("Processing Your Payment")
    const cartTotalPrice = useSelector(selectCartTotalPrice);
    const currentUser = useSelector(selectCurrentUser);
    const stripe = useStripe();
    const elements = useElements();
    const paymentViaStripe = cartTotalPrice * 100;

    async function handleSubmit(event) {
        event.preventDefault();
        
        if (!stripe || !elements) return;

        setIsProcessingPayment(true);

        try {
            // Fetch raw json response from netlify function
            const response = await fetch("/.netlify/functions/create-payment-intent", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: paymentViaStripe })
            });

            if (!response.ok) throw new Error("Failed to fetch");

            // Convert the raw response to JavaScript objects
            const data = await response.json();

            const clientSecret = data.paymentIntent.client_secret;

            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: currentUser? currentUser.displayName : "guest"
                    }
                }
            });

            if (paymentResult.error) {
                setErrorMsg(paymentResult.error.message);
                setIsProcessingPayment(false);
            } else if (paymentResult.paymentIntent.status === "succeeded") {
                setSuccessMsg("Payment Successful");
                setSpinnerText("");
                setTimeout(() => {
                    setOpenPaymentForm(false);
                    setIsProcessingPayment(false);
                }, 2000);
            }
        } catch (error) {
            setErrorMsg("Error processing your payment.");
            setIsProcessingPayment(false);
        }
    }

    return (
        <Fragment>
            <div className="checkout-modal-overlay">
                {isProcessingPayment && (
                    <Spinner>{spinnerText}</Spinner>
                )}
                {errorMsg && (
                    <Notification 
                        className="notification" 
                        notificationClass="paymentFailedMsg"
                        >
                        {errorMsg}
                    </Notification>
                )}
                {successMsg && (
                    <Notification 
                        className="notification" 
                        notificationClass="successMsg"
                        >
                        {successMsg}
                    </Notification>
                )}
                <article className="checkout-container">
                    <div className="logo-and-close-btn-container">
                        <img className="logo" src={logo} alt="Closet Hub Logo" />
                        <button className="close-btn" onClick={() => setOpenPaymentForm(false)}>
                            <i className="fa-solid fa-xmark" aria-label="close"></i>
                        </button>
                    </div>
                    <div className="payment-summary-container">
                        <p><small>Pay Closet Hub</small> {cartTotalPrice.toFixed(2)} USD</p>
                        <hr/>
                    </div>
                    <form className="checkout-form" onSubmit={handleSubmit}>
                        <CardElement className="checkout-card" onChange={() => setErrorMsg(null)}/>
                        <Button buttonClass={BUTTON_CLASSES.checkout} isLoading={isProcessingPayment}>
                            <i className="fa-solid fa-credit-card" aria-hidden="true"></i>
                            Submit Payment
                        </Button>
                    </form>
                    <div className="security-statement-container">
                        <small>Powered by</small>
                        <i className="fa-brands fa-stripe" aria-label="Stripe"></i>
                    </div>
                </article>
            </div>
        </Fragment>
    );
}