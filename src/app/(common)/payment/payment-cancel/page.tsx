import Image from "next/image";
import React from "react";
import error from "@/assets/payment/error.png";

export default function page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-96 w-96 flex flex-col items-center justify-center gap-10 text-center">
        <Image
          src={error.src}
          alt="error"
          width={96}
          height={96}
          className=""
        />
        <h1 className="text-4xl font-bold w-11/12 md:w-auto">Payment Unsuccessful</h1>
        <p className="w-11/12 md:w-auto">
          Your payment was unsuccessful. Please try again or contact support if
          the issue persists.
        </p>
      </div>
    </div>
  );
}
