import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      {children}
    </div>
  );
};

export default AuthLayout;
