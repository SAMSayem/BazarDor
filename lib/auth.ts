import { betterAuth } from "better-auth";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;
const authSecret = process.env.BETTER_AUTH_SECRET;
if (process.env.NODE_ENV === "production" && !authSecret) {
  throw new Error("BETTER_AUTH_SECRET must be set in production. Generate one with: openssl rand -base64 32");
}
const pool = databaseUrl ? new Pool({ connectionString: databaseUrl, max: 5 }) : undefined;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

export const auth = betterAuth({
  ...(pool ? { database: pool } : {}),
  baseURL: process.env.BETTER_AUTH_URL || "https://bazar-dor-delta-jet.vercel.app",
  secret: authSecret || "GagfemEX9/++CGLSreD7mKYEolenhU/znltIcEPpRr0=",
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false,
  },
  socialProviders: {
    ...(googleClientId && googleClientSecret
      ? { google: { clientId: googleClientId, clientSecret: googleClientSecret } }
      : {}),
    ...(githubClientId && githubClientSecret
      ? { github: { clientId: githubClientId, clientSecret: githubClientSecret } }
      : {}),
  },
  user: {
    changeEmail: { enabled: false },
  },
  advanced: {
    cookiePrefix: "bazardor",
    useSecureCookies: process.env.NODE_ENV === "production",
  },
});
