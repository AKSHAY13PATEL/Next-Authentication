import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

function FallbackScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-emerald-500">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Spinner */}
        <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        {/* Message */}
        <p className="text-lg font-semibold text-white">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={inter.className}>
          <Suspense fallback={<FallbackScreen />}>{children}</Suspense>{" "}
        </body>
        <Toaster />
      </html>
    </SessionProvider>
  );
}
