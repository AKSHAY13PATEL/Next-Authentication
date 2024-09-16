"use client";

import React from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";

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
