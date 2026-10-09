import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import PriceTicker from "@/components/price-ticker";
import RouteToast from "@/components/route-toast";

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

import "./globals.css";

export const metadata: Metadata = {
  title: { default: "বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের দাম", template: "%s | বাজার দর" },
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের সম্ভাব্য বাজারদর, বিভাগভিত্তিক তালিকা এবং দামের পরিবর্তন এক নজরে দেখুন।",
  applicationName: "BazarDor",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn">
      <body>
        <SiteHeader />
        <PriceTicker />
        {children}
        <SiteFooter />
        <RouteToast />
        <Toaster position="top-center" toastOptions={{ duration: 3500, style: { fontFamily: "inherit", borderRadius: "12px" } }} />
      </body>
    </html>
  );
}
