import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required!" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required!" }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 character long" }),
  name: z
    .string()
    .min(3, { message: "Username should be at least 3 character long!" }),
});

export const ResetSchema = z.object({
  email: z.string().email(),
});

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 character long" }),
});
