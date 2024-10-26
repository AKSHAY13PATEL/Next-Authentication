import { auth } from "@/auth";
import { revalidateTag } from "next/cache";

export const currentUser = async () => {
  revalidateTag("user-data-server");

  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user.role;
};
