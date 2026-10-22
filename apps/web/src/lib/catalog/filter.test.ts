import { describe, expect, it } from "vitest";
import { facetCount, filterProducts, paginate, parseFilters } from "./filter";

const slugs = (f: Parameters<typeof filterProducts>[0]) => filterProducts(f).map((p) => p.slug);

describe("filter", () => {
  it("parses repeated and single params, ignoring unknown sort values", () => {
    expect(parseFilters({ category: ["apps", "websites"], solution: "booking-management", sort: "bogus" })).toEqual({
      q: undefined,
      category: ["apps", "websites"],
      solution: ["booking-management"],
      price: [],
      support: [],
      sort: "recommended",
    });
  });

  it("ORs values within a facet and ANDs across facets", () => {
    expect(slugs({ category: ["apps", "websites"] })).toEqual(["garage-management-website", "booking-system"]);
    expect(slugs({ category: ["apps", "websites"], support: ["platform"] })).toEqual(["garage-management-website"]);
    expect(slugs({ q: "booking", category: ["apps"] })).toEqual(["booking-system"]);
  });

  it("sorts by price and recency", () => {
    expect(slugs({ sort: "price-asc" })[0]).toBe("customer-management-crm");
    expect(slugs({ sort: "price-desc" })[0]).toBe("garage-management-website");
    expect(slugs({ sort: "newest" })[0]).toBe("booking-system");
  });

  it("counts a facet option against the other active filters only", () => {
    const f = { category: ["websites" as const] };
    // Selecting "websites" must not hide the count for "apps".
    expect(facetCount(f, "category", "apps")).toBe(1);
    expect(facetCount(f, "support", "platform")).toBe(1);
    expect(facetCount(f, "support", "creator")).toBe(0);
  });

  it("paginates and clamps the page", () => {
    expect(paginate([1, 2, 3, 4, 5], 2, 2)).toEqual({ items: [3, 4], page: 2, pageCount: 3 });
    expect(paginate([1, 2, 3], 9, 2)).toEqual({ items: [3], page: 2, pageCount: 2 });
    expect(paginate([], 1, 2)).toEqual({ items: [], page: 1, pageCount: 1 });
  });
});
