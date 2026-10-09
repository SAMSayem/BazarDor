"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import ProductCard from "@/components/product-card";
import type { Product } from "@/lib/products";
import { formatBengaliNumber } from "@/lib/products";

type SortMode = "default" | "low" | "high";

export default function CategoryListing({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortMode>("default");
  const sorted = useMemo(() => {
    if (sort === "low") return [...products].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...products].sort((a, b) => b.price - a.price);
    return products;
  }, [products, sort]);
  if (!products.length) {
    return <div className="empty-state"><span className="empty-icon">🧺</span><h2>এই বিভাগে কোনো পণ্য পাওয়া যায়নি</h2><p>অন্য বিভাগ দেখুন অথবা সব পণ্যের তালিকায় ফিরে যান।</p><Link href="/" className="button button-primary">হোম পেজে ফিরে যান</Link></div>;
  }
  return (
    <>
      <div className="category-listing-toolbar"><p className="result-count">মোট {formatBengaliNumber(sorted.length)}টি পণ্য</p><label className="sort-select"><span>সাজান:</span><select value={sort} onChange={(event) => setSort(event.target.value as SortMode)}><option value="default">ডিফল্ট</option><option value="low">দাম: কম থেকে বেশি</option><option value="high">দাম: বেশি থেকে কম</option></select><ChevronDown size={15} /></label></div>
      <div className="product-grid">{sorted.map((product) => <ProductCard product={product} key={`${product.id}-${product.slug}`} />)}</div>
    </>
  );
}
