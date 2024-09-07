import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { CredentialsSignin, type NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            throw new CredentialsSignin("Validation of credentials failed");
          }

          console.log("before");
          const isPasswordMatched = await bcryptjs.compare(
            password,
            user.password
          );
          console.log("after", isPasswordMatched);
          if (isPasswordMatched) {
            return user;
          }
        }

        throw new CredentialsSignin("Validation of credentials failed");
      },
    }),
  ],
} satisfies NextAuthConfig;
