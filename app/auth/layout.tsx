import React, { ReactNode } from "react";

const AuthLayoutPage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-emerald-500 ">
      {children}
    </div>
  );
};

export default AuthLayoutPage;
