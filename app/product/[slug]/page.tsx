import type { Metadata } from "next";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, MapPin, ShieldCheck, TrendingDown, TrendingUp } from "lucide-react";
import { getCategory } from "@/lib/categories";
import { formatBengaliNumber, formatTaka, getProductBySlug, trendLabel } from "@/lib/products";
import { getServerSession } from "@/lib/session";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? `${product.name} — আজকের বাজারদর` : "পণ্য পাওয়া যায়নি" };
}

export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const session = await getServerSession();
  if (!session) redirect(`/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}&message=login-required`);

  const marketValues = product.marketPrices.map((entry) => entry.price).filter((price) => price > 0);
  const minPrice = marketValues.length ? Math.min(...marketValues) : product.price;
  const maxPrice = marketValues.length ? Math.max(...marketValues) : product.price;
  const averagePrice = marketValues.length ? Math.round(marketValues.reduce((sum, value) => sum + value, 0) / marketValues.length) : product.price;
  const category = getCategory(product.category);
  const trendClass = product.change > 0 ? "trend-up" : product.change < 0 ? "trend-down" : "trend-flat";

  return (
    <main className="page-main product-detail-page">
      <div className="container-width">
        <div className="breadcrumbs"><Link href="/">হোম</Link><span>›</span>{category && <><Link href={`/category/${category.slug}`}>{category.name}</Link><span>›</span></>}<span>{product.name}</span></div>
        <Link href={category ? `/category/${category.slug}` : "/"} className="back-link"><ArrowLeft size={16} /> তালিকায় ফিরে যান</Link>
        <section className="detail-summary-card">
          <div className="detail-summary-main">
            <div className="detail-product-emoji">{product.emoji}</div>
            <div className="detail-product-copy"><div className="detail-tags"><span className="detail-tag">{category?.emoji} {product.categoryName}</span><span className="detail-tag tag-unit">{product.unit}</span></div><h1>{product.name}</h1><p>{product.description}</p><div className="detail-updated"><ShieldCheck size={15} /> সম্ভাব্য বাজারদর · প্রতিদিন পরিবর্তনশীল</div></div>
          </div>
          <div className="detail-current-price"><span>আজকের সম্ভাব্য দাম</span><strong>{formatBengaliNumber(product.price)} <small>টাকা</small></strong><span className={`change-badge ${trendClass}`}>{trendLabel(product.change)}</span><small className="unit-caption">{product.unit}</small></div>
        </section>

        <section className="price-stats-section">
          <div className="section-heading-row"><div><p className="section-kicker">PRICE OVERVIEW</p><h2>দামের সারসংক্ষেপ</h2><p className="section-subtitle">বিভিন্ন বাজারের দামের ভিত্তিতে তুলনামূলক চিত্র</p></div></div>
          <div className="price-stat-grid">
            <div className="price-stat-card min-stat"><span className="price-stat-icon">↓</span><span className="price-stat-label">সর্বনিম্ন দাম</span><strong>{formatTaka(minPrice)}</strong><small>তালিকাভুক্ত বাজারগুলোর মধ্যে</small></div>
            <div className="price-stat-card max-stat"><span className="price-stat-icon">↑</span><span className="price-stat-label">সর্বোচ্চ দাম</span><strong>{formatTaka(maxPrice)}</strong><small>তালিকাভুক্ত বাজারগুলোর মধ্যে</small></div>
            <div className="price-stat-card avg-stat"><span className="price-stat-icon">≈</span><span className="price-stat-label">গড় দাম</span><strong>{formatTaka(averagePrice)}</strong><small>বাজারভিত্তিক দামের গড়</small></div>
          </div>
        </section>

        <section className="market-prices-section">
          <div className="section-heading-row"><div><p className="section-kicker">COMPARE LOCAL MARKETS</p><h2><MapPin size={21} /> বাজারভিত্তিক আজকের দাম</h2><p className="section-subtitle">একই পণ্যের দাম এক বাজার থেকে অন্য বাজারে আলাদা হতে পারে।</p></div><span className="market-count">{formatBengaliNumber(product.marketPrices.length)}টি বাজার</span></div>
          <div className="market-table-wrap"><table className="market-table"><thead><tr><th>বাজারের নাম</th><th>আজকের দাম</th><th>গড় দামের তুলনা</th><th>অবস্থা</th></tr></thead><tbody>{product.marketPrices.map((entry, index) => { const delta = averagePrice ? ((entry.price - averagePrice) / averagePrice) * 100 : 0; return <tr key={`${entry.market}-${index}`}><td><span className="market-pin"><MapPin size={15} /></span><strong>{entry.market}</strong></td><td className="table-price">{formatTaka(entry.price)}</td><td><span className={`market-delta ${delta < 0 ? "delta-low" : delta > 0 ? "delta-high" : "delta-even"}`}>{delta === 0 ? "গড়ের সমান" : `${delta < 0 ? "−" : "+"}${formatBengaliNumber(Math.abs(delta), 1)}%`}</span></td><td><span className="market-status"><span /> তালিকাভুক্ত</span></td></tr>; })}</tbody></table></div>
          <p className="market-disclaimer">* বাজারভিত্তিক তুলনা সম্ভাব্য/নমুনা মূল্য নির্দেশ করতে পারে। কেনাকাটার আগে স্থানীয় বাজারে দাম যাচাই করুন।</p>
        </section>
        <section className="detail-bottom-cta"><div><span className="detail-bottom-emoji">🧺</span><div><h2>আরও পণ্যের দাম দেখুন</h2><p>সব বিভাগের পণ্য এক জায়গায় সাজানো আছে।</p></div></div><Link href="/#সব-পণ্য" className="button button-primary">সব পণ্য দেখুন <ArrowUpRight size={17} /></Link></section>
      </div>
    </main>
  );
}
