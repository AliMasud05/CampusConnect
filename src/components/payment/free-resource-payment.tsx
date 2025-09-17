/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useFreeResurcePaymentMutation } from "@/redux/api/paymentsApi";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useConfirmApplyCouponMutation } from "@/redux/api/couponApi";
import getUserInfo from "@/utils/getUserInfo";
import { LuDownload } from "react-icons/lu";
import { useGetResourceByIdQuery } from "@/redux/api/resourceApi";

const FreeResourcePayment = () => {
  const couponCode = useSelector((state: RootState) => state.coupon.coupon);
  const myProfile = getUserInfo();
  const [confirmApplyCoupon] = useConfirmApplyCouponMutation();
  const [freeResurcePayment] = useFreeResurcePaymentMutation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  // Fetch resource data
  const { data: resourceData, isLoading: isResourceLoading } =
    useGetResourceByIdQuery(id as string);

  const handleDownload = async () => {
    if (!resourceData?.data?.file) {
      toast.error("No file available for download");
      return;
    }

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
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);

    try {
      const response = await freeResurcePayment({
        resourceId: id,
      });

      if ("data" in response) {
        if (couponCode && couponCode !== "test") {
          const confirmResponse = await confirmApplyCoupon({
            code: couponCode,
            userId: myProfile?.id as string,
            amount: 0,
            orderId: "FREE",
          });
          console.log(confirmResponse);
        }

        toast.success("Resource enrolled successfully");
        setPaymentSuccess(true);
      } else if ("error" in response) {
        const errorData = response.error as {
          status: number;
          data?: {
            message?: string;
          };
        };
        const errorMessage = errorData.data?.message || "Enrollment failed";
        toast.error(errorMessage);
      }
    } catch (error: any) {
      console.error("Enrollment error:", error);
      toast.error(error.message || "An unexpected error occurred");
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
            Enrollment Successful!
          </h2>
          <p className="text-gray-700 mb-2">
            You&apos;ve enrolled in:{" "}
            <strong>{resourceData?.data?.title}</strong>
          </p>
          <p className="text-gray-700 mb-6">
            File type: {resourceData?.data?.type} (
            {resourceData?.data?.fileSize})
          </p>

          <button
            onClick={handleDownload}
            className="cursor-pointer flex items-center justify-center gap-2 w-full max-w-xs mx-auto bg-text-secondary text-white py-3 px-6 rounded-full hover:bg-primary transition"
          >
            <LuDownload size={20} />
            Download Now
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <button
            onClick={() => router.push("/user-dashboard")}
            className="cursor-pointer block mt-2 text-text-secondary hover:text-primary underline"
          >
            Go to Dashboard
          </button>
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
    <div className="relative h-full min-h-[200px]">
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <button
          type="submit"
          disabled={isProcessing || isResourceLoading}
          onClick={handleSubmit}
          className="w-[200px] bg-text-secondary text-white py-4 px-4 rounded-full hover:bg-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? "Processing..." : "Enroll Now"}
        </button>
      </div>
    </div>
  );
};

export default FreeResourcePayment;
