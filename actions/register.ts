"use server";

import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (formData: z.infer<typeof RegisterSchema>) => {
  const validation = RegisterSchema.safeParse(formData);

  if (!validation.success) {
    return { error: "Invalid fields!" };
  }

  const { email, name, password } = validation.data;

  const hashedPassword = await bcryptjs.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User already exist with an email!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // TODO: Send verification token email

  return { success: "User created successfully !" };
};
