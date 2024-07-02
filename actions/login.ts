"use server";

import { LoginSchema } from "@/schemas";
import { z } from "zod";

export const login = async (formData: z.infer<typeof LoginSchema>) => {
  const validation = LoginSchema.safeParse(formData);

  if (!validation.success) {
    return { error: "Invalid fields!" };
  }

  await new Promise((resolve) => setTimeout(resolve, 5000));

  return { success: "Email sent!" };
};
