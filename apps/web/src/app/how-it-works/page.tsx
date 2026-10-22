import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Journey } from "@/components/journey";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "How it works",
  description: "From discovering a product to customizing, deploying, and operating it.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageIntro eyebrow="How it works" title="Discover it. Make it yours. Put it to work.">
        Today you can discover products and register your interest. Customization, deployment, and ongoing operation
        are being built and will open in later phases.
      </PageIntro>
      <Container className="py-14">
        <Journey />
      </Container>
    </>
  );
}
