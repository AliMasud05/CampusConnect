/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useConfirmSubscribeMutation } from "@/redux/api/subscribeApi";
import { toast } from "sonner";

const ConfirmSubscription = () => {
  const [message, setMessage] = useState("Confirming your subscription...");
  const [isLoading, setIsLoading] = useState(true);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const searchParams = useSearchParams();
  const [confirmSubscribe] = useConfirmSubscribeMutation();

  const confirmSubscription = useCallback(async () => {
    // Prevent multiple executions
    if (hasConfirmed) return;

    const token = searchParams.get("token");

    if (!token) {
      setMessage("Invalid confirmation link. Please try subscribing again.");
      toast.error("Invalid confirmation link.");
      setIsLoading(false);
      return;
    }

    try {
      setHasConfirmed(true);
      await confirmSubscribe({ token }).unwrap();
      setMessage(
        "Subscription confirmed successfully! Thank you for joining HK Academy."
      );
      toast.success("Subscription confirmed successfully!");
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        "Failed to confirm subscription. Please try again.";
      setMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams, confirmSubscribe, hasConfirmed]);

  useEffect(() => {
    confirmSubscription();
  }, [confirmSubscription]);

  return (
    <div className="w-full bg-secondary min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-8 text-center space-y-6">
          <h2 className="font-semibold text-gray-900 text-2xl">
            {isLoading ? "Please wait..." : message}
          </h2>
          {!isLoading && (
            <div className="space-y-4">
              <Link
                href="/"
                className="inline-block bg-text-secondary hover:bg-primary/80 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Return to Home
              </Link>
              <p className="text-gray-600 text-base">
                If you have any questions, contact us at{" "}
                <a
                  href="mailto:contact@hk-academy.com"
                  className="text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  contact@hk-academy.com
                </a>
              </p>
              <p className="text-gray-600 text-base">
                <a
                  href="https://hk-academy.com"
                  className="text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  https://hk-academy.com
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmSubscription;
