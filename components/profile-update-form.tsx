"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, LoaderCircle, Save } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfileUpdateForm({ currentName }: { currentName: string }) {
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
      return;
    }
    setLoading(true);
    try {
      const result = await authClient.updateUser({ name: trimmedName });
      if (result.error) throw new Error(result.error.message || "তথ্য আপডেট করা যায়নি।");
      toast.success("আপনার তথ্য সফলভাবে আপডেট হয়েছে।");
      router.push("/profile");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="update-card"><Link href="/profile" className="back-link"><ArrowLeft size={16} /> প্রোফাইলে ফিরে যান</Link><div className="update-icon">✎</div><h1>ব্যক্তিগত তথ্য আপডেট</h1><p>আপনার প্রোফাইলে দেখানো নাম পরিবর্তন করতে নিচের ফর্মটি পূরণ করুন।</p><form className="auth-form update-form" onSubmit={handleSubmit}><label>আপনার নাম<input value={name} onChange={(event) => setName(event.target.value)} minLength={2} maxLength={80} required placeholder="আপনার নাম লিখুন" /></label><button className="button button-primary auth-submit" type="submit" disabled={loading}>{loading ? <><LoaderCircle className="spin" size={18} /> সংরক্ষণ হচ্ছে...</> : <><Save size={17} /> তথ্য আপডেট করুন</>}</button></form></section>
  );
}
