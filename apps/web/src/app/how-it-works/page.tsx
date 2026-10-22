import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/container";
import { Journey } from "@/components/journey";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = pageMetadata({
  title: "How it works",
  description:
    "See how WIHARD works: discover a ready-made website, app, or business tool, then customize, deploy, and run it with platform support.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <>
      <PageIntro eyebrow="How it works" title="Discover it. Make it yours. Put it to work.">
        Today you can discover products and register your interest. Customization, deployment, and ongoing operation
        are being built and will open in later phases.
      </PageIntro>
      <Container className="py-14">
        <h2 className="mb-8 text-2xl font-bold">The four steps</h2>
        <Journey />
      </Container>
    </>
  );
}
