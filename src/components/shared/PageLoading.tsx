"use client";

import { useEffect, useState } from "react";

export default function PageLoading() {
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === "Loading...") return "Loading";
        if (prev === "Loading..") return "Loading...";
        if (prev === "Loading.") return "Loading..";
        return "Loading.";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-secondary bg-opacity-90 backdrop-blur-sm">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-t-4 border-primary border-solid rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-4 border-primary rounded-full animate-ping"></div>
      </div>
      <p className="text-xl font-medium mt-6 min-w-[150px] text-center text-primary">
        {loadingText}
      </p>
    </div>
  );
}