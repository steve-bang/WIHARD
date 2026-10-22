import { describe, expect, it } from "vitest";
import { products } from "./data";
import { facetCount, filterProducts, paginate, parseFilters } from "./filter";

const slugs = (f: Parameters<typeof filterProducts>[0]) => filterProducts(f).map((p) => p.slug);

describe("filter", () => {
  it("parses repeated and single params, ignoring unknown sort values", () => {
    expect(parseFilters({ category: ["apps", "websites"], industry: "healthcare", sort: "bogus" })).toEqual({
      q: undefined,
      category: ["apps", "websites"],
      industry: ["healthcare"],
      solution: [],
      price: [],
      support: [],
      sort: "recommended",
    });
  });

  it("ORs values within a facet and ANDs across facets", () => {
    const appsOrWebsites = slugs({ category: ["apps", "websites"] });
    expect(appsOrWebsites).toHaveLength(products.filter((p) => p.category !== "business-tools").length);
    expect(slugs({ category: ["apps"], industry: ["healthcare", "education"] })).toEqual(["clinic-booking", "learnhub"]);
    expect(slugs({ price: ["subscription"], support: ["creator"] })).toEqual(["taskflow", "learnhub"]);
    expect(slugs({ q: "booking", category: ["apps"] })).toEqual(["booking-system", "clinic-booking"]);
  });

  it("sorts by price and recency", () => {
    const prices = filterProducts({ sort: "price-asc" }).map((p) => p.pricing.startingPrice);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
    expect(slugs({ sort: "price-desc" })[0]).toBe("shoply");
    expect(slugs({ sort: "newest" })[0]).toBe("clinic-booking");
  });

  it("counts a facet option against the other active filters only", () => {
    const f = { category: ["websites" as const] };
    // Selecting "websites" must not hide the count for "apps".
    expect(facetCount(f, "category", "apps")).toBe(products.filter((p) => p.category === "apps").length);
    expect(facetCount(f, "industry", "food-beverage")).toBe(1);
    expect(facetCount(f, "industry", "healthcare")).toBe(0);
  });

  it("paginates and clamps the page", () => {
    expect(paginate([1, 2, 3, 4, 5], 2, 2)).toEqual({ items: [3, 4], page: 2, pageCount: 3 });
    expect(paginate([1, 2, 3], 9, 2)).toEqual({ items: [3], page: 2, pageCount: 2 });
    expect(paginate([], 1, 2)).toEqual({ items: [], page: 1, pageCount: 1 });
  });
});
