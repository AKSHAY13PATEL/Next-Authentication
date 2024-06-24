import React from "react";
import { IoWarningOutline } from "react-icons/io5";

interface Props {
  message?: string;
}

const FormError = ({ message }: Props) => {
  if (!message) return null;

  return (
    <div className="w-full p-2 bg-destructive/15 text-destructive flex gap-x-2 text-sm rounded-md">
      <IoWarningOutline className="h-5 w-5" />
      FormError
    </div>
  );
};

export default FormError;
