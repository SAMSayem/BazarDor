# বাজার দর (BazarDor)

**বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের সম্ভাব্য বাজারদর — এক নজরে।** BazarDor is a responsive Bangla-first market price tracker built with the Next.js App Router. It helps users browse daily essentials by category, compare price movement, and view product details with market-by-market price comparisons.

## Features

1. **Penpot-inspired responsive design** — two-row category navigation, Bangla date, animated price ticker, green market-themed hero, product cards and footer.
2. **Eight working category filters** — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ এবং মসলা. The home page also includes an in-place category filter; category routes have their own list.
3. **Price movement panels** — displays the six largest price risers and six largest fallers when the data has enough positive/negative changes.
4. **Numeric price sorting** — default, low-to-high and high-to-low ordering use numeric values, not lexicographic string comparison. Prices render in Bengali digits.
5. **Product detail pages** — server-side login protection, current price, minimum/maximum/average summaries, and a market comparison table.
6. **Better Auth authentication** — email/password registration and login, optional Google/GitHub OAuth, protected routes, sign-out and toast messages.
7. **Profile and update flow** — view account details and update the profile name through Better Auth's `updateUser` client method.
8. **Loading and error states** — skeleton loaders, empty category message, a friendly 404 page and home navigation.
9. **API resilience** — tries the assignment's primary API, then the alternative. If both are unavailable or their response cannot be normalized, a local 33-item example dataset keeps the UI usable.
10. **Deployment friendly** — App Router dynamic detail pages work as server-rendered routes on Vercel; no custom rewrite rules are needed for refreshes.

## Technologies

- Next.js App Router + React + TypeScript
- Tailwind CSS and custom responsive CSS
- Better Auth + PostgreSQL (`pg` pool)
- `react-hot-toast` for user feedback
- Lucide React icons
- Assignment API: `https://api.api-store.workers.dev/api/bazardor`
- Alternative API: `https://api.abcz.workers.dev/api/bazardor`

## Requirements

- Node.js 20.9 or later
- npm
- A PostgreSQL database (Neon is convenient for Vercel deployment)
- Google and/or GitHub OAuth credentials if you want social sign-in enabled

## Run locally

1. Download/extract this project and open a terminal in its root directory.
2. Install packages:

   ```bash
   npm install
   ```

3. Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

4. Edit `.env.local` and set your own `DATABASE_URL` and a random Better Auth secret. Generate a secret with:

   ```bash
   openssl rand -base64 32
   ```

   Do not paste real credentials into source code or commit `.env.local`.

5. Create Better Auth's PostgreSQL tables:

   ```bash
   npm run db:migrate
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000).

If you don't have a database or OAuth credentials yet, public product browsing can still run using the local data fallback. Authentication and protected pages require a correctly configured database. Google/GitHub buttons require the matching provider credentials.

## Authentication setup

### Email and password

Email/password auth is enabled in `lib/auth.ts`. Email verification and password-reset flows are intentionally not configured for this assignment brief.

### Google OAuth

1. Create a Google OAuth client in the Google Cloud Console.
2. Add the local callback URL `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs.
3. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.local`.

### GitHub OAuth

1. Create a GitHub OAuth App.
2. Set its callback URL to `http://localhost:3000/api/auth/callback/github`.
3. Set `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` in `.env.local`.

For deployment, create production OAuth credentials or add the deployed callback URLs as well. Set `BETTER_AUTH_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL` to your deployed origin (for example, `https://your-project.vercel.app`).

## Data API

The app calls:

- `GET /products`
- `GET /products?category=chal` (and the other category slugs)
- `GET /products/:id` when the requested product is not in the current collection
- The `/categories` endpoints are described in the assignment API brief; the UI uses a fixed category map so the navigation still works if that endpoint is offline.

API fields can differ, so `lib/products.ts` normalizes common forms (`name`/`title`, `category`/`categoryName`, `price`/`currentPrice`, etc.). The included 33 products are example prices based on the Penpot assignment sample, not an official live price feed. The five market rows are illustrative when the API doesn't supply market-level data; the detail page labels the comparison as potential/sample data.

## Routes

| Route | Purpose | Access |
|---|---|---|
| `/` | Hero, risers/fallers, searchable and filterable all-products grid | Public |
| `/category/chal` | Category product list with sorting | Public |
| `/category/dal` | Category product list with sorting | Public |
| `/category/tel` | Category product list with sorting | Public |
| `/category/sobji` | Category product list with sorting | Public |
| `/category/mach` | Category product list with sorting | Public |
| `/category/mangsho` | Category product list with sorting | Public |
| `/category/dim-dudh` | Category product list with sorting | Public |
| `/category/mosla` | Category product list with sorting | Public |
| `/product/[slug]` | Price summary and market comparison | Sign-in required |
| `/signin` | Email/password and social sign-in | Public |
| `/signup` | Registration | Public |
| `/profile` | Account summary | Sign-in required |
| `/profile/update` | Update profile name | Sign-in required |

## Quality checks

Run these before submitting:

```bash
npm run typecheck
npm run lint
npm run build
```

## Deploy to Vercel

1. Push the source to a Git repository and import it into Vercel.
2. Add the environment variables from `.env.example` in Vercel's project settings. Use production database and OAuth values, not local placeholders.
3. Run `npm run db:migrate` once against the production database, or run the migration command from a trusted local shell with the production `DATABASE_URL` set.
4. Deploy. Check the home, category, product detail, sign-in, sign-up and profile routes after deployment.

## Safety note about credentials

Only `.env.example` is included. Real secrets belong in `.env.local` (ignored by Git) or deployment environment settings. If OAuth/database credentials were shared in a public chat or committed repository, rotate them before using the app in production.
