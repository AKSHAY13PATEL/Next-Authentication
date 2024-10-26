"use server";

import bcryptjs from "bcryptjs";
import { z } from "zod";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";
import { generateVerificationToken } from "@/lib/tokens";
import { SettingsSchema } from "@/schemas";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user) return { error: "Unauthorized!" };

  const dbUser = await getUserById(user.id!);
  if (!dbUser) return { error: "Unauthorized!" };

  if (user.isOAuth) {
    values.password = undefined;
    values.newPassword = undefined;
    values.email = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email != user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id != user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification email sent successfully" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const isValidPassword = await bcryptjs.compare(
      values.password,
      dbUser.password
    );

    if (!isValidPassword) {
      return { error: "Incorrect password!" };
    }

    const hasedPassword = await bcryptjs.hash(values.newPassword, 10);

    values.password = hasedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "Settings updated successfully" };
};
