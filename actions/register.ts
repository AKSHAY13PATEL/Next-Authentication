"use server";

import { RegisterSchema } from "@/schemas";
import { z } from "zod";

export const register = async (formData: z.infer<typeof RegisterSchema>) => {
  const validation = RegisterSchema.safeParse(formData);

  if (!validation.success) {
    return { error: "Invalid fields!" };
  }

  return { success: "Registration successfull !" };
};
