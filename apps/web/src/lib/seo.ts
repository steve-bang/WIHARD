import type { Metadata } from "next";
import { siteConfig } from "./site";

// Every indexable page builds its metadata here so canonical URLs and Open Graph stay consistent.
// Setting openGraph here replaces the root segment's, and an explicit image also beats a route's own
// opengraph-image.tsx, so pages with their own image (products) pass it in `image`.
export function pageMetadata({
  title,
  description,
  path,
  image = { url: "/opengraph-image", alt: `${siteConfig.name} — ${siteConfig.headline}` },
}: {
  title: string | { absolute: string };
  description: string;
  path: string;
  image?: { url: string; alt: string };
}): Metadata {
  const ogTitle = typeof title === "string" ? `${title} · ${siteConfig.name}` : title.absolute;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [{ ...image, width: 1200, height: 630 }],
    },
  };
}

export const absoluteUrl = (path: string) => new URL(path, siteConfig.url).toString();

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
