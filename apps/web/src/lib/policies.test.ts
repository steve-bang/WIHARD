import { describe, expect, it } from "vitest";
import { products } from "./catalog/data";
import { policies } from "./policies";

// The support policy promises a minimum support period; product pages must not contradict it.
describe("policies", () => {
  it("every one-time product offers at least the minimum support period", () => {
    for (const p of products.filter((p) => p.pricing.model === "one-time")) {
      const months = Number(p.support.duration.match(/(\d+)\s*months?/)?.[1]);
      expect(months, `${p.slug}: "${p.support.duration}"`).toBeGreaterThanOrEqual(policies.minimumSupportMonths);
    }
  });

  it("subscription products are supported for the whole subscription", () => {
    for (const p of products.filter((p) => p.pricing.model === "subscription")) {
      expect(p.support.duration, p.slug).toMatch(/subscription is active/i);
    }
  });

  it("every product covers security updates", () => {
    for (const p of products) expect(p.support.coverage, p.slug).toContain("Security updates");
  });
});
