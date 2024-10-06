"use client";

import { verifyNewToken } from "@/actions/new-verification";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import CardWrapper from "./card-wrapper";

const NewVerificationForm = () => {
  const params = useSearchParams();
  const token = params.get("token");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Token not found!");
      return;
    }

    verifyNewToken(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch((data) => {
        setError("Something went wrong while verifying token!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your email"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login page"
    >
      <div className="flex flex-col items-center justify-center w-full gap-4">
        {!success && !error && <SyncLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
