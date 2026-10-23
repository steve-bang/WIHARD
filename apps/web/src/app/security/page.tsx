import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bug, Database, FileCheck, KeyRound, Lock, ScanSearch, ShieldCheck, UserCheck } from "lucide-react";
import { ContentSection } from "@/components/content-section";
import { Container } from "@/components/container";
import { CtaBanner } from "@/components/cta-banner";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { LaterBadge } from "@/components/later-badge";
import { PageIntro } from "@/components/page-intro";
import { businessDays, policies } from "@/lib/policies";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

// Review rules follow BRD §9.1 (BR-Q01–Q05), data ownership §9.3 (BR-O01–O02), platform security NFR-06/07.
// Policy numbers come from lib/policies.ts (BRD §9.4). Accounts and data export are not live yet (BR-T02).

export const metadata: Metadata = pageMetadata({
  title: "Security",
  description:
    "How WIHARD protects your data: product review before publishing, licence checks, and clear rules on who owns the data you enter.",
  path: "/security",
});

const reviewSteps = [
  {
    icon: ScanSearch,
    title: "Quality check",
    text: "Every product is reviewed against our checklist before it is listed. Products that don't meet it are sent back with reasons.",
  },
  {
    icon: FileCheck,
    title: "Ownership and licences",
    text: "Creators declare that they own their code and list every third-party library and asset with its licence.",
  },
  {
    icon: ShieldCheck,
    title: "Working demos",
    text: "If a product has a live demo, we check that it works at review time.",
  },
  {
    icon: UserCheck,
    title: "Re-review on major changes",
    text: "Changes to price, support terms, or licence go through review again before customers see them.",
  },
];

const faq = [
  {
    question: "Who owns the data I put into a product?",
    answer:
      "You do. Customer records, bookings, invoices, and other business data you enter belong to you, not to WIHARD or the creator.",
  },
  {
    question: "Does WIHARD sell my information?",
    answer: "No. We use the details you send us only to respond to you and to provide the service you asked for.",
  },
  {
    question: "What happens if a security vulnerability is found in a product?",
    answer: `The creator must patch critical vulnerabilities within ${policies.criticalPatchDays} days. If the fix is late, we temporarily hide the product from the marketplace and keep affected customers informed.`,
  },
  {
    question: "How do I report a security issue?",
    answer: `Use our contact page and choose a security topic. We acknowledge reports within ${businessDays(policies.vulnerabilityAckDays)} and keep you updated until the issue is resolved.`,
  },
  {
    question: "Can I export my data?",
    answer:
      "Data export arrives with managed deployment in a later phase. Until then, contact us if you need help with data from a product you use.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Security", path: "/security" },
        ])}
      />
      <PageIntro eyebrow="Trust" title="Security and data protection">
        Software you rely on should be safe to use and clear about who owns your data. This page explains how we
        review products, protect information, and handle security issues.
      </PageIntro>

      <Container className="space-y-16 py-14">
        <ContentSection
          eyebrow="Before publishing"
          title="Every product is reviewed"
          intro="Nothing appears on WIHARD until our team approves it. The same applies to every new version."
        >
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reviewSteps.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-2xl border border-line bg-white p-6">
                <Icon aria-hidden className="size-6 text-brand-600" />
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </ContentSection>

        <div className="grid gap-10 lg:grid-cols-2">
          <ContentSection eyebrow="Your data" title="Your data belongs to you">
            <div className="space-y-4 rounded-2xl bg-surface p-6 text-sm text-muted">
              <p className="flex gap-3">
                <Database aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-600" />
                The business data you enter into a product — customers, bookings, orders, invoices — is yours. Neither
                WIHARD nor the creator claims ownership of it.
              </p>
              <p className="flex gap-3">
                <Lock aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-600" />
                We collect only what we need to respond to you, such as your name, email, and what you tell us in a
                form. We don&apos;t sell it, and we handle it in line with {policies.dataLaw}.
              </p>
              <p className="flex flex-wrap items-center gap-2 pl-8">
                Exporting your data from a product <LaterBadge phase={3} />
              </p>
            </div>
          </ContentSection>

          <ContentSection eyebrow="Platform" title="How the platform is protected">
            <div className="space-y-4 rounded-2xl bg-surface p-6 text-sm text-muted">
              <p className="flex gap-3">
                <Lock aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-600" />
                Every page on WIHARD is served over HTTPS, so what you send us is encrypted in transit.
              </p>
              <p className="flex gap-3">
                <KeyRound aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-600" />
                <span>
                  <span className="mb-1 flex flex-wrap items-center gap-2 font-medium text-ink">
                    Accounts <LaterBadge />
                  </span>
                  When accounts open, passwords are stored only as secure hashes, and access is limited by role —
                  customers, creators, and WIHARD staff each see only what they need.
                </span>
              </p>
            </div>
          </ContentSection>
        </div>

        <ContentSection
          eyebrow="Vulnerabilities"
          title="When a security issue is found"
          intro="Creators fix issues in their products; WIHARD makes sure it happens on time."
        >
          <ol className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Reported",
                text: `We acknowledge security reports within ${businessDays(policies.vulnerabilityAckDays)} and assess how serious the issue is.`,
              },
              {
                title: "Patched",
                text: `The creator must patch critical vulnerabilities within ${policies.criticalPatchDays} days. We review the fix before it is released.`,
              },
              {
                title: "Enforced",
                text: "If a critical fix is late, we temporarily hide the product from the marketplace and keep affected customers informed.",
              },
            ].map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-line bg-white p-6">
                <span className="flex size-7 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </ContentSection>

        <ContentSection
          eyebrow="Report an issue"
          title="Found a security problem?"
          intro="Tell us what you found, where, and how to reproduce it. Please don't share details publicly until we have fixed it."
        >
          <Link
            href="/contact?topic=security"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-medium text-white hover:bg-brand-700"
          >
            <Bug aria-hidden className="size-4" /> Report a security issue <ArrowRight aria-hidden className="size-4" />
          </Link>
        </ContentSection>

        <ContentSection eyebrow="FAQ" title="Security questions">
          <FaqList items={faq} />
        </ContentSection>

        <CtaBanner
          title="Every product shows who supports it"
          text="Support terms, update policies, and licences are listed before you decide."
          href="/support-policy"
          label="Read our support policy"
        />
      </Container>
    </>
  );
}
