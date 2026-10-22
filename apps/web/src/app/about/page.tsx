import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "WIHARD makes software easier to find, own, and use for non-technical businesses, and helps creators turn their skills into products.",
  path: "/about",
});

// Content outline: docs/ba/PRODUCT_VISION.md §5 and docs/ba/BUSINESS_REQUIREMENTS.md.
export default function Page() {
  return (
    <>
      <PageIntro eyebrow="About" title="About WIHARD">
        Making software easier to find, own, and use, and helping creators turn their skills into products.
      </PageIntro>
      <Container className="max-w-3xl space-y-4 py-12 text-muted">
        <p>Customers choose outcomes, not programming languages. They start from an existing product instead of a blank screen, and the platform stays their long-term point of contact.</p>
      </Container>
    </>
  );
}
