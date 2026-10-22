import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import { getSolutions } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Browse products by business problem, workflow, and industry.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageIntro eyebrow="Solutions" title="Start from the problem you need to solve">
        Choose the outcome you want. We match it with products that fit.
      </PageIntro>
      <Container className="grid gap-6 py-12 md:grid-cols-3">
        {getSolutions().map((s) => (
          <Link
            key={s.slug}
            href={`/solutions/${s.slug}`}
            className="group rounded-xl border border-line p-6 transition hover:shadow-md"
          >
            <h2 className="font-semibold">{s.name}</h2>
            <p className="mt-2 text-sm text-muted">{s.summary}</p>
            <span className="mt-4 flex items-center gap-1 text-sm font-medium text-brand-600">
              See products <ArrowRight aria-hidden className="size-4" />
            </span>
          </Link>
        ))}
      </Container>
    </>
  );
}
