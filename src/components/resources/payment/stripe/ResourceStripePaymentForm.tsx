import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ResourcePaymentForm from "./ResourcePaymentForm";

export default function ResourceStripePaymentForm() {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
      "pk_test_51MudQ8AQHXnHJC4swCjOBaADCKYIPiCEBvlSdjey1JQ0O90lBHQYwwRp1VY2yUcmsiWQfNra3E270DtBAnWLnBvN00rqIfWbsc"
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
        <ResourcePaymentForm />
      </Elements>
    </div>
  );
}
