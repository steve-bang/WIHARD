import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, ArrowUpRight, LayoutGrid, Lightbulb } from "lucide-react";
import { CatalogHero } from "@/components/catalog-hero";
import { Container } from "@/components/container";
import { CtaBanner } from "@/components/cta-banner";
import { SolutionsIllustration } from "@/components/home-illustrations";
import { industryIcon } from "@/components/industry-icons";
import { Journey } from "@/components/journey";
import { SolutionCard } from "@/components/solution-card";
import { getIndustries, getIndustry, getProduct, getProducts, getSolutions, type Industry } from "@/lib/catalog";

// Layout follows docs/design/mockups/solutions.png.

export const metadata: Metadata = pageMetadata({
  title: "Solutions",
  description:
    "Find software solutions by industry and business problem: garages, clinics, online stores, bookings, CRM, and more — ready to customize.",
  path: "/solutions",
});

const FEATURED = ["garage-management-website", "clinic-booking", "shoply", "customer-management-crm", "learnhub", "homefinder"];
const INDUSTRY_CARDS: Industry[] = ["automotive", "healthcare", "e-commerce", "education", "real-estate", "food-beverage"];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">{children}</p>;
}

export default function SolutionsPage({ searchParams }: PageProps<"/solutions">) {
  return (
    <>
      <CatalogHero
        eyebrow="Solutions"
        icon={Lightbulb}
        title={
          <>
            Real solutions for
            <br />
            every business need
          </>
        }
        text="Explore ready-to-use websites, applications, and business tools built for real-world problems. Find the right solution for your industry, your workflow, and your goals."
        searchPlaceholder="Search solutions, industries, or use cases…"
        illustration={<SolutionsIllustration />}
      >
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-medium text-muted">Popular:</span>
          {getSolutions().map((s) => (
            <Link
              key={s.slug}
              href={`/solutions/${s.slug}`}
              className="rounded-full bg-white/80 px-3 py-1 text-ink/80 shadow-sm hover:text-brand-600"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </CatalogHero>

      <Suspense fallback={<IndustryBrowser />}>
        {searchParams.then(({ industry }) => (
          <IndustryBrowser
            industry={getIndustries().some((i) => i.slug === industry) ? (industry as Industry) : undefined}
          />
        ))}
      </Suspense>

      <Container className="space-y-16 pb-16">
        <section className="grid items-center gap-10 rounded-2xl bg-surface p-8 sm:p-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">From idea to a working solution in four simple steps</h2>
            <p className="mt-3 text-sm text-muted">
              No technical skills required. Start from a product that already works and tell us what you need.
            </p>
            <Link
              href="/how-it-works"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-white"
            >
              See how it works <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          <Journey variant="stacked" />
        </section>

        <section>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Solutions by industry</Eyebrow>
              <h2 className="mt-2 text-2xl font-bold">Find the right solution for your industry</h2>
              <p className="mt-2 text-sm text-muted">
                Browse solutions tailored to the needs of different industries and business types.
              </p>
            </div>
            <Link href="/templates" className="flex items-center gap-1 text-sm font-medium text-brand-600">
              Browse all templates <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {INDUSTRY_CARDS.map((slug) => {
              const industry = getIndustry(slug);
              const Icon = industryIcon[slug];
              return (
                <li key={slug}>
                  <Link
                    href={`/solutions?industry=${slug}#featured`}
                    className="group block overflow-hidden rounded-xl border border-line bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex h-24 items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100">
                      <Icon aria-hidden className="size-9 text-brand-600" />
                    </div>
                    <div className="flex items-end justify-between gap-2 p-3">
                      <div>
                        <h3 className="text-sm font-semibold">{industry.name}</h3>
                        <p className="text-xs text-muted">{industry.description}</p>
                      </div>
                      <ArrowUpRight aria-hidden className="size-4 shrink-0 text-brand-600" />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <CtaBanner
          title="Ready to find the right solution?"
          text="Explore our templates, register your interest, and we'll help you make one yours."
          href="/templates"
          label="Explore all templates"
        />
      </Container>
    </>
  );
}

// Industry tiles plus the product grid they filter.
function IndustryBrowser({ industry }: { industry?: Industry }) {
  const products = industry
    ? getProducts().filter((p) => p.industry === industry)
    : FEATURED.map((slug) => getProduct(slug)!);
  return (
    <Container className="py-10">
      <nav aria-label="Industries" className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
        <Tile href="/solutions" icon={LayoutGrid} label="All Solutions" current={!industry} />
        {getIndustries().map((i) => (
          <Tile
            key={i.slug}
            href={`/solutions?industry=${i.slug}#featured`}
            icon={industryIcon[i.slug]}
            label={i.name}
            current={i.slug === industry}
          />
        ))}
      </nav>

      <section id="featured" className="mt-14 scroll-mt-4">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>{industry ? getIndustry(industry).name : "Featured solutions"}</Eyebrow>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              {industry ? `Solutions for ${getIndustry(industry).name.toLowerCase()}` : "Popular solutions for your business"}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted">
              Products that solve common business challenges. Each one comes with clear features, customization
              options, and support terms.
            </p>
          </div>
          <Link href="/templates" className="flex items-center gap-1 text-sm font-medium text-brand-600">
            View all solutions <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        {products.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line p-10 text-center text-muted">
            No products for this industry yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <SolutionCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </section>
    </Container>
  );
}

function Tile({
  href,
  icon: Icon,
  label,
  current,
}: {
  href: string;
  icon: (typeof industryIcon)[Industry];
  label: string;
  current: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={`flex flex-col items-center gap-2.5 rounded-xl px-2 py-4 text-center text-xs font-medium ${
        current ? "bg-brand-50 text-brand-700" : "text-ink/80 hover:bg-surface"
      }`}
    >
      <Icon aria-hidden className="size-6" />
      {label}
    </Link>
  );
}
