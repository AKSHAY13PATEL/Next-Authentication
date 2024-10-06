import { logout } from "@/actions/logout";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const LogoutButton = ({ children }: Props) => {
  const onClick = () => {
    logout();
  };

  return (
    <div onClick={onClick} className="cursor-pointer">
      {children}
    </div>
  );
};

export default LogoutButton;
