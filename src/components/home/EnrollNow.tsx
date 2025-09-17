"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface EnrollNowProps {
  buttonText: string;
}

const EnrollNow: React.FC<EnrollNowProps> = ({ buttonText }) => {
  const router = useRouter();

  const handleEnrollNowBtn = () => {
    router.push("/courses");
  };

  return (
    <section className="container mx-auto bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="">
        {/* Main heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-semibold text-text-primary leading-tight">
            <span className="relative text-text-secondary inline-block">
              Ready
              <svg
                className="absolute -bottom-1 left-0 w-full h-3"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 8 C20 0, 80 0, 100 8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            to Learn, Build & Level Up?
          </h1>
        </div>

        {/* Description text */}
        <div className="md:max-w-4xl text-center mb-16 space-y-4 mx-auto text-gray-600 text-base sm:text-lg leading-relaxed">
          <p className="text-center">
            Join thousands of learners and professionals who are transforming
            their skills with Haris Kovačević. Whether you&apos;re starting out
            or scaling up — now is the time to take action.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleEnrollNowBtn}
            className="bg-text-secondary py-3 px-6 rounded-full text-white cursor-pointer hover:bg-primary/80"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default EnrollNow;
