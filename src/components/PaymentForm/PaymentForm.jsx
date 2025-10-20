import { useSelector } from "react-redux";
import { selectCartTotalPrice } from "../../store/cart/cartSelector.js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { PaymentElement } from "@stripe/react-stripe-js/checkout";
import { Button } from "../Button/Button.jsx";
import logo from "../../assets/logo.png";
import "./PaymentForm.scss";

export function PaymentForm({ setOpenPaymentForm }) {
    const cartTotalPrice = useSelector(selectCartTotalPrice).toFixed(2);
    const stripe = useStripe();
    const elements = useElements();

    async function handleSubmit(event) {
        event.preventDefault();
        
        if (!stripe || !elements) return;

        try {
            // Fetch raw json response from netlify function
            const response = await fetch("/.netlify/functions/create-payment-intent", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: 10000 })
            });

            if (!response.ok) throw new Error("Failed to fetch");

            // Convert the raw response to JavaScript objects
            const data = await response.json();

            const clientSecret = data.paymentIntent.client_secret;

            // console.log("CLIENT SECRET", clientSecret);

            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: "Thom Yorke"
                    }
                }
            });

            if (paymentResult.error) {
                alert(paymentResult.error.message);
            } else if (paymentResult.paymentIntent.status === "succeeded") {
                alert("Payment Successful");
                setOpenPaymentForm(false);
            }
        } catch (error) {
            alert("Error processing your payment.");
        }
    }

    return (
        <div className="checkout-modal-overlay">
            <article className="checkout-container">
                <div className="logo-and-close-btn-container">
                    <img className="logo" src={logo} alt="Closet Hub Logo" />
                    <button className="close-btn" onClick={() => setOpenPaymentForm(false)}>
                        <i className="fa-solid fa-xmark" aria-label="close"></i>
                    </button>
                </div>
                <div className="payment-summary-container">
                    <p><small>Pay Closet Hub</small> {cartTotalPrice} USD</p>
                    <hr/>
                </div>
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <CardElement className="checkout-card"/>
                    <Button className="checkout">
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
    );
}