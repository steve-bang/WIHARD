import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Transparent pricing on WIHARD: see what each product includes, which costs may come on top, and how licences and subscriptions work.",
  path: "/pricing",
});

// Content outline: docs/ba/PRODUCT_VISION.md §5 and docs/ba/BUSINESS_REQUIREMENTS.md.
export default function Page() {
  return (
    <>
      <PageIntro eyebrow="Pricing" title="Pricing">
        What is included, and what may cost extra.
      </PageIntro>
      <Container className="max-w-3xl space-y-4 py-12 text-muted">
        <p>Each product page lists its price, what the price includes, and every additional cost that may apply, such as hosting or custom work.</p>
        <p>Purchasing is not open yet. Register your interest on any product page and we will contact you.</p>
      </Container>
    </>
  );
}
