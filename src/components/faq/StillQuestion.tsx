"use client"

import { useRouter } from "next/navigation";
import React from "react";
import { FaGreaterThan } from "react-icons/fa6";

export default function StillQuestion() {
  const router = useRouter();

  const handleContactUsBtn = () => {
    router.push("/contact");
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-20">
      <h3 className="text-3xl text-text-primary font-medium">Still have questions?</h3>
      <p className="pb-6 text-base text-text-primary">Please connect with our team, we are happy to help you</p>
      <button onClick={handleContactUsBtn} className="flex items-center gap-2 cursor-pointer bg-text-secondary text-white px-6 py-3 rounded-full hover:bg-primary transition-colors duration-200">
        Contact Us
        <FaGreaterThan />
      </button>
    </div>
  );
}
