import React from "react";

interface Props {
  label: string;
}

const Header = ({ label }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <h1 className="text-3xl font-semibold">🔐 Auth</h1>
      <p className="text-sm">{label}</p>
    </div>
  );
};

export default Header;
