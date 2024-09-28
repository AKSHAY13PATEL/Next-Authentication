"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const verifyNewToken = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  if (new Date().getTime() > new Date(existingToken.expires).getTime()) {
    return { error: "Token expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  // also updating email becuase in future we might use same code for email id update verification also
  await db.user.update({
    where: { email: existingToken.email },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  await db.verificationToken.delete({ where: { id: existingToken.id } });

  return { success: "Email verified" };
};
