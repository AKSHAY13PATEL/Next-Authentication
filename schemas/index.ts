import { UserRole } from "@prisma/client";
import { z } from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    isTwoFactorEnabled: z.boolean().optional(),
    password: z.string().min(6).optional(),
    newPassword: z.string().min(6).optional(),
  })
  .refine(
    (data) => {
      if (
        (data.password && !data.newPassword) ||
        (!data.password && data.newPassword)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "New Password is requried",
      path: ["newPassword"],
    }
  );

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
