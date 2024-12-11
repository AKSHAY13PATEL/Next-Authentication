"use client";

import { login } from "@/actions/login";
import CardWrapper from "@/components/auth/card-wrapper";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type LoginType = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email provided is already linked with other account"
      : "";

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(data, callbackUrl)
        .then((data) => {
          if (data?.error) {
            // form.reset();
            setError(data?.error);
          }

          if (data?.success) {
            // form.reset();
            setSuccess(data?.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });

    // router.push("/dashboard");
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="abc@xyz.com"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                ></FormField>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="******"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <Button
                          variant="link"
                          size="sm"
                          className="px-0 font-normal"
                          asChild
                        >
                          <Link href="/auth/reset">Forget password</Link>
                        </Button>
                      </FormItem>
                    );
                  }}
                ></FormField>
              </>
            )}

            {/* 2FA code */}
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>2 Factor Authentication Code</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="123456"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button size={"sm"} className="w-full" type="submit">
            {/* {showTwoFactor ? "Confirm" : "Submit"} */}

            {isPending ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                {showTwoFactor ? "Confirming..." : "Submiting..."}
              </>
            ) : (
              <>{showTwoFactor ? "Confirm" : "Submit"}</>
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
