// ========================= UPDATED PAYPAL PAYMENT FORM =========================
// Make sure to store courseId in localStorage when initiating payment

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import { useGetCourseByIdQuery } from "@/redux/api/courseApi";
import { useCreatePaypalPaymentMutation } from "@/redux/api/paymentsApi";
import { setPaymentState } from "@/redux/features/paymentSlice";
import { useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function PaypalPaymentForm() {
  const params = useParams();
  const courseId = params?.id as string;
  const dispatch = useAppDispatch();
  // const { data } = useGetCourseByIdQuery(courseId);
  // const course = data?.data;

  const amount = useSelector((state: RootState) => state.amount.amount);
       console.log(amount,"amount from slice")         
  const couponCode = useSelector( (state: RootState) => state.coupon.coupon );

  console.log(amount,couponCode,"amount and coupon from slice in paypal page" )
  const [createPaypalPayment, { isLoading }] = useCreatePaypalPaymentMutation();
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const handlePaypalPayment = async () => {
    try {
      setError(null);
      const amountString = amount.toString();

      // IMPORTANT: Store courseId in localStorage BEFORE making the payment
      localStorage.setItem("courseId", courseId);
      localStorage.setItem("amount", amountString);
      localStorage.setItem("couponCode", couponCode);
      console.log("Stored courseId in localStorage:", courseId);

      const formData ={
        courseId: courseId,
        paypalOrderId: orderId

      }
      //dispatch the payment to redux store
      dispatch(setPaymentState(formData));

      const res = await createPaypalPayment({
        courseId,
        amount: amount,
      });

      console.log("PayPal payment response:", res);

      const approvalLink = res?.data?.data?.paypalOrder?.approvalLink;

      if (approvalLink) {

        setOrderId(res?.data?.data?.paypalOrder?.id || "");
        // Store additional info for success page
        localStorage.setItem(
          "paypalOrderId",
          res?.data?.data?.paypalOrder?.orderId || ""
        );

        // Update Redux store with the orderId
        dispatch(
          setPaymentState({
            paypalOrderId: res?.data?.data?.paypalOrder?.orderId,
          })
        );

        // Redirect to PayPal checkout
        window.location.href = approvalLink;
      } else {
        // Handle error cases
        if (res?.data?.message) {
          setError(res.data.message);
        } else if (
          res?.error &&
          typeof res.error === "object" &&
          "data" in res.error
        ) {
          setError(
            (res.error as any).data?.message || "Payment initialization failed"
          );
        } else {
          setError("Unable to initialize PayPal payment. Please try again.");
        }
      }
    } catch (err: any) {
      console.error("PayPal payment error:", err);

      // Clear localStorage on error
      localStorage.removeItem("courseId");
      localStorage.removeItem("paypalOrderId");

      // Handle different error response structures
      if (err?.error?.data?.message) {
        setError(err.error.data.message);
      } else if (err?.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err?.data?.message) {
        setError(err.data.message);
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
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
        <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
      )}
    </div>
  );
}
