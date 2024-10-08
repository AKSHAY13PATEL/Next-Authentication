"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { ReactNode } from "react";
import FormError from "../form-error";

interface RoleGateProps {
  children: ReactNode;
  allowedRole: UserRole;
}

const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role != allowedRole) {
    return <FormError message="Not allowed to access this text!" />;
  }

  return <div>{children}</div>;
};

export default RoleGate;
