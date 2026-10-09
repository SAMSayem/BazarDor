import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatBengaliNumber, trendLabel } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const trendClass = product.change > 0 ? "trend-up" : product.change < 0 ? "trend-down" : "trend-flat";
  return (
    <Link href={`/product/${product.slug}`} className="product-card" aria-label={`${product.name} এর বিস্তারিত দেখুন`}>
      <div className="product-card-top">
        <div className="product-emoji-wrap" aria-hidden>{product.emoji}</div>
        <span className={`change-badge ${trendClass}`}>{trendLabel(product.change)}</span>
      </div>
      <div className="product-heading-row">
        <h3>{product.name}</h3>
        <ArrowUpRight size={17} className="card-arrow" aria-hidden />
      </div>
      <p className="product-unit">{product.unit}</p>
      <div className="product-price-row">
        <div><span className="price-label">আজকের দাম</span><div className="price-value">{formatBengaliNumber(product.price)} <span>টাকা</span></div></div>
        <span className="price-arrow" aria-hidden>↗</span>
      </div>
    </Link>
  );
}
