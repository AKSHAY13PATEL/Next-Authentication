"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

const LoginButton = ({ children, mode = "redirect", asChild }: Props) => {
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/auth/login");
  };

  return <span onClick={handleSubmit}>{children}</span>;
};

export default LoginButton;
