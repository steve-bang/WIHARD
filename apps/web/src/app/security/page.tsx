import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Security",
  description: "How we approach data protection and platform trust.",
};

// Content outline: docs/ba/PRODUCT_VISION.md §5 and docs/ba/BUSINESS_REQUIREMENTS.md.
export default function Page() {
  return (
    <>
      <PageIntro eyebrow="Trust" title="Security">
        How we approach data protection and platform trust.
      </PageIntro>
      <Container className="max-w-3xl space-y-4 py-12 text-muted">
        <p>Data you enter into a product belongs to you. Products are reviewed before publication, and creators must declare third-party code and licences.</p>
      </Container>
    </>
  );
}
