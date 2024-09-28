"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const newPassword = async (
  formData: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return { error: "Token not found!" };
  }

  const validatedFields = NewPasswordSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: "Invalid email" };
  }

  const { password } = validatedFields.data;

  const exsistingResetPasswordToken = await getPasswordResetTokenByToken(token);
  if (!exsistingResetPasswordToken) {
    return { error: "Invalid token!" };
  }

  if (
    new Date().getTime() >
    new Date(exsistingResetPasswordToken.expires).getTime()
  ) {
    return { error: "Token expired!" };
  }

  const existingUser = await getUserByEmail(exsistingResetPasswordToken.email);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  //   await db.passwordResetToken.delete({
  //     where: { id: exsistingResetPasswordToken.id },
  //   });

  return { success: "Email verified" };
};
