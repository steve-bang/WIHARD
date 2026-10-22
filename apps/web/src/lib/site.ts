export const siteConfig = {
  name: "WIHARD",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  headline: "Build software for your work, without coding.",
  tagline: "Discover it. Make it yours. Put it to work.",
  description:
    "Find a product that fits your needs, customize it in plain language, and launch with a platform that helps you keep it running.",
};

export const mainNav = [
  { href: "/templates", label: "Templates" },
  { href: "/solutions", label: "Solutions" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/for-creators", label: "For creators" },
  { href: "/pricing", label: "Pricing" },
] as const;

export const footerNav = [
  {
    title: "Explore",
    links: [
      { href: "/templates/websites", label: "Websites" },
      { href: "/templates/apps", label: "Apps" },
      { href: "/templates/business-tools", label: "Business tools" },
      { href: "/solutions", label: "Solutions" },
    ],
  },
  {
    title: "Platform",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/pricing", label: "Pricing" },
      { href: "/security", label: "Security" },
      { href: "/support-policy", label: "Support policy" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/for-creators", label: "For creators" },
      { href: "/contact", label: "Contact" },
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
