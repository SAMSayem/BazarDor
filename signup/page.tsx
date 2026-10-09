import type { Metadata } from "next";
import AuthForm from "@/components/auth-form";

export const metadata: Metadata = { title: "সাইন আপ" };

export default function SignUpPage() {
  return <main className="auth-page page-main"><div className="container-width"><AuthForm mode="signup" /></div></main>;
}
