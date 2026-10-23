import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Clock, Headphones, ShieldCheck, Users, X } from "lucide-react";
import { ContentSection } from "@/components/content-section";
import { Container } from "@/components/container";
import { CtaBanner } from "@/components/cta-banner";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { LaterBadge } from "@/components/later-badge";
import { PageIntro } from "@/components/page-intro";
import { getProducts, type SupportProvider } from "@/lib/catalog";
import { businessDays, policies } from "@/lib/policies";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

// Policy numbers come from lib/policies.ts (BRD §9.4). The responsibility table is the Phase 1
// subset of BRD §8; later-phase rows carry a LaterBadge (BR-T02). Support always goes through WIHARD (BR-T05).

export const metadata: Metadata = pageMetadata({
  title: "Support policy",
  description:
    "WIHARD support policy: who supports each product, what is covered, response times, how to reach us, and what is not included.",
  path: "/support-policy",
});

const levels: { provider: SupportProvider; icon: typeof Users; title: string; text: string }[] = [
  {
    provider: "platform",
    icon: ShieldCheck,
    title: "Platform",
    text: "WIHARD handles your requests and coordinates fixes. Best for customers who want one team responsible end to end.",
  },
  {
    provider: "platform-and-creator",
    icon: Headphones,
    title: "Platform + creator",
    text: "WIHARD receives and tracks your request; the creator fixes issues in the product itself. You still talk only to WIHARD.",
  },
  {
    provider: "creator",
    icon: Users,
    title: "Creator",
    text: "The creator fixes issues in the product. WIHARD remains your point of contact and follows up if a fix is late.",
  },
];

const responsibilities: { task: string; wihard: string; creator: string; phase?: number }[] = [
  { task: "Review products and new versions before publishing", wihard: "Responsible", creator: "Provides details" },
  { task: "Receive and track your support requests", wihard: "Responsible", creator: "Kept informed" },
  { task: "Fix bugs in the product", wihard: "Accountable, follows up", creator: "Does the fix" },
  { task: "Publish product updates", wihard: "Reviews each version", creator: "Responsible" },
  { task: "Patch security vulnerabilities", wihard: "Accountable, can suspend a listing", creator: "Does the fix" },
  { task: "Hosting and uptime", wihard: "Responsible, with a hosting provider", creator: "—", phase: 3 },
  { task: "Backups and data recovery", wihard: "Responsible", creator: "—", phase: 3 },
  { task: "Payments and refunds", wihard: "Responsible", creator: "Kept informed", phase: 2 },
];

const covered = [
  "Bugs: the product doesn't work as its page describes",
  "Security updates for the product's code",
  "Help using the features the product already has",
  "Questions about customization options listed on the product page",
];

const notCovered = [
  "New features the product doesn't have",
  "Customization beyond the options listed on the product page",
  "Problems caused by changes made to the code by someone else",
  "Third-party services the product connects to, such as payment providers",
];

const faq = [
  {
    question: "Who do I contact if something stops working?",
    answer:
      "Always contact WIHARD, whichever support level the product has. We log the request, involve the creator when a fix is needed in the product, and keep you updated.",
  },
  {
    question: "Can I contact the creator directly?",
    answer:
      "You can, but you don't have to. Requests sent through WIHARD are tracked against the response times on this page; direct messages to a creator are not.",
  },
  {
    question: "What counts as a critical issue?",
    answer:
      "The product is down, data is at risk, or a security vulnerability is affecting you. Critical issues get a first response within " +
      `${businessDays(policies.responseTimes[0].days)}.`,
  },
  {
    question: "How long is a product supported?",
    answer: `At least ${policies.minimumSupportMonths} months for one-time purchases, and for as long as a subscription is active. The exact period is on each product page.`,
  },
  {
    question: "What if the creator stops supporting a product I use?",
    answer: `We tell you at least ${policies.continuityNoticeDays} days in advance. We then look for another creator to take over, or keep providing security fixes ourselves until the support period you paid for ends.`,
  },
];

export default function SupportPolicyPage() {
  const products = getProducts();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Support policy", path: "/support-policy" },
        ])}
      />
      <PageIntro eyebrow="Support policy" title="WIHARD is your point of contact">
        Whoever built the product you use, you reach WIHARD for help. This page explains who does what, how fast we
        respond, and what support covers.
      </PageIntro>

      <Container className="space-y-16 py-14">
        <ContentSection
          eyebrow="Support levels"
          title="Three support levels, one place to ask"
          intro="Each product page shows its support level. It changes who fixes an issue, never who you contact."
        >
          <ul className="grid gap-6 md:grid-cols-3">
            {levels.map(({ provider, icon: Icon, title, text }) => (
              <li key={provider} className="rounded-2xl border border-line bg-white p-6">
                <Icon aria-hidden className="size-6 text-brand-600" />
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
                <Link
                  href={`/templates?support=${provider}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600"
                >
                  {products.filter((p) => p.support.provider === provider).length} products{" "}
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection
          eyebrow="Who does what"
          title="Responsibilities"
          intro="How work is shared between WIHARD and creators. Rows marked with a phase are not available yet."
        >
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="bg-surface text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Task</th>
                  <th className="px-5 py-3 font-medium">WIHARD</th>
                  <th className="px-5 py-3 font-medium">Creator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {responsibilities.map((r) => (
                  <tr key={r.task} className={r.phase ? "text-muted" : ""}>
                    <th scope="row" className="px-5 py-4 font-medium">
                      <span className="mr-2">{r.task}</span>
                      {r.phase && <LaterBadge phase={r.phase} />}
                    </th>
                    <td className="px-5 py-4">{r.wihard}</td>
                    <td className="px-5 py-4">{r.creator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ContentSection>

        <ContentSection
          eyebrow="Response times"
          title="How fast we respond"
          intro={
            <>
              Times are for our first response, counted in business days. Support hours: {policies.supportHours}.
            </>
          }
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

        <div className="grid gap-10 lg:grid-cols-2">
          <ContentSection eyebrow="Coverage" title="What support covers">
            <CheckList items={covered} />
          </ContentSection>
          <ContentSection eyebrow="Limits" title="What support doesn't cover">
            <CheckList items={notCovered} negative />
          </ContentSection>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-line bg-white p-6">
            <h2 className="text-lg font-bold">Minimum support for every product</h2>
            <p className="mt-2 text-sm text-muted">
              No product is published without at least {policies.minimumSupportMonths} months of bug fixes and security
              updates for one-time purchases, or support for the whole subscription. Many products offer more; the
              period is always on the product page.
            </p>
          </section>
          <section className="rounded-2xl border border-line bg-white p-6">
            <h2 className="text-lg font-bold">If a creator stops supporting a product</h2>
            <p className="mt-2 text-sm text-muted">
              We notify you at least {policies.continuityNoticeDays} days in advance. We then find another creator to
              take over, or keep providing security fixes until the support period you paid for ends.
            </p>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted">
              Exporting your data to move elsewhere <LaterBadge phase={3} />
            </p>
          </section>
        </div>

        <ContentSection
          eyebrow="Contact"
          title="How to reach support"
          intro="Use our contact page and include the product name and what happened. Screenshots help us respond faster."
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-medium text-white hover:bg-brand-700"
          >
            Contact support <ArrowRight aria-hidden className="size-4" />
          </Link>
        </ContentSection>

        <ContentSection eyebrow="FAQ" title="Support questions">
          <FaqList items={faq} />
        </ContentSection>

        <CtaBanner
          title="Support terms are on every product page"
          text="Compare who supports each product, what is covered, and for how long."
          href="/templates"
          label="Explore templates"
        />
      </Container>
    </>
  );
}

function CheckList({ items, negative = false }: { items: string[]; negative?: boolean }) {
  const Icon = negative ? X : Check;
  return (
    <ul className="space-y-3 rounded-2xl bg-surface p-6 text-sm">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Icon aria-hidden className={`mt-0.5 size-4 shrink-0 ${negative ? "text-muted" : "text-brand-600"}`} />
          {item}
        </li>
      ))}
    </ul>
  );
}
