import type { MetadataRoute } from "next";
import { getProducts, getSolutions } from "@/lib/catalog";
import { siteConfig, staticRoutes } from "@/lib/site";

const url = (path: string) => new URL(path, siteConfig.url).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((path) => ({ url: url(path) })),
    ...getSolutions().map((s) => ({ url: url(`/solutions/${s.slug}`) })),
    // A product page changes when a new version ships.
    ...getProducts().map((p) => ({ url: url(`/templates/${p.slug}`), lastModified: p.versions[0]?.date })),
  ];
}
