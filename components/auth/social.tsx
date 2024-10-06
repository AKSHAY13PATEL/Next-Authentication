"use client";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const Social = () => {
  const onClick = async (provider: "google" | "github") => {
    await signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        variant={"outline"}
        size={"lg"}
        className="w-full"
        onClick={() => {
          onClick("google");
        }}
      >
        <FaGoogle />
      </Button>
      <Button
        variant={"outline"}
        size={"lg"}
        className="w-full"
        onClick={() => {
          onClick("github");
        }}
      >
        <FaGithub />
      </Button>
    </div>
  );
};

export default Social;
