"use server";

import { LoginSchema } from "@/schemas";
import { z } from "zod";

export const login = async (formData: z.infer<typeof LoginSchema>) => {
  const validation = LoginSchema.safeParse(formData);

  if (!validation.success) {
    return { error: "Invalid fields!" };
  }

  return { success: "Email sent!" };
};
