/**
 * An array of routes that are public.
 */
export const publicRoutes: string[] = ["/", "/new-verification"];

/**
 * An array of routes that are used for authentication
 * Logged in users are redirected to /dash
 */
export const authRoutes: string[] = ["/login", "/register", "/passwordreset", "/somethingwentwrong", "/new-password"];

/**
 * Prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after logging in
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/dash";
