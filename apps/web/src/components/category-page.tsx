import type { Metadata } from "next";
import { CategoryNav } from "./category-nav";
import { Container } from "./container";
import { PageIntro } from "./page-intro";
import { ProductGrid } from "./product-card";
import { getCategory, getProducts, type ProductCategory } from "@/lib/catalog";

export function categoryMetadata(slug: ProductCategory): Metadata {
  const category = getCategory(slug);
  return { title: `${category.name} templates`, description: category.summary };
}

export function CategoryPage({ slug }: { slug: ProductCategory }) {
  const category = getCategory(slug);
  return (
    <>
      <PageIntro eyebrow="Templates" title={category.name}>
        {category.summary}
      </PageIntro>
      <Container className="py-12">
        <CategoryNav active={slug} />
        <ProductGrid products={getProducts({ category: slug })} />
      </Container>
    </>
  );
}
