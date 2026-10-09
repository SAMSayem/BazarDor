import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return <main className="page-main not-found-page"><div className="container-width"><div className="not-found-card"><div className="not-found-symbol"><SearchX size={44} /></div><p className="section-kicker">404 · PAGE NOT FOUND</p><h1>দুঃখিত, পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</h1><p>আপনার খোঁজা পণ্য বা পৃষ্ঠাটি সরানো হয়েছে, নাম পরিবর্তন হয়েছে অথবা ঠিকানাটি সঠিক নয়।</p><Link href="/" className="button button-primary"><ArrowLeft size={17} /> হোম পেজে ফিরে যান</Link></div></div></main>;
}
