import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getServerSession() {
  if (!process.env.DATABASE_URL) return null;
  try {
    return await auth.api.getSession({ headers: await headers() });
  } catch {
    return null;
  }
}
