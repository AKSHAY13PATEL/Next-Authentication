import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import crypto from "crypto";
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

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};
