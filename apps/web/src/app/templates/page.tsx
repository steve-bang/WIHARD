import type { Metadata } from "next";
import { Suspense } from "react";
import { CategoryNav } from "@/components/category-nav";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import { ProductGrid } from "@/components/product-card";
import { SearchForm } from "@/components/search-form";
import { getProducts, searchProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Templates",
  description: "Websites, apps, and business tools you can start from.",
};

export default function TemplatesPage({ searchParams }: PageProps<"/templates">) {
  return (
    <>
      <PageIntro eyebrow="Templates" title="Find a product that fits your work">
        Start from a working website, app, or business tool. Every product lists what you can customize, what it
        costs, and who supports it.
      </PageIntro>
      <Container className="py-12">
        <CategoryNav />
        <Suspense fallback={<Results products={getProducts()} />}>
          {searchParams.then(({ q }) => {
            const query = typeof q === "string" ? q.trim() : "";
            return <Results query={query} products={searchProducts(query)} />;
          })}
        </Suspense>
      </Container>
    </>
  );
}

function Results({ query, products }: { query?: string; products: ReturnType<typeof getProducts> }) {
  return (
    <>
      <SearchForm defaultValue={query} className="mb-8 max-w-xl" />
      {query && (
        <p className="mb-6 text-sm text-muted">
          {products.length} result{products.length === 1 ? "" : "s"} for “{query}”
        </p>
      )}
      <ProductGrid products={products} />
    </>
  );
}
