"use client";

import { useEffect, useState } from "react";

// interface ConsentPopupProps {
//   onContinue?: () => void;
//   onLeave?: () => void;
// }

export function ConsentPopup() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const ageConfirmed = localStorage.getItem("age-confirmed");
    if (ageConfirmed) {
      setIsOpen(false);
    }
  }, []);

  const handleContinue = () => {
    localStorage.setItem("age-confirmed", "true");

    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {/* <button onClick={handleClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button> */}

        <div className="mb-6 text-center">
          <h1 className="mb-4 text-3xl font-bold text-red-600" style={{ fontFamily: "fantasy" }}>
            RandM
          </h1>
          <h2 className="mb-2 text-xl font-bold">Adults Only (18+)</h2>
          <p className="mb-4">You must be 18 years or older to enter this site.</p>
          <div className="rounded-md bg-red-50 p-2 text-center">
            <p>Please confirm your age to continue.</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleContinue}
            className="rounded bg-red-600 px-6 py-2 font-medium text-white hover:bg-red-700"
          >
            CONTINUE
          </button>
          {/* <span className="mx-2">or</span>
          <button onClick={handleLeave} className="rounded bg-black px-6 py-2 font-medium text-white hover:bg-gray-800">
            LEAVE
          </button> */}
        </div>
      </div>
    </div>
  );
}
