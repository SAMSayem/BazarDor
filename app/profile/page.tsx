import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Mail, ShieldCheck, UserRound } from "lucide-react";
import { getServerSession } from "@/lib/session";

export const metadata: Metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  const session = await getServerSession();
  if (!session) redirect("/signin?message=login-required");
  const initial = session.user.name?.trim().charAt(0) || "ব";

  return (
    <main className="page-main profile-page"><div className="container-width profile-container">
      <div className="breadcrumbs"><Link href="/">হোম</Link><span>›</span><span>আমার প্রোফাইল</span></div>
      <section className="profile-card"><div className="profile-banner"><span>ACCOUNT SETTINGS</span><span className="profile-banner-art">✳</span></div><div className="profile-details"><div className="profile-avatar-large">{initial}</div><h1>{session.user.name || "বাজার দর ব্যবহারকারী"}</h1><p>বাজার দর-এর সদস্য</p><div className="profile-info-list"><div><span className="profile-info-icon"><UserRound size={18} /></span><div><small>আপনার নাম</small><strong>{session.user.name || "নাম যোগ করা হয়নি"}</strong></div></div><div><span className="profile-info-icon"><Mail size={18} /></span><div><small>ইমেইল ঠিকানা</small><strong>{session.user.email}</strong></div><span className="verified-label"><ShieldCheck size={14} /> অ্যাকাউন্ট</span></div></div><Link href="/profile/update" className="button button-primary profile-update-button">তথ্য আপডেট করুন <ArrowRight size={17} /></Link></div></section>
    </div></main>
  );
}
