import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, LayoutGrid, Lightbulb, SlidersHorizontal } from "lucide-react";
import { CatalogHero } from "@/components/catalog-hero";
import { Container } from "@/components/container";
import { CtaBanner } from "@/components/cta-banner";
import { Journey } from "@/components/journey";
import { solutionIcon } from "@/components/solution-icons";
import { TemplateCard } from "@/components/template-card";
import { getProducts, getSolutions } from "@/lib/catalog";

// Layout follows docs/design/mockups/solutions.png.

export const metadata: Metadata = {
  title: "Solutions",
  description: "Browse products by business problem, workflow, and industry.",
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">{children}</p>;
}

export default function SolutionsPage() {
  const solutions = getSolutions();
  const featured = getProducts().filter((p) => p.solutions.length > 0);

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
        cards={[{ icon: SlidersHorizontal, title: "Easy to customize", text: "Each product lists what you can change." }]}
      />

      <Container className="space-y-16 py-10">
        <nav aria-label="Solutions" className="flex gap-3 overflow-x-auto pb-1">
          <Tile href="/solutions" icon={LayoutGrid} label="All Solutions" current />
          {solutions.map((s) => (
            <Tile key={s.slug} href={`/solutions/${s.slug}`} icon={solutionIcon(s.slug)} label={s.name} />
          ))}
        </nav>

        <section>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Featured solutions</Eyebrow>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Popular solutions for your business</h2>
              <p className="mt-2 max-w-xl text-sm text-muted">
                Products that solve common business challenges. Each one comes with clear features, customization
                options, and support terms.
              </p>
            </div>
            <Link href="/templates" className="flex items-center gap-1 text-sm font-medium text-brand-600">
              View all templates <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <TemplateCard key={p.slug} product={p} />
            ))}
          </div>
        </section>

        <section className="grid gap-10 rounded-2xl bg-surface p-8 sm:p-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-2 text-2xl font-bold">From idea to a working solution in four simple steps</h2>
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
          <Journey />
        </section>

        <section>
          <Eyebrow>Solutions by industry</Eyebrow>
          <h2 className="mt-2 text-2xl font-bold">Find the right solution for your industry</h2>
          <p className="mt-2 text-sm text-muted">Browse solutions tailored to the needs of different businesses.</p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => {
              const Icon = solutionIcon(s.slug);
              return (
                <li key={s.slug}>
                  <Link
                    href={`/solutions/${s.slug}`}
                    className="group block overflow-hidden rounded-xl border border-line bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex h-28 items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100">
                      <Icon aria-hidden className="size-10 text-brand-600" />
                    </div>
                    <div className="flex items-center justify-between gap-3 p-4">
                      <div>
                        <h3 className="font-semibold">{s.name}</h3>
                        <p className="text-xs text-muted">{s.industry}</p>
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

function Tile({
  href,
  icon: Icon,
  label,
  current = false,
}: {
  href: string;
  icon: ReturnType<typeof solutionIcon>;
  label: string;
  current?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={`flex w-36 shrink-0 flex-col items-center gap-2 rounded-xl px-3 py-4 text-center text-xs font-medium ${
        current ? "bg-brand-50 text-brand-700" : "text-ink/80 hover:bg-surface"
      }`}
    >
      <Icon aria-hidden className="size-6" />
      {label}
    </Link>
  );
}
