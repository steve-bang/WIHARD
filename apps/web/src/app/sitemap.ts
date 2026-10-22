import type { MetadataRoute } from "next";
import { getProducts, getSolutions } from "@/lib/catalog";
import { siteConfig, staticRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticRoutes,
    ...getSolutions().map((s) => `/solutions/${s.slug}`),
    ...getProducts().map((p) => `/templates/${p.slug}`),
  ];
  return paths.map((path) => ({ url: new URL(path, siteConfig.url).toString() }));
}
