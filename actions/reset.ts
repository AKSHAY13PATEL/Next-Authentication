"use server";

import { getUserByEmail } from "@/data/user";
import { sendResetPasswordEmail } from "@/lib/email";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas";
import { z } from "zod";

export const resetPassword = async (formData: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: "Invalid email" };
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendResetPasswordEmail(email, passwordResetToken.token);

  return { success: "Password reset link sent successfully" };
};
