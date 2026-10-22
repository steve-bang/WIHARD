// Sample-data model for Phase 1. Fields map to the product detail sections in
// docs/ba/BUSINESS_REQUIREMENTS.md (FR-P01–P13). Move to packages/contracts once
// services/api exists and serves this data.

export type ProductCategory = "websites" | "apps" | "business-tools";

// BRD §10.3 — only the publicly visible subset of the product lifecycle.
export type ProductStatus = "active" | "beta" | "deprecated";

export type SupportProvider = "platform" | "creator" | "platform-and-creator";

export interface Creator {
  slug: string;
  name: string;
  bio: string;
  skills: string[];
}

export interface PriceItem {
  label: string;
  amount: string;
  note?: string;
}

export interface ProductVersion {
  version: string;
  date: string;
  notes: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  solutions: string[];
  status: ProductStatus;
  tags: string[];
  screenshots: { src: string; alt: string }[];
  demoUrl?: string;
  features: { title: string; description: string }[];
  audience: string[];
  customization: {
    allowed: string[];
    notAllowed: string[];
  };
  deployment: string;
  pricing: {
    included: PriceItem[];
    // BR-T01: every cost that may come on top of the base price.
    possibleExtras: PriceItem[];
  };
  // BR-T04: who supports, what is covered, for how long.
  support: {
    provider: SupportProvider;
    coverage: string[];
    responseTime: string;
    duration: string;
  };
  maintenance: string;
  creatorSlug: string;
  versions: ProductVersion[];
  faq: Faq[];
}

export interface Solution {
  slug: string;
  name: string;
  summary: string;
  problems: string[];
}
