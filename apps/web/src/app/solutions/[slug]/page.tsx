import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CircleAlert } from "lucide-react";
import { CatalogHero } from "@/components/catalog-hero";
import { Container } from "@/components/container";
import { CtaBanner } from "@/components/cta-banner";
import { solutionIcon } from "@/components/solution-icons";
import { TemplateCard } from "@/components/template-card";
import { getProducts, getSolution, getSolutions } from "@/lib/catalog";

export function generateStaticParams() {
  return getSolutions().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const solution = getSolution((await params).slug);
  if (!solution) return {};
  return { title: solution.name, description: solution.summary };
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  const solution = getSolution((await params).slug);
  if (!solution) notFound();
  const products = getProducts({ solution: solution.slug });
  return (
    <>
      <CatalogHero
        eyebrow={solution.industry}
        icon={solutionIcon(solution.slug)}
        title={solution.name}
        text={solution.summary}
        cards={solution.problems.slice(0, 3).map((p) => ({ icon: CircleAlert, title: "Common problem", text: p }))}
      />
      <Container className="space-y-14 py-12">
        <section>
          <h2 className="text-xl font-bold">Common problems we solve</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {solution.problems.map((p) => (
              <li key={p} className="flex gap-3 rounded-xl bg-surface p-4 text-sm">
                <CircleAlert aria-hidden className="size-5 shrink-0 text-brand-600" />
                {p}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-6 text-xl font-bold">Products for {solution.name.toLowerCase()}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <TemplateCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
        <CtaBanner
          title="Not sure which one fits?"
          text="Tell us about your business and we'll help you choose."
          href="/contact"
          label="Contact us"
        />
      </Container>
    </>
  );
}
