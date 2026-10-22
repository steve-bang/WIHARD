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

// FR-D07: same category or a shared solution, excluding the product itself.
export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        (p.category === product.category || p.solutions.some((s) => product.solutions.includes(s))),
    )
    .slice(0, limit);
}
