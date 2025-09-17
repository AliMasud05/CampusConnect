import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { loadStripe } from "@stripe/stripe-js";

export default function StripePaymentForm() {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
      "pk_live_51RfBmtKIZuSQ9lSpacGJYGAaUZKPRI5F6Jiq0rOrPXtU9NmvbdC498mu4hKjMbNHNJwTH4ftUezOiQysEKrCoBHc00aPpxegD0"
  );
  return (
    <div>
    <Elements
        options={{
          mode: "payment", // Consider "setup" if you want to save payment method
          amount: 1099,
          currency: "usd",
          paymentMethodCreation: "manual",
          paymentMethodTypes: ["card"],
          appearance: {
            theme: 'stripe',
          },
        }}
        stripe={stripePromise}
      >
        <PaymentForm />
      </Elements>
    </div>
  );
}
