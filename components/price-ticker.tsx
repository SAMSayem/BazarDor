"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/products";
import { formatBengaliNumber, trendLabel } from "@/lib/products";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/products", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Products unavailable");
        return response.json() as Promise<{ products?: Product[] }>;
      })
      .then((data) => setProducts(Array.isArray(data.products) ? data.products : []))
      .catch(() => setProducts([]));
    return () => controller.abort();
  }, []);

  const entries = products.slice(0, 12);
  if (!entries.length) return <div className="ticker ticker-loading"><span>🛒</span> বাজারদরের তথ্য লোড হচ্ছে...</div>;
  return (
    <div className="ticker" aria-label="আজকের দামের চলমান তালিকা">
      <div className="ticker-track">
        {[...entries, ...entries].map((product, index) => (
          <Link href={`/product/${product.slug}`} className="ticker-item" key={`${product.id}-${index}`}>
            <span className="ticker-emoji">{product.emoji}</span>
            <span className="ticker-name">{product.name}</span>
            <span className="ticker-price">{formatBengaliNumber(product.price)} টাকা/{product.unit.replace("প্রতি ", "")}</span>
            <span className={`trend-text ${product.change > 0 ? "trend-up-text" : product.change < 0 ? "trend-down-text" : "trend-flat-text"}`}>
              {trendLabel(product.change)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
