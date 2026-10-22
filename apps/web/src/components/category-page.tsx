import type { Metadata } from "next";
import { Suspense } from "react";
import { Sparkles } from "lucide-react";
import { getCategory, type ProductCategory } from "@/lib/catalog";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "./json-ld";
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
  // The canonical points filtered/sorted URLs at the unfiltered listing.
  return pageMetadata({
    title: `${category.name} templates`,
    description: `${category.summary} Compare features, customization options, pricing, and support before you choose.`,
    path: `/templates/${slug}`,
  });
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
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Templates", path: "/templates" },
          ...(category ? [{ name: getCategory(category).name, path: basePath }] : []),
        ])}
      />
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
