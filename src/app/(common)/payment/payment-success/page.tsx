/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useConfirmApplyCouponMutation } from "@/redux/api/couponApi";
import { useCompletePaypalPaymentMutation } from "@/redux/api/paymentsApi";
import { resetPaymentState } from "@/redux/features/paymentSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import getUserInfo from "@/utils/getUserInfo";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from 'sonner';

export default function PayPalSuccessPage() {


  const myProfile = getUserInfo();


      const amountString = localStorage.getItem("amount") || "0";
      const amount = parseFloat(amountString);
      const couponCode = localStorage.getItem("couponCode")||"";

      console.log(couponCode, "coupon from localStorage");
      console.log(amount, "amount from localStorage");
    // const amount = useSelector((state: RootState) => state.amount.amount);
    //   const couponCode = useSelector((state: RootState) => state.coupon.coupon);
  
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const getPaymentState = useAppSelector((state) => state.payment);
    const {    
      courseId,  
      paypalOrderId,
    } = getPaymentState;



  const [completePayment] = useCompletePaypalPaymentMutation();
    const dispatch = useAppDispatch();
      const [confirmApplyCoupon] = useConfirmApplyCouponMutation();

      const myprofile = getUserInfo();
    


  const [status, setStatus] = useState<"processing" | "success" | "error">(
    "processing"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    const handleSuccess = async () => {
      // Prevent multiple executions
      if (processed) return;

      // const paypalOrderId = searchParams.get("token");
      // const paypalPaymentId = searchParams.get("PayerID");

      // Try to get courseId from multiple sources
      // let courseId = localStorage.getItem("courseId");

      // If not in localStorage, try to get from URL params (if this is a nested route)
      // if (!courseId && params?.id) {
      //   courseId = params.id as string;
      // }

      // If still not found, try to get from search params
      // if (!courseId) {
      //   courseId = searchParams.get("courseId");
      // }

      console.log("PayPal return data:", {
        paypalOrderId,
    
        courseId,
        urlParams: params,
        searchParamsObj: Object.fromEntries(searchParams.entries()),
      });

      // Check if we have required parameters
      if (!paypalOrderId) {
        setStatus("error");
        setErrorMessage(
          "Missing PayPal order ID. Please try the payment again."
        );
        setProcessed(true);
        return;
      }

      if (!courseId) {
        setStatus("error");
        setErrorMessage(
          "Course information not found. Please try the payment again."
        );
        setProcessed(true);
        return;
      }


      setProcessed(true);

      try {
        console.log("Completing PayPal payment...");
        // uljljl

        const result = await completePayment({
          paypalOrderId: paypalOrderId,
          
          
        }).unwrap();

        console.log("Payment completion result:", result);

        

          
          if (couponCode && couponCode !== "test") {
            const confirmResponse = await confirmApplyCoupon({
              code: couponCode,
              userId: myProfile?.id as string,
              amount: amount,
              orderId: paypalOrderId,
            });
            console.log(confirmResponse);
          }



          if (result.success) {
            toast.success("PayPal payment confirmed successfully!");
            dispatch(resetPaymentState());
            router.push("/user-dashboard");
          } else {
            toast.error("Failed to confirm PayPal payment.");
          }

        setStatus("success");


        // Clean up localStorage
        localStorage.removeItem("courseId");
        localStorage.removeItem("paypalOrderId");

        // Redirect dashboard after showing success message
        setTimeout(() => {
          router.push(`/user-dashboard?payment=success`);
        }, 2000);
      } catch (error: any) {
        console.error("Payment completion failed:", error);

        setStatus("error");

        // Extract error message
        let errorMsg = "Payment completion failed. Please contact support.";

        if (error?.data?.message) {
          errorMsg = error.data.message;
        } else if (error?.error?.data?.message) {
          errorMsg = error.error.data.message;
        } else if (error?.message) {
          errorMsg = error.message;
        }

        setErrorMessage(errorMsg);

        // Redirect to course page with error after 5 seconds
        setTimeout(() => {
          if (courseId) {
            router.push(`/courses/${courseId}?error=payment_failed`);
          } else {
            router.push("/courses"); // Fallback to courses list
          }
        }, 5000);
      }
    };

    handleSuccess();
  }, [searchParams, params, completePayment, router, processed,
     paypalOrderId,courseId,dispatch,myprofile,amount,couponCode,confirmApplyCoupon,myProfile]);

  // Show processing state
  if (status === "processing") {
    return (
      <div className="container mx-auto px-4 py-8 text-center mt-40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold mb-4">Processing Payment...</h1>
        <p className="text-gray-600">
          Please wait while we complete your enrollment.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          This may take a few moments.
        </p>
      </div>
    );
  }

  // Show success state
  if (status === "success") {
    return (
      <div className="container mx-auto px-4 py-8 text-center mt-40">
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg max-w-md mx-auto">
          <div className="text-4xl mb-4">✅</div>
          <h1 className="text-2xl font-bold mb-4 text-green-800">
            Payment Successful!
          </h1>
          <p className="text-green-700 mb-4">
            Your payment has been processed successfully and you are now
            enrolled in the course.
          </p>
          <p className="text-sm text-green-600">
            Redirecting you to the dashboard page...
          </p>
        </div>
      </div>
    );
  }

  // Show error state
  if (status === "error") {
    const courseId = localStorage.getItem("courseId") || params?.id;

    return (
      <div className="container mx-auto px-4 py-8 text-center mt-40">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md mx-auto">
          <div className="text-4xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-4 text-red-800">
            Payment Error
          </h1>
          <p className="text-red-700 mb-4">{errorMessage}</p>
          <div className="space-y-2">
            {courseId && (
              <button
                onClick={() => router.push(`/courses/${courseId}`)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mr-2"
              >
                Go Back to Course
              </button>
            )}
            <button
              onClick={() => router.push("/courses")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Browse Courses
            </button>
          </div>
          <p className="text-sm text-red-600 mt-4">
            If the problem persists, please contact our support team.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
