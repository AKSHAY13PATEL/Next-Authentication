import { Resend } from "resend";

export const sendVerificationEmail = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Confirm your email",
    html: `<p>Click <a href=${confirmLink}>here</a> for verification of your email.</p>`,
  });
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Reset your password",
    html: `<p>Click <a href=${confirmLink}>here</a> for reset your password.</p>`,
  });
};
