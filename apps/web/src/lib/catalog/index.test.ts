import { describe, expect, it } from "vitest";
import { products } from "./data";
import { getCreator, getProduct, getProducts, getRelatedProducts, getSolution } from "./index";

describe("catalog", () => {
  it("filters by category and solution", () => {
    expect(getProducts({ category: "websites" }).map((p) => p.slug)).toEqual(["garage-management-website"]);
    expect(getProducts({ solution: "booking-management" }).map((p) => p.slug)).toEqual([
      "garage-management-website",
      "booking-system",
    ]);
  });

  it("excludes the product itself from related products", () => {
    const crm = getProduct("customer-management-crm")!;
    const related = getRelatedProducts(crm);
    expect(related.map((p) => p.slug)).toEqual(["inventory-management"]);
  });

  it("has consistent sample data", () => {
    for (const p of products) {
      expect(getCreator(p.creatorSlug), `${p.slug} creator`).toBeDefined();
      for (const s of p.solutions) expect(getSolution(s), `${p.slug} solution ${s}`).toBeDefined();
      // BR-Q02: required fields for a publishable product.
      expect(p.screenshots.length).toBeGreaterThan(0);
      expect(p.pricing.included.length).toBeGreaterThan(0);
      expect(p.customization.allowed.length).toBeGreaterThan(0);
    }
    expect(new Set(products.map((p) => p.slug)).size).toBe(products.length);
  });
});
