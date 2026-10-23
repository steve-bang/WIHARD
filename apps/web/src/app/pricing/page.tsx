import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarClock, Headphones, PackageCheck, Receipt, RefreshCw, ShieldCheck } from "lucide-react";
import { ContentSection } from "@/components/content-section";
import { Container } from "@/components/container";
import { CtaBanner } from "@/components/cta-banner";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { LaterBadge } from "@/components/later-badge";
import { PageIntro } from "@/components/page-intro";
import { categories, getProducts } from "@/lib/catalog";
import { policies } from "@/lib/policies";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

// Policy numbers come from lib/policies.ts (BRD §9.4). Purchasing opens in Phase 2 (BR-T02).

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Transparent pricing on WIHARD: see what each product includes, which costs may come on top, and how licences and subscriptions work.",
  path: "/pricing",
});

const models = [
  {
    icon: Receipt,
    title: "One-time licence",
    text: "Pay once to use the product for your business. Support and updates are included for the period shown on the product page.",
  },
  {
    icon: CalendarClock,
    title: "Subscription",
    text: "Pay monthly while you use the product. Support and updates are included for as long as the subscription is active.",
  },
  {
    icon: PackageCheck,
    title: "Possible extra costs",
    text: "Some costs depend on how you use the product. Each product page lists them before you decide, so nothing comes as a surprise.",
  },
];

const extras = [
  { title: "Hosting", text: "Running a website or app online has a monthly cost that depends on traffic and storage." },
  { title: "Domain name", text: "Your own address, such as yourbusiness.com, is paid yearly to a domain registrar." },
  { title: "Custom work", text: "Changes beyond the customization options a product lists are quoted per request." },
  { title: "Usage above a quota", text: "Some products include a quota, for example emails or storage. Use above it is charged by usage." },
  { title: "Third-party fees", text: "Payment providers or other services a product connects to may charge their own fees." },
];

const included = [
  { icon: ShieldCheck, title: "Reviewed before publishing", text: "Every product and every new version is checked by WIHARD before it reaches you." },
  {
    icon: RefreshCw,
    title: `At least ${policies.minimumSupportMonths} months of fixes`,
    text: "Every product includes bug fixes and security updates for at least this long. Many include more.",
  },
  { icon: Headphones, title: "One point of contact", text: "You contact WIHARD for support, whoever fixes the issue." },
  { icon: BadgeCheck, title: "Clear terms", text: "What you can customize, who supports you, and for how long are shown on every product page." },
];

const faq = [
  {
    question: "Can I buy a product today?",
    answer:
      "Not yet. Purchasing opens in a later phase. Today you can explore products and use “Make it yours” on any product page to tell us what you need; we will contact you.",
  },
  {
    question: "Why are hosting costs not included in the price?",
    answer:
      "Hosting depends on how many people use your product and how much data it stores. Product pages list hosting as a possible extra cost so you can plan for it.",
  },
  {
    question: "Who sets the price of a product?",
    answer:
      "The creator sets the price. WIHARD reviews it with the product and checks that every possible extra cost is listed on the product page.",
  },
  {
    question: "Can I get a refund?",
    answer: `Once purchasing opens, you can ask for a refund within ${policies.refundDays} days if a product does not match its description.`,
  },
  {
    question: "Do I pay WIHARD a fee on top of the price?",
    answer: "No. You pay the price shown on the product page. The platform fee is paid by the creator from each sale.",
  },
  {
    question: "What happens when my support period ends?",
    answer:
      "The product keeps working. You no longer receive fixes and updates from the creator unless the product page offers a renewal. Contact us if you need help deciding.",
  },
];

function priceRange(prices: number[]) {
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? `$${min}` : `$${min}–$${max}`;
}

export default function PricingPage() {
  const products = getProducts();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />
      <PageIntro eyebrow="Pricing" title="Transparent pricing. Every cost, before you commit.">
        Each product shows its price, what that price includes, and every cost that may come on top. You can compare
        products on the same terms and decide with no surprises later.
      </PageIntro>

      <Container className="space-y-16 py-14">
        <ContentSection
          eyebrow="How pricing works"
          title="Two ways to pay, one rule: everything is listed"
          intro="Creators choose how their product is priced. Whichever model a product uses, its page lists the full picture."
        >
          <ul className="grid gap-6 md:grid-cols-3">
            {models.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-2xl border border-line bg-white p-6">
                <Icon aria-hidden className="size-6 text-brand-600" />
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection
          eyebrow="Current prices"
          title="Price ranges by category"
          intro="Starting prices of the products listed today. Possible extra costs are shown on each product page."
        >
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-surface text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Products</th>
                  <th className="px-5 py-3 font-medium">One-time</th>
                  <th className="px-5 py-3 font-medium">Monthly</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {categories.map((c) => {
                  const inCategory = products.filter((p) => p.category === c.slug);
                  const byModel = (m: string) =>
                    inCategory.filter((p) => p.pricing.model === m).map((p) => p.pricing.startingPrice);
                  const oneTime = byModel("one-time");
                  const monthly = byModel("subscription");
                  return (
                    <tr key={c.slug}>
                      <th scope="row" className="px-5 py-4 font-semibold">
                        {c.name}
                      </th>
                      <td className="px-5 py-4 text-muted">{inCategory.length}</td>
                      <td className="px-5 py-4">{oneTime.length ? priceRange(oneTime) : "—"}</td>
                      <td className="px-5 py-4">{monthly.length ? `${priceRange(monthly)} / month` : "—"}</td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/templates/${c.slug}`}
                          className="inline-flex items-center gap-1 font-medium text-brand-600"
                        >
                          Browse <ArrowRight aria-hidden className="size-4" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </ContentSection>

        <div className="grid gap-10 lg:grid-cols-2">
          <ContentSection eyebrow="Included" title="What every product includes">
            <ul className="space-y-5">
              {included.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-50">
                    <Icon aria-hidden className="size-5 text-brand-600" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 text-sm text-muted">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </ContentSection>

          <ContentSection eyebrow="Possible extras" title="What may cost extra">
            <ul className="divide-y divide-line rounded-2xl border border-line bg-white">
              {extras.map((e) => (
                <li key={e.title} className="p-5">
                  <h3 className="text-sm font-semibold">{e.title}</h3>
                  <p className="mt-1 text-sm text-muted">{e.text}</p>
                </li>
              ))}
            </ul>
          </ContentSection>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl bg-surface p-6">
            <h2 className="flex flex-wrap items-center gap-2 text-lg font-bold">
              Buying today <LaterBadge phase={2} />
            </h2>
            <p className="mt-2 text-sm text-muted">
              WIHARD is opening in stages. Purchasing is not available yet. Use “Make it yours” on any product page to
              register your interest and describe what you need; we will contact you.
            </p>
          </section>
          <section className="rounded-2xl bg-surface p-6">
            <h2 className="flex flex-wrap items-center gap-2 text-lg font-bold">
              Refunds <LaterBadge phase={2} />
            </h2>
            <p className="mt-2 text-sm text-muted">
              When purchasing opens, you can ask for a refund within {policies.refundDays} days if a product does not
              match its description on WIHARD.
            </p>
          </section>
          <section className="rounded-2xl bg-surface p-6">
            <h2 className="flex flex-wrap items-center gap-2 text-lg font-bold">
              Selling on WIHARD <LaterBadge phase={2} />
            </h2>
            <p className="mt-2 text-sm text-muted">
              Listing a product is free. When sales open, creators pay a {policies.platformFeePercent}% platform fee per
              sale and receive payouts {policies.creatorPayoutCycle}. Customers always pay the listed price.{" "}
              <Link href="/for-creators" className="text-brand-600 underline">
                Learn more
              </Link>
            </p>
          </section>
        </div>

        <ContentSection eyebrow="FAQ" title="Pricing questions">
          <FaqList items={faq} />
        </ContentSection>

        <CtaBanner
          title="Compare products on the same terms"
          text="Every product shows its price, extras, and support. Find one that fits your budget."
          href="/templates"
          label="Explore templates"
        />
      </Container>
    </>
  );
}
