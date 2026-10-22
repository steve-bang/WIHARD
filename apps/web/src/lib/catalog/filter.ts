import { products } from "./data";
import { getCategory, getIndustry, getSolution } from "./index";
import type { Industry, PriceModel, Product, ProductCategory, SupportProvider } from "./types";

// FR-D03–D05: search, filters, and sorting for the template listing.

export const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

export type SortOption = (typeof sortOptions)[number]["value"];

export interface ProductFilters {
  q?: string;
  category?: ProductCategory[];
  industry?: Industry[];
  solution?: string[];
  price?: PriceModel[];
  support?: SupportProvider[];
  sort?: SortOption;
}

type SearchParams = Record<string, string | string[] | undefined>;

const list = (v: string | string[] | undefined) => (v === undefined ? [] : Array.isArray(v) ? v : [v]).filter(Boolean);

export function parseFilters(params: SearchParams): ProductFilters {
  const sort = typeof params.sort === "string" ? params.sort : undefined;
  return {
    q: typeof params.q === "string" ? params.q.trim() : undefined,
    category: list(params.category) as ProductCategory[],
    industry: list(params.industry) as Industry[],
    solution: list(params.solution),
    price: list(params.price) as PriceModel[],
    support: list(params.support) as SupportProvider[],
    sort: sortOptions.some((o) => o.value === sort) ? (sort as SortOption) : "recommended",
  };
}

function matchesQuery(p: Product, query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = [
    p.name,
    p.tagline,
    p.description,
    ...p.features.flatMap((f) => [f.title, f.description]),
    ...p.tags,
    ...p.audience,
    getCategory(p.category).name,
    getIndustry(p.industry).name,
    ...p.solutions.map((s) => getSolution(s)?.name ?? ""),
  ]
    .join(" ")
    .toLowerCase();
  return terms.every((t) => haystack.includes(t));
}

const facets = {
  category: (p: Product, values: string[]) => values.includes(p.category),
  industry: (p: Product, values: string[]) => values.includes(p.industry),
  solution: (p: Product, values: string[]) => p.solutions.some((s) => values.includes(s)),
  price: (p: Product, values: string[]) => values.includes(p.pricing.model),
  support: (p: Product, values: string[]) => values.includes(p.support.provider),
};

export type Facet = keyof typeof facets;

// Values within a facet are OR-ed; facets are AND-ed. `except` skips one facet so counts can be computed for it.
function matches(p: Product, f: ProductFilters, except?: Facet) {
  if (!matchesQuery(p, f.q ?? "")) return false;
  return (Object.keys(facets) as Facet[]).every((key) => {
    const values = f[key] ?? [];
    return key === except || values.length === 0 || facets[key](p, values);
  });
}

const latest = (p: Product) => p.versions[0]?.date ?? "";

export function filterProducts(f: ProductFilters): Product[] {
  const result = products.filter((p) => matches(p, f));
  switch (f.sort) {
    case "newest":
      return result.sort((a, b) => latest(b).localeCompare(latest(a)));
    case "price-asc":
      return result.sort((a, b) => a.pricing.startingPrice - b.pricing.startingPrice);
    case "price-desc":
      return result.sort((a, b) => b.pricing.startingPrice - a.pricing.startingPrice);
    default:
      return result;
  }
}

// How many products each option would show, given the other active filters.
export function facetCount(f: ProductFilters, facet: Facet, value: string): number {
  return products.filter((p) => matches(p, f, facet) && facets[facet](p, [value])).length;
}

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(Math.max(1, page), pageCount);
  return { items: items.slice((current - 1) * pageSize, current * pageSize), page: current, pageCount };
}
