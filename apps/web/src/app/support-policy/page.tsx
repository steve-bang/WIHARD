import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = pageMetadata({
  title: "Support policy",
  description:
    "WIHARD support policy: who supports each product, what is covered, response times, how to reach us, and what is not included.",
  path: "/support-policy",
});

// Content outline: docs/ba/PRODUCT_VISION.md §5 and docs/ba/BUSINESS_REQUIREMENTS.md.
export default function Page() {
  return (
    <>
      <PageIntro eyebrow="Trust" title="Support policy">
        Who supports what, how to reach us, and what is not covered.
      </PageIntro>
      <Container className="max-w-3xl space-y-4 py-12 text-muted">
        <p>WIHARD is your point of contact for every product, even when the creator fixes the issue. Each product page states its support level: who provides it, what it covers, response time, and duration.</p>
      </Container>
    </>
  );
}
