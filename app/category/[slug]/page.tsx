import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import CategoryListing from "@/components/category-listing";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  return { title: category ? `${category.name} এর বাজারদর` : "বিভাগ পাওয়া যায়নি" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const products = await getProductsByCategory(category.slug);

  return (
    <main className="page-main category-page">
      <div className="container-width">
        <div className="breadcrumbs"><Link href="/">হোম</Link><ChevronRight size={14} /><span>{category.name}</span></div>
        <section className="category-hero-card">
          <div className="category-hero-symbol">{category.emoji}</div>
          <div className="category-hero-copy"><p className="section-kicker">PRODUCT CATEGORY</p><h1>{category.name} এর বাজারদর</h1><p>{category.description}। দাম কম থেকে বেশি বা বেশি থেকে কম সাজিয়ে নিতে পারেন।</p></div>
          <Link href="/#সব-পণ্য" className="button button-outline category-back"><ArrowLeft size={16} /> সব বিভাগ</Link>
          <div className="category-decoration" aria-hidden>{category.emoji}</div>
        </section>
        <section className="category-products-section">
          <div className="section-heading-row category-list-title"><div><h2>সব {category.name} পণ্য</h2><p className="section-subtitle">আজকের সম্ভাব্য দাম ও দামের পরিবর্তন</p></div></div>
          <CategoryListing products={products} />
        </section>
      </div>
    </main>
  );
}
