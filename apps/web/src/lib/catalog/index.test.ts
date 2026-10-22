import { describe, expect, it } from "vitest";
import { products } from "./data";
import { getCreator, getProduct, getProducts, getIndustry, getRelatedProducts, getSolution, searchProducts } from "./index";

describe("catalog", () => {
  it("filters by category and solution", () => {
    expect(getProducts({ category: "websites" }).every((p) => p.category === "websites")).toBe(true);
    expect(getProducts({ solution: "booking-management" }).map((p) => p.slug)).toEqual([
      "garage-management-website",
      "booking-system",
      "dinenow",
      "clinic-booking",
    ]);
  });

  it("searches across fields and requires every term", () => {
    expect(searchProducts("crm").map((p) => p.slug)).toEqual(["customer-management-crm"]);
    expect(searchProducts("Garage").map((p) => p.slug)).toEqual(["garage-management-website"]);
    // "booking" alone matches several products; adding "website" narrows to website-category ones.
    expect(searchProducts("booking website").every((p) => p.category === "websites")).toBe(true);
    expect(searchProducts("booking website").length).toBeLessThan(searchProducts("booking").length);
    expect(searchProducts("  ")).toHaveLength(products.length);
    expect(searchProducts("nothing-matches")).toEqual([]);
  });

  it("ranks close products first and excludes the product itself", () => {
    const crm = getProduct("customer-management-crm")!;
    const related = getRelatedProducts(crm);
    expect(related).toHaveLength(4);
    expect(related[0].slug).toBe("inventory-management");
    expect(related.some((p) => p.slug === crm.slug)).toBe(false);
    expect(getRelatedProducts(crm, 1)).toHaveLength(1);
  });

  it("has consistent sample data", () => {
    for (const p of products) {
      expect(getCreator(p.creatorSlug), `${p.slug} creator`).toBeDefined();
      for (const s of p.solutions) expect(getSolution(s), `${p.slug} solution ${s}`).toBeDefined();
      expect(getIndustry(p.industry), `${p.slug} industry`).toBeDefined();
      // BR-Q02: required fields for a publishable product.
      expect(p.screenshots.length).toBeGreaterThan(0);
      expect(p.pricing.included.length).toBeGreaterThan(0);
      expect(p.customization.allowed.length).toBeGreaterThan(0);
    }
    expect(new Set(products.map((p) => p.slug)).size).toBe(products.length);
  });
});
