import { creators, products, solutions } from "./data";
import type { Product, ProductCategory } from "./types";

export type * from "./types";

export const categories: { slug: ProductCategory; name: string; summary: string }[] = [
  { slug: "websites", name: "Websites", summary: "Websites for businesses, professionals, and services." },
  { slug: "apps", name: "Apps", summary: "Web applications and software tools." },
  { slug: "business-tools", name: "Business tools", summary: "Tools to manage customers, operations, and teams." },
];

export function getProducts(filter: { category?: ProductCategory; solution?: string } = {}): Product[] {
  return products.filter(
    (p) =>
      (!filter.category || p.category === filter.category) &&
      (!filter.solution || p.solutions.includes(filter.solution)),
  );
}

// FR-D03: keyword search over name, description, features, category, and solutions.
export function searchProducts(query: string): Product[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return products;
  return products.filter((p) => {
    const haystack = [
      p.name,
      p.tagline,
      p.description,
      ...p.features.flatMap((f) => [f.title, f.description]),
      ...p.tags,
      ...p.audience,
      getCategory(p.category).name,
      ...p.solutions.map((s) => getSolution(s)?.name ?? ""),
    ]
      .join(" ")
      .toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: ProductCategory) {
  return categories.find((c) => c.slug === slug)!;
}

export function getCreator(slug: string) {
  return creators.find((c) => c.slug === slug);
}

export function getSolutions() {
  return solutions;
}

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}

// FR-D07: products sharing the category or a solution first, then the rest of the catalog.
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const others = products.filter((p) => p.slug !== product.slug);
  const isClose = (p: Product) =>
    p.category === product.category || p.solutions.some((s) => product.solutions.includes(s));
  return [...others.filter(isClose), ...others.filter((p) => !isClose(p))].slice(0, limit);
}
