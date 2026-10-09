import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ProfileUpdateForm from "@/components/profile-update-form";
import { getServerSession } from "@/lib/session";

export const metadata: Metadata = { title: "তথ্য আপডেট" };

export default async function UpdateProfilePage() {
  const session = await getServerSession();
  if (!session) redirect("/signin?message=login-required");
  return <main className="page-main update-page"><div className="container-width"><ProfileUpdateForm currentName={session.user.name || ""} /></div></main>;
}
