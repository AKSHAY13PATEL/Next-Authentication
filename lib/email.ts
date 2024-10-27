import { Resend } from "resend";

const domain = process.env.NEXT_DOMAIN_BASE_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Confirm your email",
    html: `<p>Click <a href=${confirmLink}>here</a> for verification of your email.</p>`,
  });
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const confirmLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Reset your password",
    html: `<p>Click <a href=${confirmLink}>here</a> for reset your password.</p>`,
  });
};

export const sendTwoFactorToken = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "2FA code",
    html: `<p>Here is your 2FA code :${token}</p>`,
  });
};
