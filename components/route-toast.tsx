"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export default function RouteToast() {
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("socialLogin") === "success") {
      toast.success("সাইন ইন সফল হয়েছে!");
      url.searchParams.delete("socialLogin");
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    }
  }, []);
  return null;
}
