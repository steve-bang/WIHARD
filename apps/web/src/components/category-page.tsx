import type { Metadata } from "next";
import { Suspense } from "react";
import { Sparkles } from "lucide-react";
import { getCategory, type ProductCategory } from "@/lib/catalog";
import { CatalogHero } from "./catalog-hero";
import { TemplatesIllustration } from "./home-illustrations";
import { CategoryTabs } from "./category-tabs";
import { Container } from "./container";
import { TemplatesBrowser } from "./templates-browser";
import { WhyTemplates } from "./why-templates";

// Shared by /templates and /templates/{websites,apps,business-tools}
// (layout: docs/design/mockups/templates.png).

export function categoryMetadata(slug: ProductCategory): Metadata {
  const category = getCategory(slug);
  // Filtered/sorted URLs point search engines at the unfiltered listing.
  return { title: `${category.name} templates`, description: category.summary, alternates: { canonical: `/templates/${slug}` } };
}

export function TemplatesListingPage({
  searchParams,
  category,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  category?: ProductCategory;
}) {
  const basePath = category ? `/templates/${category}` : "/templates";
  return (
    <>
      <CatalogHero
        eyebrow={category ? getCategory(category).name : "Templates"}
        icon={Sparkles}
        title={
          category ? (
            <>{getCategory(category).name} templates</>
          ) : (
            <>
              Ready-to-use templates
              <br />
              for your next project
            </>
          )
        }
        text={
          category
            ? getCategory(category).summary
            : "Discover websites, web applications, and business tools built by creators and reviewed by WIHARD. Each one lists what you can customize, what it costs, and who supports it."
        }
        illustration={<TemplatesIllustration />}
      />
      <Container className="space-y-10 py-10">
        <CategoryTabs active={category} />
        <Suspense fallback={<TemplatesBrowser params={{}} basePath={basePath} fixedCategory={category} />}>
          {searchParams.then((params) => (
            <TemplatesBrowser params={params} basePath={basePath} fixedCategory={category} />
          ))}
        </Suspense>
        <WhyTemplates />
      </Container>
    </>
  );
}
