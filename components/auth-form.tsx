"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Github, LoaderCircle, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type AuthMode = "signin" | "signup";

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const isSignup = mode === "signup";
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("registered") === "1") toast.success("রেজিস্ট্রেশন সফল হয়েছে। এখন সাইন ইন করুন।");
    if (params.get("message") === "login-required") toast("এই পৃষ্ঠাটি দেখতে আগে সাইন ইন করুন।", { icon: "🔐" });
    if (params.get("error")) toast.error("সামাজিক লগইন সম্পন্ন হয়নি। আবার চেষ্টা করুন।");
  }, []);

  function callbackURL() {
    const query = new URLSearchParams(window.location.search);
    return query.get("callbackURL") || "/";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setFormError("সঠিক ইমেইল ঠিকানা লিখুন।");
      toast.error("সঠিক ইমেইল ঠিকানা লিখুন।");
      return;
    }
    if (password.length < 8) {
      setFormError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }
    if (isSignup && name.trim().length < 2) {
      setFormError("আপনার নাম কমপক্ষে ২ অক্ষরে লিখুন।");
      toast.error("আপনার নাম লিখুন।");
      return;
    }
    setLoading(true);
    try {
      if (isSignup) {
        const result = await authClient.signUp.email({ name: name.trim(), email: email.trim(), password, callbackURL: "/signin?registered=1" });
        if (result.error) throw new Error(result.error.message || "রেজিস্ট্রেশন করা যায়নি।");
        router.push("/signin?registered=1");
        router.refresh();
      } else {
        const result = await authClient.signIn.email({ email: email.trim(), password, callbackURL: callbackURL() });
        if (result.error) throw new Error(result.error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়।");
        toast.success("সাইন ইন সফল হয়েছে!");
        router.push(callbackURL());
        router.refresh();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      setFormError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSocial(provider: "google" | "github") {
    setSocialLoading(provider);
    setFormError("");
    try {
      const target = callbackURL();
      const separator = target.includes("?") ? "&" : "?";
      const result = await authClient.signIn.social({ provider, callbackURL: `${target}${separator}socialLogin=success` });
      if (result.error) throw new Error(result.error.message || "সামাজিক লগইন এখন সম্ভব নয়।");
    } catch (error) {
      const message = error instanceof Error ? error.message : "সামাজিক লগইন সেটআপ করা নেই।";
      setFormError(message);
      toast.error(message);
      setSocialLoading(null);
    }
  }

  return (
    <div className="auth-layout">
      <aside className="auth-aside">
        <div className="auth-aside-icon">🛒</div>
        <p className="eyebrow">স্বচ্ছ বাজারদর, সহজ সিদ্ধান্ত</p>
        <h2>প্রতিদিনের বাজার<br />এখন আপনার হাতেই।</h2>
        <p>এক জায়গায় দেখুন চাল, ডাল, তেল, সবজি, মাছ ও নিত্যপ্রয়োজনীয় পণ্যের সম্ভাব্য দাম।</p>
        <div className="auth-aside-points"><span>✓ বিভাগভিত্তিক দাম</span><span>✓ বাজারভিত্তিক তুলনা</span><span>✓ প্রতিদিনের মূল্য পরিবর্তন</span></div>
      </aside>
      <section className="auth-card">
        <Link href="/" className="auth-back">← হোম পেজে ফিরে যান</Link>
        <div className="auth-heading-icon">{isSignup ? "🌱" : "👋"}</div>
        <h1>{isSignup ? "নতুন অ্যাকাউন্ট খুলুন" : "আবার স্বাগতম"}</h1>
        <p className="auth-subtitle">{isSignup ? "বাজার দর-এর সঙ্গে যুক্ত হতে আপনার তথ্য দিন।" : "আপনার অ্যাকাউন্টে প্রবেশ করতে সাইন ইন করুন।"}</p>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {isSignup && <label>আপনার নাম<input autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="যেমন: সাম সায়েম" required /></label>}
          <label>ইমেইল ঠিকানা<div className="input-with-icon"><Mail size={17} /><input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required /></div></label>
          <label>পাসওয়ার্ড<input type="password" autoComplete={isSignup ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="কমপক্ষে ৮ অক্ষর" minLength={8} required /></label>
          {formError && <div role="alert" className="form-error">{formError}</div>}
          <button className="button button-primary auth-submit" disabled={loading} type="submit">{loading ? <><LoaderCircle className="spin" size={18} /> অপেক্ষা করুন...</> : isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন করুন"}</button>
        </form>
        <div className="auth-divider"><span />অথবা<span /></div>
        <div className="social-buttons">
          <button className="button social-button" type="button" onClick={() => handleSocial("google")} disabled={Boolean(socialLoading)}><span className="google-g">G</span>{socialLoading === "google" ? "সংযোগ হচ্ছে..." : "Google"}</button>
          <button className="button social-button" type="button" onClick={() => handleSocial("github")} disabled={Boolean(socialLoading)}><Github size={18} />{socialLoading === "github" ? "সংযোগ হচ্ছে..." : "GitHub"}</button>
        </div>
        <p className="auth-switch">{isSignup ? "আগে থেকেই অ্যাকাউন্ট আছে?" : "আপনার কি অ্যাকাউন্ট নেই?"} <Link href={isSignup ? "/signin" : "/signup"}>{isSignup ? "সাইন ইন করুন" : "সাইন আপ করুন"}</Link></p>
        <p className="auth-terms">চালিয়ে যাওয়ার মাধ্যমে আপনি আমাদের ব্যবহারবিধি ও গোপনীয়তা নীতিতে সম্মতি দিচ্ছেন।</p>
      </section>
    </div>
  );
}
