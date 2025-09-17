"use client";

import { useState } from "react";
import paypalIcon from "@/assets/payment/paypal.svg"
import stripeIcon from "@/assets/payment/stripe.svg"
import Image from "next/image";
import ResourceStripePaymentForm from "./stripe/ResourceStripePaymentForm";
import ResourcePaypalPaymentForm from "./paypal/ResourcePaypalPaymentForm";

type PaymentMethod = "card" | "paypal";

export default function PaymentInformation() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");

  return (
    <div className="container  lg:w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Payment Information
      </h2>

      {/* Payment Method Tabs */}
      <div className="flex gap-4 mb-8">
        <div
          className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
            selectedMethod === "card"
              ? "border-text-secondary bg-green-50"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
          onClick={() => setSelectedMethod("card")}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-6 flex items-center justify-center">
              <Image src={stripeIcon} alt="stripe icon" height={24} width={24} />
            </div>
            <span className="text-sm font-medium text-gray-700">Card</span>
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === "card"
                  ? "border-text-secondary"
                  : "border-gray-300"
              }`}
            >
              {selectedMethod === "card" && (
                <div className="w-2 h-2 rounded-full bg-white flex items-center justify-center"><div className="bg-text-secondary h-2 w-2 rounded-full"></div></div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
            selectedMethod === "paypal"
              ? "border-text-secondary"
              : "border-gray-200"
          }`}
          onClick={() => setSelectedMethod("paypal")}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-6 flex items-center justify-center">
              <Image src={paypalIcon} alt="stripe icon" height={40} width={40} />
            </div>
            <span className="text-sm font-medium text-gray-700">PayPal</span>
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === "paypal"
                  ? "border-text-secondary"
                  : "border-gray-300"
              }`}
            >
              {selectedMethod === "paypal" && (
                <div className="w-2 h-2 rounded-full bg-white flex items-center justify-center"><div className="bg-text-secondary h-2 w-2 rounded-full"></div></div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Render Payment Form Based on Selected Method */}
      {selectedMethod === "card" && <ResourceStripePaymentForm />}
      {selectedMethod === "paypal" && <ResourcePaypalPaymentForm /> }
    </div>
  );
}
