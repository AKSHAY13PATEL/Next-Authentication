import React from "react";
import { IoCloudDoneOutline } from "react-icons/io5";

interface Props {
  message?: string;
}

const FormSuccess = ({ message }: Props) => {
  if (!message) return null;

  return (
    <div className="w-full p-2 bg-emerald-500/15 text-emerald-500 flex gap-x-2 text-sm rounded-md">
      <IoCloudDoneOutline className="w-5 h-5" />
      FormSuccess
    </div>
  );
};

export default FormSuccess;
