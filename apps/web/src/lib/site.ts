export const siteConfig = {
  name: "WIHARD",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  headline: "Build software for your work, without coding.",
  copyrightYear: 2026,
  tagline: "Discover it. Make it yours. Put it to work.",
  description:
    "Find a product that fits your needs, customize it in plain language, and launch with a platform that helps you keep it running.",
};

export const mainNav = [
  { href: "/templates", label: "Templates" },
  { href: "/solutions", label: "Solutions" },
  { href: "/for-creators", label: "For Creators" },
  { href: "/pricing", label: "Pricing" },
] as const;

export const resourcesNav = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/support-policy", label: "Support policy" },
  { href: "/security", label: "Security" },
  { href: "/about", label: "About" },
] as const;

export const footerNav = [
  {
    title: "Product",
    links: [
      { href: "/templates", label: "Templates" },
      { href: "/solutions", label: "Solutions" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/support-policy", label: "Support policy" },
      { href: "/for-creators", label: "For creators" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/security", label: "Security" },
    ],
  },
] as const;

// Static public routes from docs/ba/PRODUCT_VISION.md §5, used by sitemap.ts.
export const staticRoutes = [
  "/",
  "/how-it-works",
  "/templates",
  "/templates/websites",
  "/templates/apps",
  "/templates/business-tools",
  "/solutions",
  "/for-creators",
  "/pricing",
  "/security",
  "/support-policy",
  "/about",
  "/contact",
];
