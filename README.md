# বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের সম্ভাব্য বাজারদর — এক নজরে। BazarDor is a responsive Bangla-first market price tracker built with the Next.js App Router. It helps users browse daily essentials by category, compare price movement, and view product details with market-by-market price comparisons.

## Features

1. Penpot-inspired responsive design — two-row category navigation, Bangla date, animated price ticker, green market-themed hero, product cards and footer.
2. Eight working category filters — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ এবং মসলা. The home page also includes an in-place category filter; category routes have their own list.
3. Price movement panels — displays the six largest price risers and six largest fallers when the data has enough positive/negative changes.
4. Numeric price sorting — default, low-to-high and high-to-low ordering use numeric values, not lexicographic string comparison. Prices render in Bengali digits.
5. Product detail pages — server-side login protection, current price, minimum/maximum/average summaries, and a market comparison table.
6. Better Auth authentication — email/password registration and login, optional Google/GitHub OAuth, protected routes, sign-out and toast messages.
7. Profile and update flow — view account details and update the profile name through Better Auth's `updateUser` client method.
8. Loading and error states— skeleton loaders, empty category message, a friendly 404 page and home navigation.
9. API resilience — tries the assignment's primary API, then the alternative. If both are unavailable or their response cannot be normalized, a local 33-item example dataset keeps the UI usable.
10. Deployment friendly — App Router dynamic detail pages work as server-rendered routes on Vercel; no custom rewrite rules are needed for refreshes.

## Technologies

- Next.js App Router + React + TypeScript
- Tailwind CSS and custom responsive CSS
- Better Auth + PostgreSQL (`pg` pool)
- `react-hot-toast` for user feedback
- Lucide React icons
- Assignment API: `https://api.api-store.workers.dev/api/bazardor`
- Alternative API: `https://api.abcz.workers.dev/api/bazardor`






