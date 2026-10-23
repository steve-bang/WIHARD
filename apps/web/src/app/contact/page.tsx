import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { ContactTopics } from "@/components/contact-topics";
import { ContentSection } from "@/components/content-section";
import { Container } from "@/components/container";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { LaterBadge } from "@/components/later-badge";
import { PageIntro } from "@/components/page-intro";
import { businessDays, policies } from "@/lib/policies";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

// Every support and interest request goes through WIHARD (BR-T05). The form (FR-L01–L02) arrives with
// services/api; until then the page explains each topic and says plainly that sending isn't open (BR-T02).

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact WIHARD: tell us what your business needs, ask about a product, or apply to publish your own products as a creator.",
  path: "/contact",
});

const faq = [
  {
    question: "When will the contact form open?",
    answer:
      "Soon. WIHARD is opening in stages, and the form arrives together with our request tracking so that every message gets a tracked response. This page lists what to include so you're ready.",
  },
  {
    question: "Will my request be passed to the creator?",
    answer:
      "WIHARD stays your point of contact. When a creator needs to be involved — for example to fix a bug or quote a customization — we coordinate with them and keep you updated.",
  },
  {
    question: "Does it cost anything to ask about a product?",
    answer: "No. Questions and requests for advice are free. You only pay when you buy a product, once purchasing opens.",
  },
  {
    question: "How quickly will you reply?",
    answer: `Within ${businessDays(policies.responseTimes[2].days)} for general questions and ${businessDays(policies.responseTimes[0].days)} for critical support issues, during our support hours: ${policies.supportHours}.`,
  },
  {
    question: "Can I talk to someone by phone?",
    answer:
      "Not at the moment. Written requests let us track every conversation and involve the right creator, so that is the only channel for now.",
  },
];

export default function ContactPage({ searchParams }: PageProps<"/contact">) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageIntro eyebrow="Contact" title="Contact WIHARD">
        Questions about a product, help with one you use, publishing your own, or reporting a problem — all requests
        come to WIHARD, and we make sure they reach the right person.
      </PageIntro>

      <Container className="space-y-16 py-14">
        <section className="rounded-2xl bg-amber-50/60 p-6">
          <h2 className="flex flex-wrap items-center gap-2 text-lg font-bold">
            Our contact form opens soon <LaterBadge />
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-muted">
            We can&apos;t receive messages through the website yet. In the meantime you can explore products and compare
            their prices and support terms, read how support works, and come back here when the form is live.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
            <Link href="/templates" className="inline-flex items-center gap-1 text-brand-600">
              Explore templates <ArrowRight aria-hidden className="size-4" />
            </Link>
            <Link href="/support-policy" className="inline-flex items-center gap-1 text-brand-600">
              Support policy <ArrowRight aria-hidden className="size-4" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-1 text-brand-600">
              Pricing <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </section>

        <ContentSection
          eyebrow="Topics"
          title="What can we help with?"
          intro="Pick the topic closest to your request. Each one lists what to include so we can help on the first reply."
        >
          <Suspense fallback={<ContactTopics />}>
            {searchParams.then(({ topic, product }) => (
              <ContactTopics
                topic={typeof topic === "string" ? topic : undefined}
                productSlug={typeof product === "string" ? product : undefined}
              />
            ))}
          </Suspense>
        </ContentSection>

        <ContentSection
          eyebrow="Response times"
          title="When you'll hear from us"
          intro={<>Support hours: {policies.supportHours}. Times are for our first reply, counted in business days.</>}
        >
          <ul className="grid gap-6 md:grid-cols-3">
            {policies.responseTimes.map((r) => (
              <li key={r.level} className="rounded-2xl bg-surface p-6">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <Clock aria-hidden className="size-4 text-brand-600" /> {r.level}
                </p>
                <p className="mt-3 text-2xl font-bold">{businessDays(r.days)}</p>
                <p className="mt-2 text-sm text-muted">{r.example}</p>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection eyebrow="FAQ" title="Contact questions">
          <FaqList items={faq} />
        </ContentSection>
      </Container>
    </>
  );
}
