"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CATEGORIES } from "@/lib/categories";
import { authClient } from "@/lib/auth-client";

function banglaDate(): string {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dhaka",
  }).format(new Date());
}

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [date, setDate] = useState("আজকের বাজারদর");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setDate(banglaDate()), []);

  async function handleSignOut() {
    try {
      await authClient.signOut();
      toast.success("আপনি সফলভাবে সাইন আউট করেছেন");
      setMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    }
  }

  return (
    <header className="site-header">
      <div className="header-main container-width">
        <Link href="/" className="brand" aria-label="বাজার দর হোম পেজ">
          <span className="brand-mark"><Image src="/logo-icon.png" alt="" width={26} height={26} /></span>
          <span className="brand-copy">
            <strong>বাজার দর</strong>
            <small>{date}</small>
          </span>
        </Link>
        <div className="header-actions">
          {!isPending && session ? (
            <div className="profile-menu-wrap">
              <button className="profile-trigger" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen}>
                <span className="avatar"><UserRound size={17} /></span>
                <span className="profile-trigger-name">{session.user.name || "আমার প্রোফাইল"}</span>
                <span aria-hidden>⌄</span>
              </button>
              {menuOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-person"><strong>{session.user.name}</strong><small>{session.user.email}</small></div>
                  <Link href="/profile" onClick={() => setMenuOpen(false)}>আমার প্রোফাইল</Link>
                  <Link href="/profile/update" onClick={() => setMenuOpen(false)}>তথ্য আপডেট</Link>
                  <button onClick={handleSignOut}><LogOut size={15} /> সাইন আউট</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/signin" className="button button-ghost header-auth">সাইন ইন</Link>
              <Link href="/signup" className="button button-primary header-auth">সাইন আপ</Link>
            </>
          )}
        </div>
      </div>
      <div className="category-nav-wrap">
        <nav className="category-nav container-width" aria-label="পণ্যের বিভাগ">
          <Link href="/#সব-পণ্য" className={`category-link ${pathname === "/" ? "category-link-home" : ""}`}>
            <span>◉</span> সব
          </Link>
          {CATEGORIES.map((category) => {
            const active = pathname === `/category/${category.slug}`;
            return (
              <Link href={`/category/${category.slug}`} key={category.slug} className={`category-link ${active ? "active" : ""}`}>
                <span>{category.emoji}</span>{category.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
