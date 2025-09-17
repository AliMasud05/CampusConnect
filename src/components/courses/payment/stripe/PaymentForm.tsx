/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useStripePaymentMutation } from "@/redux/api/paymentsApi";
// import { useGetCourseByIdQuery } from "@/redux/api/courseApi";
import getUserInfo from "@/utils/getUserInfo";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useConfirmApplyCouponMutation } from "@/redux/api/couponApi";

export default function PaymentForm() {

 
    const amount = useSelector((state: RootState) => state.amount.amount);
    const couponCode = useSelector((state: RootState) => state.coupon.coupon);
    console.log(couponCode, "coupon from slice");
     console.log(amount,"amount from slice")
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const myProfile = getUserInfo();
  console.log(myProfile, "myProfile from slice");

  const [coursePayment] = useStripePaymentMutation();
  const [confirmApplyCoupon] = useConfirmApplyCouponMutation();

  // const { data } = useGetCourseByIdQuery(id);
  // const course = data?.data;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setPaymentError("Stripe has not loaded yet. Please try again.");
      return;
    }

    setIsProcessing(true);
    setPaymentError("");

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setPaymentError(submitError.message || "Payment validation failed.");
        return;
      }

      const { paymentMethod, error: stripeError } =
        await stripe.createPaymentMethod({
          elements,
          params: {
            billing_details: {
              name: myProfile?.name || "Customer",
              email: myProfile?.email,
              address: {
                country: "US",
              },
            },
          },
        });

      if (stripeError) {
        setPaymentError(
          stripeError.message || "Payment method creation failed."
        );
        return;
      }

      if (!paymentMethod?.id) {
        setPaymentError("Failed to create payment method.");
        return;
      }

      const payload = {
        userId: myProfile?.id,
        courseId: id,
        paymentMethodId: paymentMethod.id,
        amount: amount,
      };

      const response = await coursePayment(payload);

      console.log(response,"response from payment");

      if ("data" in response) {
         if (couponCode && couponCode !== "test") {
           const confirmResponse = await confirmApplyCoupon({
             code: couponCode,
             userId: myProfile?.id as string,
             amount: amount,
             orderId: response?.data?.data.paymentMethodId,
           });
           console.log(confirmResponse);
         }
        

        toast.success("Course purchased successfully");

        try {
          // await sendWelcomeEmail({ courseName: course?.title });
          toast.success("Welcome email sent!");
        } catch (emailError: any) {
          toast.warning("Payment succeeded, but email could not be sent.");
          console.error("Welcome email error:", emailError);
        }

        // Ensure redirection happens after all operations
        router.push("/user-dashboard");
        return; // Exit the function after successful redirection
      } else if ("error" in response) {
        throw response.error;
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      setPaymentError(
        error?.data?.message || error?.message || "Payment processing failed"
      );
      toast.error(error?.data?.message || error?.message || "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:container mx-auto">
      <div className="mb-6">
        <PaymentElement
          options={{
            layout: "tabs",
            fields: {
              billingDetails: {
                address: {
                  country: "never",
                },
              },
            },
          }}
        />
      </div>

      {paymentError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{paymentError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="cursor-pointer w-full bg-text-secondary text-white py-4 px-4 rounded-full hover:bg-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? "Processing..." : "Confirm Payment"}
      </button>
    </form>
  );
}
