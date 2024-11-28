import React from "react";
import Navbar from "./_components/navbar";

interface Props {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: Props) => {
  return (
    <div
      className="h-full w-full flex flex-col gap-y-10 items-center 
        justify-center bg-gradient-to-r from-indigo-500 to-emerald-500 overflow-auto"
    >
      <div className="fixed mt-2 top-0">
        <Navbar />
      </div>
      <div className="flex-1 mt-[100px] mb-10">{children}</div>{" "}
    </div>
  );
};

export default ProtectedLayout;
