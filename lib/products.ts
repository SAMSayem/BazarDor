import { cache } from "react";
import { CATEGORIES, normalizeCategory, type CategorySlug } from "@/lib/categories";

export type MarketPrice = { market: string; price: number };
export type Product = {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  categoryName: string;
  emoji: string;
  unit: string;
  price: number;
  change: number;
  description: string;
  marketPrices: MarketPrice[];
};

const marketNames = ["কারওয়ান বাজার", "শ্যামবাজার", "মিরপুর বাজার", "নিউ মার্কেট", "চট্টগ্রাম বাজার"];
function marketsFor(price: number, nameSeed: number): MarketPrice[] {
  const ratios = [1, 0.97, 1.04, 1.02, 1.06];
  return marketNames.map((market, index) => ({
    market,
    price: Math.max(1, Math.round(price * ratios[(index + nameSeed) % ratios.length])),
  }));
}

const seed: Array<[string, CategorySlug, string, string, number, number]> = [
  ["স্বর্ণমাছি চাল", "chal", "🍚", "প্রতি কেজি", 148, 2.1],
  ["মিনিকেট চাল", "chal", "🍚", "প্রতি কেজি", 99, -2.9],
  ["বাটাম সাইজ চাল", "chal", "🍚", "প্রতি কেজি", 66, 3.1],
  ["নাজির চাল", "chal", "🍚", "প্রতি কেজি", 74, 0],
  ["মসুর ডাল", "dal", "🫘", "প্রতি কেজি", 142, 2.9],
  ["মুগ ডাল", "dal", "🫘", "প্রতি কেজি", 135, 0],
  ["ছোলা", "dal", "🫘", "প্রতি কেজি", 120, -2.4],
  ["আমন ডাল (খোসাসিলা)", "dal", "🫘", "প্রতি কেজি", 156, 2.6],
  ["সরিষার তেল", "tel", "🫙", "প্রতি লিটার", 192, 2.1],
  ["পাম তেল", "tel", "🛢️", "প্রতি লিটার", 168, -2.3],
  ["ঘানি ভাঙা সরিষার তেল", "tel", "🫙", "প্রতি লিটার", 215, 2.4],
  ["আলু", "sobji", "🥔", "প্রতি কেজি", 30, -6.2],
  ["পেঁয়াজ", "sobji", "🧅", "প্রতি কেজি", 54, 12.5],
  ["কাঁচামরিচ", "sobji", "🌶️", "প্রতি কেজি", 92, -12.4],
  ["বেগুন", "sobji", "🍆", "প্রতি কেজি", 44, 4.8],
  ["ঢেঁড়স", "sobji", "🟢", "প্রতি কেজি", 38, 0],
  ["আদা", "sobji", "🫚", "প্রতি কেজি", 85, 9],
  ["রসুন", "sobji", "🧄", "প্রতি কেজি", 125, -7.4],
  ["রুই মাছ", "mach", "🐟", "প্রতি কেজি", 46, 4.5],
  ["ইলিশ মাছ", "mach", "🐠", "প্রতি কেজি", 1850, 3.4],
  ["কাতলা মাছ", "mach", "🐠", "প্রতি কেজি", 43, -4.4],
  ["তেলাপিয়া", "mach", "🐟", "প্রতি কেজি", 36, 0],
  ["চিংড়ি মাছ (খোলা)", "mach", "🦐", "প্রতি কেজি", 330, 3.1],
  ["মুরগির মাংস", "mangsho", "🍗", "প্রতি কেজি", 225, -1.3],
  ["গরুর মাংস", "mangsho", "🥩", "প্রতি কেজি", 790, -1.2],
  ["খাসির মাংস", "mangsho", "🍖", "প্রতি কেজি", 1290, -3],
  ["হাঁসের মাংস", "mangsho", "🦆", "প্রতি কেজি", 285, -3.4],
  ["ডিম", "dim-dudh", "🥚", "প্রতি ডজন", 158, 3.9],
  ["দুধ", "dim-dudh", "🥛", "প্রতি লিটার", 102, 2],
  ["দই", "dim-dudh", "🥣", "প্রতি লিটার", 92, 0],
  ["মাখন (১০০ গ্রাম)", "dim-dudh", "🧈", "প্রতি পিস", 145, 3.6],
  ["মরিচ গুঁড়া", "mosla", "🌶️", "প্রতি কেজি", 245, -2],
  ["ধনেপাতা গুঁড়া", "mosla", "🍃", "প্রতি কেজি", 265, 0],
];

function makeSeedProducts(): Product[] {
  return seed.map(([name, category, emoji, unit, price, change], index) => {
    const categoryName = CATEGORIES.find((item) => item.slug === category)?.name ?? "অন্যান্য";
    return {
      id: String(index + 1),
      slug: `product-${index + 1}`,
      name,
      category,
      categoryName,
      emoji,
      unit,
      price,
      change,
      description: `${name} এর আজকের সম্ভাব্য বাজারদর। বাজারভেদে দাম কিছুটা কম-বেশি হতে পারে।`,
      marketPrices: marketsFor(price, index),
    };
  });
}

export const FALLBACK_PRODUCTS: Product[] = makeSeedProducts();

function toEnglishDigits(value: string): string {
  const bengali = "০১২৩৪৫৬৭৮৯";
  return value.replace(/[০-৯]/g, (digit) => String(bengali.indexOf(digit)));
}

function numberFrom(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const normalized = toEnglishDigits(value).replaceAll(",", "").replace(/[−–]/g, "-");
    const match = normalized.match(/-?\d+(?:\.\d+)?/);
    if (match) return Number(match[0]);
  }
  if (value && typeof value === "object") {
    const objectValue = value as Record<string, unknown>;
    const nested = objectValue.value ?? objectValue.price ?? objectValue.amount ?? objectValue.current ?? objectValue.currentPrice ?? objectValue.percentage;
    if (nested !== undefined && nested !== value) return numberFrom(nested, fallback);
  }
  return fallback;
}

function changeFrom(value: unknown, directionValue: unknown, fallback = 0): number {
  const magnitude = numberFrom(value, fallback);
  const direction = `${typeof value === "string" ? value : ""} ${typeof directionValue === "string" ? directionValue : ""}`.toLocaleLowerCase("en");
  if (/down|decreas|fall|drop|lower|কমেছে|কমে|নেমেছে|▼/.test(direction)) return -Math.abs(magnitude);
  if (/up|increas|ris|higher|বেড়েছে|বাড়|বেড়ে|▲/.test(direction)) return Math.abs(magnitude);
  return magnitude;
}

function firstString(...values: unknown[]): string | undefined {
  return values.find((value): value is string => typeof value === "string" && value.trim().length > 0)?.trim();
}

function normalizeMarketPrices(value: unknown, fallbackPrice: number, seedIndex: number): MarketPrice[] {
  if (Array.isArray(value)) {
    const parsed = value.map((item) => {
      if (typeof item === "number" || typeof item === "string") {
        return { market: "স্থানীয় বাজার", price: numberFrom(item, fallbackPrice) };
      }
      if (item && typeof item === "object") {
        const obj = item as Record<string, unknown>;
        return {
          market: firstString(obj.market, obj.bazar, obj.bazaar, obj.name, obj.marketName) ?? "স্থানীয় বাজার",
          price: numberFrom(obj.price ?? obj.currentPrice ?? obj.todayPrice ?? obj.amount, fallbackPrice),
        };
      }
      return null;
    }).filter((item): item is MarketPrice => Boolean(item && item.price > 0));
    if (parsed.length) return parsed;
  }
  return marketsFor(fallbackPrice, seedIndex);
}

function normalizeOne(raw: unknown, index: number): Product | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  const rawCategory = obj.category ?? obj.categorySlug ?? obj.categoryName ?? obj.type;
  const category = normalizeCategory(rawCategory);
  const name = firstString(obj.name, obj.title, obj.productName, obj.product_name, obj.label);
  if (!name || !category) return null;
  const id = String(obj.id ?? obj._id ?? obj.productId ?? index + 1);
  const slug = firstString(obj.slug, obj.seoSlug, obj.urlSlug) ?? id;
  const meta = CATEGORIES.find((item) => item.slug === category)!;
  const price = numberFrom(obj.price ?? obj.currentPrice ?? obj.current_price ?? obj.todayPrice ?? obj.today_price ?? obj.amount ?? obj.rate, 0);
  const changeValue = obj.changePercent ?? obj.change_percentage ?? obj.percentageChange ?? obj.priceChange ?? obj.price_change ?? obj.change ?? obj.trendPercent ?? 0;
  const change = changeFrom(changeValue, obj.changeDirection ?? obj.direction ?? obj.trend ?? obj.changeType, 0);
  const unitRaw = firstString(obj.unit, obj.measurement, obj.priceUnit, obj.unitName, obj.unit_name);
  const unitKey = unitRaw?.trim().toLocaleLowerCase("en");
  const unitAliases: Record<string, string> = {
    kg: "প্রতি কেজি", kgs: "প্রতি কেজি", kilo: "প্রতি কেজি", kilogram: "প্রতি কেজি", kilograms: "প্রতি কেজি",
    g: "প্রতি গ্রাম", gram: "প্রতি গ্রাম", grams: "প্রতি গ্রাম",
    l: "প্রতি লিটার", liter: "প্রতি লিটার", litre: "প্রতি লিটার", liters: "প্রতি লিটার", litres: "প্রতি লিটার",
    dozen: "প্রতি ডজন", dz: "প্রতি ডজন", piece: "প্রতি পিস", pieces: "প্রতি পিস", pcs: "প্রতি পিস", pc: "প্রতি পিস",
  };
  const unit = unitRaw
    ? (unitRaw.startsWith("প্রতি") ? unitRaw : unitAliases[unitKey!] ?? `প্রতি ${unitRaw}`)
    : "প্রতি কেজি";
  const emoji = firstString(obj.emoji, obj.icon, obj.symbol) ?? meta.emoji;
  return {
    id,
    slug,
    name,
    category,
    categoryName: meta.name,
    emoji,
    unit,
    price,
    change,
    description: firstString(obj.description, obj.details, obj.summary) ?? `${name} এর আজকের সম্ভাব্য বাজারদর। বাজারভেদে দাম পরিবর্তিত হতে পারে।`,
    marketPrices: normalizeMarketPrices(obj.marketPrices ?? obj.markets ?? obj.bazarPrices ?? obj.market_prices, price, index),
  };
}

function unpackProducts(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    if (Array.isArray(obj.products)) return obj.products;
    if (Array.isArray(obj.data)) return obj.data;
    if (Array.isArray(obj.items)) return obj.items;
    if (Array.isArray(obj.result)) return obj.result;
    if (Array.isArray(obj.records)) return obj.records;
    if (obj.data && typeof obj.data === "object") {
      const nested = obj.data as Record<string, unknown>;
      if (Array.isArray(nested.products)) return nested.products;
      if (Array.isArray(nested.items)) return nested.items;
      if (Array.isArray(nested.result)) return nested.result;
    }
  }
  return [];
}

async function fetchJson(url: string): Promise<unknown | null> {
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(2200),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

function apiBases(): string[] {
  return [
    process.env.BAZARDOR_API_URL || "https://api.api-store.workers.dev/api/bazardor",
    process.env.BAZARDOR_API_FALLBACK || "https://api.abcz.workers.dev/api/bazardor",
  ].map((base) => base.replace(/\/$/, ""));
}

function normalizeCollection(payload: unknown): Product[] {
  return unpackProducts(payload).map(normalizeOne).filter((product): product is Product => Boolean(product && product.price >= 0));
}

export const getProducts = cache(async (): Promise<Product[]> => {
  const [primary, fallback] = apiBases();
  const [primaryData, fallbackData] = await Promise.all([fetchJson(`${primary}/products`), fetchJson(`${fallback}/products`)]);
  const primaryItems = normalizeCollection(primaryData);
  if (primaryItems.length) return primaryItems;
  const fallbackItems = normalizeCollection(fallbackData);
  return fallbackItems.length ? fallbackItems : FALLBACK_PRODUCTS;
});

export const getProductsByCategory = cache(async (category: CategorySlug): Promise<Product[]> => {
  const [primary, fallback] = apiBases();
  const [primaryData, fallbackData] = await Promise.all([
    fetchJson(`${primary}/products?category=${encodeURIComponent(category)}`),
    fetchJson(`${fallback}/products?category=${encodeURIComponent(category)}`),
  ]);
  const primaryItems = normalizeCollection(primaryData);
  if (primaryItems.length) return primaryItems.filter((product) => product.category === category);
  const fallbackItems = normalizeCollection(fallbackData);
  if (fallbackItems.length) return fallbackItems.filter((product) => product.category === category);
  return (await getProducts()).filter((product) => product.category === category);
});

export const getProductBySlug = cache(async (slug: string): Promise<Product | undefined> => {
  const allProducts = await getProducts();
  const localMatch = allProducts.find((product) => product.slug === slug || product.id === slug || `product-${product.id}` === slug);
  if (localMatch) return localMatch;
  const bases = apiBases();
  const payloads = await Promise.all(bases.map((base) => fetchJson(`${base}/products/${encodeURIComponent(slug)}`)));
  for (const payload of payloads) {
    let body: unknown = payload;
    if (payload && typeof payload === "object") {
      const wrapped = payload as Record<string, unknown>;
      body = wrapped.data ?? wrapped.product ?? payload;
    }
    const candidate = normalizeOne(body, 0);
    if (candidate) return candidate;
  }
  return undefined;
});

export function formatBengaliNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}

export function formatTaka(value: number): string {
  return `${formatBengaliNumber(value)} টাকা`;
}

export function trendLabel(change: number): string {
  if (change > 0) return `▲ ${formatBengaliNumber(change, 1)}%`;
  if (change < 0) return `▼ ${formatBengaliNumber(Math.abs(change), 1)}%`;
  return "— ০.০%";
}
