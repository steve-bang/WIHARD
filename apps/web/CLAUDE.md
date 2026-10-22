# apps/web — Public website

Public, SEO-focused site: marketing pages, product discovery, product detail pages, public creator profiles, and lead/contact forms. Not yet scaffolded.

## Requirements owned

- Sitemap, copy, and product detail page sections: `docs/ba/PRODUCT_VISION.md` §1, §5.
- BRD (`docs/ba/BUSINESS_REQUIREMENTS.md`): FR-D01–D08 (discovery UI), FR-P01–P13 (detail page), creator profile pages (FR-C02 public view), FR-L01–L02 (forms), NFR-02–05 and NFR-10.
- Copy and transparency rules: BR-T01–T05.
- Mapping of what the API vs. this app owns: `docs/architecture/ARCHITECTURE.md` §5.

## Notes

- Stack: Next.js App Router, TypeScript, Tailwind CSS, Lucide icons. Render catalog and detail pages server-side or statically for SEO; every page needs its own metadata.
- Reads only published data through `services/api`; never talks to the database.
- In Phase 1, the "Make it yours" CTA leads to the interest/lead form — there is no checkout.
- Visual references: `docs/design/mockups/`.
