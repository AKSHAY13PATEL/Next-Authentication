"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/email";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (formData: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification mail sent successfully" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
      // callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Login Successfull" };
  } catch (error) {
    // this is not ideal solution for the problem
    // auth js throw callbackroute error to hide the details
    // and inside that credentials error is hidden
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError":
          if (
            error.cause &&
            typeof error.cause === "object" &&
            "err" in error.cause
          ) {
            const cause = error.cause as { err: { code?: string } };
            if (cause.err && cause.err.code === "credentials") {
              return { error: "Invalid credentials" };
            }
          }
        default:
          return { error: "An authentication error occurred" };
      }
    }

    throw error;
  }
};
