import type { Metadata } from "next";
import AuthForm from "@/components/auth-form";

export const metadata: Metadata = { title: "সাইন ইন" };

export default function SignInPage() {
  return <main className="auth-page page-main"><div className="container-width"><AuthForm mode="signin" /></div></main>;
}
