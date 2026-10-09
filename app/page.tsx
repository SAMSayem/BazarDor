import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import ProductCard from "@/components/product-card";
import ProductBrowser from "@/components/product-browser";
import { getProducts } from "@/lib/products";

export const revalidate = 300;

export default async function HomePage() {
  const products = await getProducts();
  const risers = [...products].filter((product) => product.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);
  const fallers = [...products].filter((product) => product.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);
  const risingProducts = risers.length ? risers : [...products].sort((a, b) => b.change - a.change).slice(0, 6);
  const fallingProducts = fallers.length ? fallers : [...products].sort((a, b) => a.change - b.change).slice(0, 6);

  return (
    <main className="home-page">
      <section className="hero container-width">
        <div className="hero-content">
          <p className="eyebrow"><span className="eyebrow-dot" /> আপনার প্রতিদিনের বাজার সহযোগী</p>
          <h1>আজকের বাজারের দাম <span>এক নজরে</span></h1>
          <p className="hero-description">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
          <div className="hero-actions">
            <a href="#সব-পণ্য" className="button button-primary hero-cta">সব পণ্য দেখুন <ArrowRight size={18} /></a>
            <span className="hero-note"><span className="hero-note-icon">✓</span> সহজ, দ্রুত ও পরিষ্কার বাজারদর</span>
          </div>
          <div className="hero-stats">
            <div><strong>৩৩+</strong><span>নিত্যপ্রয়োজনীয় পণ্য</span></div>
            <span className="stat-divider" />
            <div><strong>৮</strong><span>টি পণ্যের বিভাগ</span></div>
            <span className="stat-divider" />
            <div><strong>৫</strong><span>টি বাজারের তুলনা</span></div>
          </div>
        </div>
        <div className="hero-art-wrap" aria-label="বাজারের তাজা পণ্যের ছবি">
          <div className="hero-art-halo" />
          <div className="hero-leaf leaf-one">✳</div><div className="hero-leaf leaf-two">✦</div>
          <div className="hero-art-card"><Image src="/bazar-hero.png" alt="তাজা বাজারের পণ্যে ভরা ঝুড়ি" width={315} height={263} priority /></div>
          <div className="floating-price floating-price-one"><span>🥬</span><div><strong>সবজির দাম</strong><small>প্রতিদিন হালনাগাদ</small></div><b>↗</b></div>
          <div className="floating-price floating-price-two"><span>🍚</span><div><strong>চাল ও ডাল</strong><small>একসঙ্গে তুলনা করুন</small></div><b>✓</b></div>
          <div className="hero-bottom-dots" aria-hidden>•••</div>
        </div>
      </section>

      <section className="container-width market-section" aria-labelledby="risers-heading">
        <div className="section-heading-row">
          <div><p className="section-kicker">PRICE MOVEMENT</p><h2 id="risers-heading"><span className="section-icon rise-icon"><TrendingUp size={20} /></span> আজ দাম বেড়েছে <span className="heading-arrow up">▲</span></h2><p className="section-subtitle">গত দিনের তুলনায় যেসব পণ্যের দাম বেড়েছে</p></div>
          <span className="section-count">শীর্ষ {new Intl.NumberFormat("bn-BD").format(risingProducts.length)}টি পণ্য</span>
        </div>
        <div className="product-grid movement-grid">{risingProducts.map((product) => <ProductCard product={product} key={product.id} />)}</div>
      </section>

      <section className="container-width market-section fallers-section" aria-labelledby="fallers-heading">
        <div className="section-heading-row">
          <div><p className="section-kicker">PRICE MOVEMENT</p><h2 id="fallers-heading"><span className="section-icon fall-icon"><TrendingDown size={20} /></span> আজ দাম কমেছে <span className="heading-arrow down">▼</span></h2><p className="section-subtitle">গত দিনের তুলনায় যেসব পণ্যের দাম কমেছে</p></div>
          <span className="section-count">শীর্ষ {new Intl.NumberFormat("bn-BD").format(fallingProducts.length)}টি পণ্য</span>
        </div>
        <div className="product-grid movement-grid">{fallingProducts.map((product) => <ProductCard product={product} key={product.id} />)}</div>
      </section>

      <section className="all-products-section" id="সব-পণ্য">
        <div className="container-width all-products-inner">
          <div className="section-heading-row all-products-heading">
            <div><p className="section-kicker">YOUR DAILY ESSENTIALS</p><h2><span className="section-icon all-icon">▦</span> সব পণ্য</h2><p className="section-subtitle">পছন্দের বিভাগ বেছে নিন, পণ্যের দাম দেখুন এবং সহজে তুলনা করুন।</p></div>
            <Link href="/category/chal" className="text-link">বিভাগ দেখুন <ArrowRight size={16} /></Link>
          </div>
          <ProductBrowser products={products} />
          <div className="browse-hint"><ArrowDown size={16} /> পণ্যের কার্ডে ক্লিক করে বিস্তারিত বাজারদর দেখুন</div>
        </div>
      </section>
    </main>
  );
}
