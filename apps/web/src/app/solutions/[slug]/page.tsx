import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import { ProductGrid } from "@/components/product-card";
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
  return (
    <>
      <PageIntro eyebrow="Solutions" title={solution.name}>
        {solution.summary}
      </PageIntro>
      <Container className="space-y-10 py-12">
        <section>
          <h2 className="text-xl font-bold">Common problems</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
            {solution.problems.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-4 text-xl font-bold">Products for this</h2>
          <ProductGrid products={getProducts({ solution: solution.slug })} />
        </section>
      </Container>
    </>
  );
}
