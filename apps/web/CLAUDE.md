# apps/web — Public website

@AGENTS.md

Public, SEO-focused site: marketing pages, product discovery, product detail pages, public creator profiles, and lead/contact forms. Next.js 16 (App Router, `cacheComponents` on), TypeScript, Tailwind CSS v4, Lucide icons.

## Commands

Run from `apps/web` (or from the repo root with `pnpm --filter @wihard/web <script>`):

- `pnpm dev` — dev server on http://localhost:3000
- `pnpm build` / `pnpm start`
- `pnpm lint`
- `pnpm typecheck` — runs `next typegen` first so the global `PageProps`/`LayoutProps` helpers exist
- `pnpm test` — Vitest; single file: `pnpm vitest run src/lib/catalog/index.test.ts`, single test: add `-t "<name>"`

Set `NEXT_PUBLIC_SITE_URL` for production so canonical URLs, `sitemap.xml`, and `robots.txt` use the real domain.

## Structure

- `src/lib/catalog/` — product, creator, and solution sample data plus query functions. Every page reads data only through `src/lib/catalog/index.ts`, so swapping in `services/api` calls later changes one module. `types.ts` mirrors the detail-page requirements (FR-P01–P13) and will move to `packages/contracts`.
- `src/lib/site.ts` — site config, navigation, and the static route list used by `app/sitemap.ts`. Add new public routes there.
- Search (FR-D03) is a plain GET form to `/templates?q=`; the page reads `searchParams` inside `<Suspense>`, as Cache Components requires.
- `src/components/home-illustrations.tsx` and `product-preview.tsx` draw decorative mock-ups in HTML/SVG; the homepage layout follows `docs/design/mockups/home.png`.
- `src/lib/journey.ts` — the Discover/Customize/Deploy/Operate steps with an `available` flag; flip it as phases ship.
- `src/app/templates/[slug]` and `src/app/solutions/[slug]` — prerendered via `generateStaticParams`. With Cache Components, `dynamicParams` is unavailable; unknown slugs call `notFound()` (streamed with HTTP 200 + `noindex`).
- `src/app/templates/{websites,apps,business-tools}` — thin wrappers around `components/category-page.tsx`; static folders take precedence over `[slug]`.
- Design tokens (`brand-*`, `ink`, `muted`, `line`, `surface`) live in `src/app/globals.css` under `@theme`.

## Requirements owned

- Sitemap, copy, and product detail page sections: `docs/ba/PRODUCT_VISION.md` §1, §5.
- BRD (`docs/ba/BUSINESS_REQUIREMENTS.md`): FR-D01–D08 (discovery UI), FR-P01–P13 (detail page), creator profile pages (FR-C02 public view), FR-L01–L02 (forms), NFR-02–05 and NFR-10.
- Copy and transparency rules: BR-T01–T05. Phase 1 has no checkout and no working AI customization — "Make it yours" links to `/contact?product=<slug>`, and unbuilt steps are labelled "Coming later".
- Mapping of what the API vs. this app owns: `docs/architecture/ARCHITECTURE.md` §5.

## Not done yet

Interest/contact forms (FR-L01–L02, need `services/api`), filters, sorting and comparison (FR-D04–D06), public creator profile pages, sign-in (owned by `apps/dashboard`), newsletter signup, real screenshots (placeholders render when `screenshots[].src` is empty), analytics events (NFR-10).
