import type { Metadata } from "next";
import { CategoryNav } from "@/components/category-nav";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import { ProductGrid } from "@/components/product-card";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Templates",
  description: "Websites, apps, and business tools you can start from.",
};

export default function TemplatesPage() {
  return (
    <>
      <PageIntro eyebrow="Templates" title="Find a product that fits your work">
        Start from a working website, app, or business tool. Every product lists what you can customize, what it
        costs, and who supports it.
      </PageIntro>
      <Container className="py-12">
        <CategoryNav />
        <ProductGrid products={getProducts()} />
      </Container>
    </>
  );
}
