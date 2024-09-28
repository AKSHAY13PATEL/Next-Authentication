import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuid4 } from "uuid";
import { db } from "./db";

export const generateVerificationToken = async (email: string) => {
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({ where: { id: existingToken.id } });
  }

  const token = uuid4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const verificationToken = db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await db.passwordResetToken.delete({ where: { id: existingToken.id } });
  }

  const token = uuid4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const resetToken = db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return resetToken;
};
