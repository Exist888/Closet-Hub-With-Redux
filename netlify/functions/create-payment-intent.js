import dotenv from "dotenv";
import Stripe from "stripe";

// Load environment variables from .env into process.env
dotenv.config();

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST);

export async function handler(event) {
    try {
        // Parse the JSON body sent from the client (expects an object with "amount" key)
        const { amount } = JSON.parse(event.body);

        // Create a payment intent using Stripe's API
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"]
        });

        // Return a success response to the client
        return {
            statusCode: 200,
            body: JSON.stringify({ paymentIntent })
        }

    } catch (error) {
        console.log("Error creating payment intent: ", error);

        // Return an error response with a clean error message
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message })
        }
    }
}