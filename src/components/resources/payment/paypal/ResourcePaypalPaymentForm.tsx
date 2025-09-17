/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCreateResourcePaypalPaymentMutation } from "@/redux/api/paymentsApi";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";



export default function ResourcePaypalPaymentForm() {
  const params = useParams();
  const resourceId = params?.id as string;
   const amount = useSelector((state: RootState) => state.amount.amount);
   console.log(amount, "amount from slice");
   const couponCode = useSelector((state: RootState) => state.coupon.coupon);
  const amountString = amount.toString();

   localStorage.setItem("amount", amountString);
   localStorage.setItem("couponCode", couponCode);

  const [createPaypalPayment, { isLoading }] =
    useCreateResourcePaypalPaymentMutation();
  const [error, setError] = useState<string | null>(null);

  const getErrorMessage = (err: any): string => {
    if (err?.error?.data?.message) {
      return err.error.data.message;
    } else if (err?.response?.data?.message) {
      return err.response.data.message;
    } else if (err?.data?.message) {
      return err.data.message;
    } else if (err?.message) {
      return err.message;
    } else {
      return "Something went wrong. Please try again.";
    }
  };

  const handlePaypalPayment = async () => {
    try {
      setError(null);

      // IMPORTANT: Store resourceId in localStorage BEFORE making the payment
      localStorage.setItem("resourceId", resourceId);
      console.log("Stored resourceId in localStorage:", resourceId);

      const payload = {
        resourceId,
        amount,
     
      };

      const res = await createPaypalPayment(payload).unwrap();

      console.log("Resource PayPal payment response:", res);

      // Look for approval link in different possible locations
      const paypalOrder = res?.data?.paypalOrder;
      let approvalLink = null;

      // PayPal typically returns links array with different rel types
      if (paypalOrder?.links) {
        approvalLink = paypalOrder.links.find(
          (link: any) => link.rel === "approve" || link.rel === "payer-action"
        )?.href;
      }

      // Alternative: direct approvalLink property
      if (!approvalLink && paypalOrder?.approvalLink) {
        approvalLink = paypalOrder.approvalLink;
      }

      if (approvalLink) {
        // Store order ID for later reference
        localStorage.setItem(
          "paypalOrderId",
          paypalOrder.id || paypalOrder.orderId || ""
        );

        // Redirect to PayPal checkout
        window.location.href = approvalLink;
      } else {
        setError("Unable to redirect to PayPal. Please try again.");
        console.error("PayPal order response:", paypalOrder);
      }
    } catch (err: any) {
      console.error("Resource PayPal payment error:", err);

      // Clear localStorage on error
      localStorage.removeItem("resourceId");
      localStorage.removeItem("paypalOrderId");

      setError(getErrorMessage(err));
    }
  };

  return (
    <div className="md:pt-20 lg:pt-32">
      <button
        onClick={handlePaypalPayment}
        disabled={isLoading}
        className="cursor-pointer w-full bg-text-secondary text-white py-4 px-4 rounded-full hover:bg-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Processing..." : "Proceed with PayPal"}
      </button>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
