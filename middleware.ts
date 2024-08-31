import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

// no need for wrapping middleware funciton with auth,
// we can export direct "middleware" (no other name) function or default function
export default auth((req) => {
  const isLoggedIn = !!req.auth;
  console.log("Is logged in :", isLoggedIn);
  console.log("Route :", req.nextUrl.pathname);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
