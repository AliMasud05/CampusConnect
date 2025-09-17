import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-rows-[auto,1fr,auto] min-h-screen overflow-x-hidden">
      <Navbar />
      {children}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CommonLayout;
