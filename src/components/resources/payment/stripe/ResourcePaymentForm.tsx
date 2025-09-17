/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useStripeResourcePaymentMutation } from "@/redux/api/paymentsApi";
import getUserInfo from "@/utils/getUserInfo";
import { LuDownload } from "react-icons/lu";
import { useGetResourceByIdQuery } from "@/redux/api/resourceApi";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useConfirmApplyCouponMutation } from "@/redux/api/couponApi";

export default function ResourcePaymentForm() {
  const amount = useSelector((state: RootState) => state.amount.amount);
  const couponCode = useSelector((state: RootState) => state.coupon.coupon);
  console.log(couponCode, "coupon from slice");
  console.log(amount, "amount from slice");

  const [confirmApplyCoupon] = useConfirmApplyCouponMutation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const [resourcePayment] = useStripeResourcePaymentMutation();

  // Fetch resource data
  const { data: resourceData, isLoading: isResourceLoading } =
    useGetResourceByIdQuery(id as string);
  const myProfile = getUserInfo();

  // Wrap handleDownload in useCallback to memoize it
  const handleDownload = useCallback(async () => {
    if (!resourceData?.data?.file) {
      toast.error("No file available for download");
      return;
    }

    setIsDownloading(true);
    try {
      // Fetch the file with no-cache headers to ensure fresh download
      const response = await fetch(resourceData.data.file, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const url = new URL(resourceData.data.file);
      const pathname = url.pathname;
      const filename =
        pathname.split("/").pop() ||
        `resource-${resourceData.data.title.replace(
          /[^a-z0-9]/gi,
          "_"
        )}.${resourceData.data.type.toLowerCase()}`;

      // Create download link
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      }, 100);

      toast.success("Download completed");
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback: open in new tab if download fails
      window.open(resourceData.data.file, "_blank");
    } finally {
      setIsDownloading(false);
    }
  }, [resourceData?.data]);

  // Trigger download automatically after payment success
  useEffect(() => {
    if (paymentSuccess && resourceData?.data?.file) {
      handleDownload();
    }
  }, [paymentSuccess, handleDownload, resourceData?.data?.file]);

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
        resourceId: id,
        amount: amount,
        paymentMethodId: paymentMethod.id,
      };

      const response = await resourcePayment(payload);
      console.log(response, "response");

      if ("data" in response) {
        if (couponCode && couponCode !== "test") {
          const confirmResponse = await confirmApplyCoupon({
            code: couponCode,
            userId: myProfile?.id as string,
            amount: amount,
            orderId: response?.data?.data?.payment.transactionId,
          });

          console.log(confirmResponse);
        }
        toast.success("Resource purchased successfully");
        setPaymentSuccess(true);
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

  if (isResourceLoading) {
    return (
      <div className="w-full md:container mx-auto p-6 text-center">
        <p>Loading resource details...</p>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="w-full md:container mx-auto p-6 text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Payment Successful!
          </h2>
          <p className="text-gray-700 mb-2">
            You&lsquo;ve purchased: <strong>{resourceData?.data?.title}</strong>
          </p>
          <p className="text-gray-700 mb-6">
            File type: {resourceData?.data?.type} (
            {resourceData?.data?.fileSize})
          </p>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="cursor-pointer flex items-center justify-center gap-2 w-full max-w-xs mx-auto bg-text-secondary text-white py-3 px-6 rounded-full hover:bg-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LuDownload size={20} />
            {isDownloading ? "Downloading..." : "Download Again"}
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <button
            onClick={() => router.push("/")}
            className="cursor-pointer block mt-2 text-text-secondary hover:text-primary underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full md:container mx-auto p-4">
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
        disabled={!stripe || isProcessing || isResourceLoading}
        className="cursor-pointer w-full bg-text-secondary text-white py-4 px-4 rounded-full hover:bg-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? "Processing..." : `Pay €${amount}`}
      </button>
    </form>
  );
}
