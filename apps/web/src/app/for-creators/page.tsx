import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Build with us",
  description: "Publish your websites, apps, and business tools and reach customers who need them.",
};

// Content outline: docs/ba/PRODUCT_VISION.md §5 and docs/ba/BUSINESS_REQUIREMENTS.md.
export default function Page() {
  return (
    <>
      <PageIntro eyebrow="For creators" title="Build with us">
        Publish your websites, apps, and business tools and reach customers who need them.
      </PageIntro>
      <Container className="max-w-3xl space-y-4 py-12 text-muted">
        <p>Creators publish products; WIHARD owns the customer experience and sets clear standards for quality, support, and continuity.</p>
        <p>Every product is reviewed before it is published. Creator sign-up and publishing open with the creator dashboard.</p>
      </Container>
    </>
  );
}
