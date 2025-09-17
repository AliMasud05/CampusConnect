/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { LuDownload } from "react-icons/lu";
import { useCompleteResourcePaypalPaymentMutation } from "@/redux/api/paymentsApi";
import { useGetResourceByIdQuery } from "@/redux/api/resourceApi";
import { useConfirmApplyCouponMutation } from "@/redux/api/couponApi";
import getUserInfo from "@/utils/getUserInfo";

export default function ResourcePayPalSuccessPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const [completePayment, { isLoading: isCompletingPayment }] =
    useCompleteResourcePaypalPaymentMutation();

      const myProfile = getUserInfo();

      const amountString = localStorage.getItem("amount") || "0";
      const amount = parseFloat(amountString);
      const couponCode = localStorage.getItem("couponCode") || "";
      const [confirmApplyCoupon] = useConfirmApplyCouponMutation();

  const [status, setStatus] = useState<"processing" | "success" | "error">(
    "processing"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resourceId, setResourceId] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState(false);

  // Use ref to prevent multiple API calls
  const hasProcessedPayment = useRef(false);
  const isProcessing = useRef(false);

  // Move the hook to component level and conditionally skip
  const { data: resourceData, isLoading: isResourceLoading } =
    useGetResourceByIdQuery(resourceId, {
      skip: !resourceId, // Skip query if no resourceId
    });

  // Handle file download
  const handleDownload = async () => {
    if (!resourceData?.data?.file) {
      toast.error("No file available for download");
      return;
    }

    if (isDownloading) return; // Prevent multiple downloads

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

      toast.success("Download started");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download file. Please try again.");

      // Fallback: open in new tab if download fails
      window.open(resourceData.data.file, "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  // Memoize the success handler to prevent unnecessary re-creates
  const handleSuccess = useCallback(async () => {
    // Prevent multiple executions
    if (hasProcessedPayment.current || isProcessing.current) {
      return;
    }

    isProcessing.current = true;

    const paypalOrderId = searchParams.get("token");
    const paypalPaymentId = searchParams.get("PayerID");

    // Try to get resourceId from multiple sources
    let currentResourceId = localStorage.getItem("resourceId");

    if (!currentResourceId && params?.id) {
      currentResourceId = params.id as string;
    }

    if (!currentResourceId) {
      currentResourceId = searchParams.get("resourceId");
    }

    // Set resourceId for the query hook
    if (currentResourceId) {
      setResourceId(currentResourceId);
    }

    console.log("Resource PayPal return data:", {
      paypalOrderId,
      paypalPaymentId,
      resourceId: currentResourceId,
    });

    if (!paypalOrderId) {
      setStatus("error");
      setErrorMessage("Missing PayPal order ID. Please try the payment again.");
      hasProcessedPayment.current = true;
      isProcessing.current = false;
      return;
    }

    if (!currentResourceId) {
      setStatus("error");
      setErrorMessage(
        "Resource information not found. Please try the payment again."
      );
      hasProcessedPayment.current = true;
      isProcessing.current = false;
      return;
    }

    try {
      console.log("Completing resource PayPal payment...");

      const result = await completePayment({
        paypalOrderId,
        paypalPaymentId,
      }).unwrap();

      if (couponCode && couponCode !== "test") {
        const confirmResponse = await confirmApplyCoupon({
          code: couponCode,
          userId: myProfile?.id as string,
          amount: amount,
          orderId: paypalOrderId,
        });
        console.log(confirmResponse);
      }

      console.log("Resource payment completion result:", result);

      setStatus("success");
      hasProcessedPayment.current = true;

      // Clean up localStorage
      localStorage.removeItem("resourceId");
      localStorage.removeItem("paypalOrderId");

      toast.success("Payment completed successfully!");
    } catch (error: any) {
      console.error("Resource payment completion failed:", error);

      setStatus("error");
      hasProcessedPayment.current = true;

      let errorMsg = "Payment completion failed. Please contact support.";

      if (error?.data?.message) {
        errorMsg = error.data.message;
      } else if (error?.error?.data?.message) {
        errorMsg = error.error.data.message;
      } else if (error?.message) {
        errorMsg = error.message;
      }

      setErrorMessage(errorMsg);

      setTimeout(() => {
        if (currentResourceId) {
          router.push(`/resources/${currentResourceId}?error=payment_failed`);
        } else {
          router.push("/resources");
        }
      }, 5000);
    } finally {
      isProcessing.current = false;
    }
  }, [
    searchParams,
    params?.id,
    completePayment,
    router,
    amount,
    couponCode,
    confirmApplyCoupon,
    myProfile?.id,
  ]);

  useEffect(() => {
    handleSuccess();
  }, [handleSuccess]);

  // Show processing state
  if (status === "processing" || isCompletingPayment) {
    return (
      <div className="container mx-auto px-4 py-8 text-center mt-40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold mb-4">Processing Payment...</h1>
        <p className="text-gray-600">
          Please wait while we complete your resource purchase.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          This may take a few moments.
        </p>
      </div>
    );
  }

  // Show success state with download functionality
  if (status === "success") {
    return (
      <div className="container mx-auto px-4 py-8 text-center mt-40">
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg max-w-md mx-auto">
          <div className="text-4xl mb-4">✅</div>
          <h1 className="text-2xl font-bold mb-4 text-green-800">
            Payment Successful!
          </h1>
          <p className="text-green-700 mb-4">
            Your payment has been processed successfully and you now have access
            to the resource.
          </p>

          {/* Resource details and download section */}
          {isResourceLoading ? (
            <div className="mb-4">
              <div className="animate-pulse">
                <div className="h-4 bg-green-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-green-200 rounded w-1/2 mx-auto"></div>
              </div>
              <p className="text-sm text-green-600 mt-2">
                Loading resource details...
              </p>
            </div>
          ) : resourceData?.data ? (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                {resourceData.data.title}
              </h3>
              <p className="text-sm text-green-600 mb-4">
                File type: {resourceData.data.type}
                {resourceData.data.fileSize &&
                  ` (${resourceData.data.fileSize})`}
              </p>

              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className={`flex items-center justify-center gap-2 w-full max-w-xs mx-auto py-3 px-6 rounded-full transition mb-4 ${
                  isDownloading
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } text-white`}
              >
                {isDownloading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Downloading...
                  </>
                ) : (
                  <>
                    <LuDownload size={20} />
                    Download Resource
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="mb-6">
              <p className="text-sm text-red-600 mb-4">
                Unable to load resource details
              </p>
            </div>
          )}

          <div className="space-y-2">
            <button
              onClick={() => router.push("/resources")}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mr-2"
            >
              Browse More Resources
            </button>
            <button
              onClick={() => router.push("/")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (status === "error") {
    const fallbackResourceId = localStorage.getItem("resourceId") || params?.id;

    return (
      <div className="container mx-auto px-4 py-8 text-center mt-40">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md mx-auto">
          <div className="text-4xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-4 text-red-800">
            Payment Error
          </h1>
          <p className="text-red-700 mb-4">{errorMessage}</p>
          <div className="space-y-2">
            {fallbackResourceId && (
              <button
                onClick={() => router.push(`/resources/${fallbackResourceId}`)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mr-2"
              >
                Go Back to Resource
              </button>
            )}
            <button
              onClick={() => router.push("/resources")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Browse Resources
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
