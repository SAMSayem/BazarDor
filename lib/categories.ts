export type CategorySlug =
  | "chal"
  | "dal"
  | "tel"
  | "sobji"
  | "mach"
  | "mangsho"
  | "dim-dudh"
  | "mosla";

export type CategoryMeta = {
  slug: CategorySlug;
  name: string;
  emoji: string;
  description: string;
};

export const CATEGORIES: CategoryMeta[] = [
  { slug: "chal", name: "চাল", emoji: "🍚", description: "দেশি ও জনপ্রিয় সব ধরনের চালের বাজারদর" },
  { slug: "dal", name: "ডাল", emoji: "🫘", description: "প্রতিদিনের ডাল ও ডালজাতীয় পণ্যের দাম" },
  { slug: "tel", name: "তেল", emoji: "🛢️", description: "রান্নার তেল ও ভোজ্য তেলের বাজারদর" },
  { slug: "sobji", name: "সবজি", emoji: "🥬", description: "তাজা সবজি ও নিত্যপ্রয়োজনীয় কৃষিপণ্যের দাম" },
  { slug: "mach", name: "মাছ", emoji: "🐟", description: "দেশি-বিদেশি মাছের দৈনিক বাজারদর" },
  { slug: "mangsho", name: "মাংস", emoji: "🍗", description: "মুরগি, গরু, খাসি ও অন্যান্য মাংসের দাম" },
  { slug: "dim-dudh", name: "ডিম-দুধ", emoji: "🥛", description: "ডিম, দুধ ও দুগ্ধজাত পণ্যের দাম" },
  { slug: "mosla", name: "মসলা", emoji: "🌶️", description: "রান্নার মসলা ও গুঁড়া মসলার বাজারদর" },
];

const ALIASES: Record<string, CategorySlug> = {
  chal: "chal", rice: "chal", চাল: "chal",
  dal: "dal", lentil: "dal", pulses: "dal", ডাল: "dal",
  tel: "tel", oil: "tel", তেল: "tel",
  sobji: "sobji", vegetable: "sobji", vegetables: "sobji", সবজি: "sobji",
  mach: "mach", fish: "mach", মাছ: "mach",
  mangsho: "mangsho", meat: "mangsho", chicken: "mangsho", মাংস: "mangsho",
  "dim-dudh": "dim-dudh", egg: "dim-dudh", eggs: "dim-dudh", milk: "dim-dudh", dairy: "dim-dudh", "ডিম-দুধ": "dim-dudh", "ডিম ও দুধ": "dim-dudh", "eggs-milk": "dim-dudh",
  mosla: "mosla", spice: "mosla", spices: "mosla", মসলা: "mosla",
};

export function normalizeCategory(value: unknown): CategorySlug | undefined {
  let candidate = value;
  if (candidate && typeof candidate === "object") {
    const obj = candidate as Record<string, unknown>;
    candidate = obj.slug ?? obj.key ?? obj.name ?? obj.title ?? obj.category;
  }
  if (typeof candidate !== "string") return undefined;
  const key = candidate.trim().toLocaleLowerCase("en").replaceAll("_", "-").replaceAll(" ", "-");
  return ALIASES[key] ?? ALIASES[key.replaceAll("-", "")] ?? ALIASES[candidate.trim()];
}

export function getCategory(slug: string): CategoryMeta | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}
