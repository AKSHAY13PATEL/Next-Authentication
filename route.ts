/**
 * Array of route accessible for public
 */
export const publicRoutes: string[] = ["/", "/auth/new-verification"];

/**
 * Array of route used for authentication
 * These routes will redirect logged in user to dashboard page
 */
export const authRoute: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
];

/**
 * The prefix for api authentication routes
 * Routes that start with it used for API authentication purpose
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * Default redirect path for logged in user
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/dashboard";
