import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us what you need and we will get back to you.",
};

// Content outline: docs/ba/PRODUCT_VISION.md §5 and docs/ba/BUSINESS_REQUIREMENTS.md.
export default function Page() {
  return (
    <>
      <PageIntro eyebrow="Contact" title="Contact">
        Tell us what you need and we will get back to you.
      </PageIntro>
      <Container className="max-w-3xl space-y-4 py-12 text-muted">
        {/* FR-L01/L02: interest and contact forms, submitted to services/api once it exists. */}
        <p>Interest and contact forms are coming soon.</p>
      </Container>
    </>
  );
}
