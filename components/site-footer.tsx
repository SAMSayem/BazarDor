import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container-width footer-inner">
        <Link href="/" className="footer-brand">
          <span className="footer-brand-mark">🛒</span>
          <span><strong>বাজার দর</strong><small>প্রয়োজনীয় পণ্যের দাম এক নজরে।</small></span>
        </Link>
        <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </footer>
  );
}
