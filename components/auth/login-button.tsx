"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import LoginForm from "./login-form";

interface Props {
  children: ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

const LoginButton = ({ children, mode = "redirect", asChild }: Props) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return <span onClick={onClick}>{children}</span>;
};

export default LoginButton;
