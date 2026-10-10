"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import ProductCard from "@/components/product-card";
import { CATEGORIES, type CategorySlug } from "@/lib/categories";
import type { Product } from "@/lib/products";
import { formatBengaliNumber } from "@/lib/products";

const categoryOptions: Array<{ slug: CategorySlug | "all"; name: string; emoji: string }> = [
  { slug: "all", name: "সব", emoji: "◉" },
  ...CATEGORIES.map(({ slug, name, emoji }) => ({ slug, name, emoji })),
];

type SortMode = "default" | "low" | "high";

export default function ProductBrowser({ products, initialCategory = "all" }: { products: Product[]; initialCategory?: CategorySlug | "all" }) {
  const [category, setCategory] = useState<CategorySlug | "all" | string>(initialCategory);
  const [sortMode, setSortMode] = useState<SortMode>("default");
  const [search, setSearch] = useState("");

  const visibleProducts = useMemo(() => {
    let result = products.filter((product) => category === "all" || product.category === category);
    if (search.trim()) result = result.filter((product) => product.name.toLocaleLowerCase("bn").includes(search.trim().toLocaleLowerCase("bn")));
    if (sortMode === "low") result = [...result].sort((a, b) => a.price - b.price);
    if (sortMode === "high") result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [products, category, sortMode, search]);

  return (
    <>
     
      <p className="result-count">মোট {formatBengaliNumber(visibleProducts.length)}টি পণ্য দেখানো হচ্ছে</p>
      {visibleProducts.length ? (
        <div className="product-grid">{visibleProducts.map((product) => <ProductCard product={product} key={`${product.id}-${product.slug}`} />)}</div>
      ) : (
        <div className="empty-state"><span className="empty-icon">🔎</span><h3>কোনো পণ্য পাওয়া যায়নি</h3><p>অন্য নাম লিখে দেখুন অথবা সব পণ্য নির্বাচন করুন।</p><button className="button button-primary" onClick={() => { setSearch(""); setCategory("all"); }}>সব পণ্য দেখুন</button></div>
      )}
    </>
  );
}
