import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Compass,
  Eye,
  FileText,
  Handshake,
  Headphones,
  KeyRound,
  LayoutGrid,
  MessageSquareText,
  PiggyBank,
  Scale,
  ShieldCheck,
  Sparkles,
  Store,
  Tag,
  UserX,
  Wrench,
} from "lucide-react";
import { ContentSection } from "@/components/content-section";
import { Container } from "@/components/container";
import { CtaBanner } from "@/components/cta-banner";
import { JsonLd } from "@/components/json-ld";
import { LaterBadge } from "@/components/later-badge";
import { PageIntro } from "@/components/page-intro";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

// Content comes from docs/ba/PRODUCT_VISION.md §1–3 and BRD §1–2, §6. No team, founding, or
// company figures until real ones are provided. Later-phase capabilities carry LaterBadge (BR-T02).

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "WIHARD makes software easier to find, own, and use for non-technical businesses, and helps creators turn their skills into products.",
  path: "/about",
});

const problems = [
  { icon: PiggyBank, title: "Custom software is expensive", text: "Building from scratch costs more than most small businesses can spend." },
  { icon: Clock, title: "It takes too long", text: "Finding a developer, agreeing on requirements, and building can take months." },
  { icon: Wrench, title: "Technology gets in the way", text: "Without technical skills, it is hard to customize, launch, and maintain software." },
  { icon: UserX, title: "One developer, one point of failure", text: "When the only person who knows the system disappears, so does the support." },
  { icon: Store, title: "Creators lack customers", text: "People who build great tools with modern and AI-assisted methods struggle to reach buyers." },
];

const layers = [
  {
    icon: LayoutGrid,
    title: "Marketplace",
    text: "A catalog of websites, apps, and business tools you can browse by type, industry, or problem — each with clear pricing and support terms.",
    phase: undefined,
  },
  {
    icon: Sparkles,
    title: "AI-powered customization",
    text: "Describe the changes you need in plain language, and get help adapting a product to your business within the limits it lists.",
    phase: 2,
  },
  {
    icon: ShieldCheck,
    title: "Managed lifecycle and trust",
    text: "Products are reviewed before they are published, and WIHARD stays your point of contact. Managed hosting and backups follow later.",
    phase: 3,
  },
];

const principles = [
  { icon: Compass, text: "You choose outcomes, not programming languages." },
  { icon: LayoutGrid, text: "Start from a working product, not a blank screen." },
  { icon: MessageSquareText, text: "Plain language is how you ask for changes." },
  { icon: Headphones, text: "WIHARD is your long-term point of contact." },
  { icon: KeyRound, text: "Your data, ownership, licences, and support terms are always clear." },
  { icon: FileText, text: "Every product explains its support level." },
  { icon: Handshake, text: "Creator profiles build trust, but they are never your only route to help." },
  { icon: Tag, text: "Prices show what is included and what may cost extra." },
  { icon: Scale, text: "Approachable for non-technical people, credible for the creators who build." },
];

const roadmap = [
  { phase: 1, title: "Marketplace", text: "Public website, product catalog and detail pages, creator profiles, and product review." },
  { phase: 2, title: "Purchasing and customization", text: "Buying products, licences, customization requests, and AI-assisted changes." },
  { phase: 3, title: "Deployment and operations", text: "Managed deployment, versions, customer support tools, security, and updates." },
  { phase: 4, title: "Software ecosystem", text: "A larger creator network, better discovery, quality standards, and services for larger businesses." },
];

const promises = [
  { href: "/pricing", title: "Transparent pricing", text: "Every cost, including extras, is listed before you decide." },
  { href: "/support-policy", title: "One point of contact", text: "You reach WIHARD for help, whoever built the product." },
  { href: "/security", title: "Reviewed products", text: "Nothing is published until our team has checked it." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageIntro eyebrow="About WIHARD" title="Software for your work, without coding.">
        WIHARD connects people who need websites, apps, and business tools with the creators who build them. Our goal is
        simple: make finding, owning, and using software easier for everyone — and help creators turn their skills into
        products people rely on.
      </PageIntro>

      <Container className="space-y-16 py-14">
        <ContentSection
          eyebrow="The problem"
          title="Why getting the right software is still hard"
          intro="Small businesses, freelancers, and operations teams need software every day. The usual ways of getting it come with the same obstacles."
        >
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {problems.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-2xl border border-line bg-white p-5">
                <Icon aria-hidden className="size-6 text-brand-600" />
                <h3 className="mt-4 text-sm font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection eyebrow="Who it's for" title="Two sides, one platform">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-surface p-6">
              <h3 className="text-lg font-bold">For businesses and individuals</h3>
              <p className="mt-2 text-sm text-muted">
                Small business owners, shops, service providers, founders, and operations teams who need software but
                don&apos;t want to write code. Find a product that fits, see exactly what it costs and who supports it,
                and make it yours.
              </p>
              <Link href="/templates" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                Explore templates <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
            <div className="rounded-2xl bg-surface p-6">
              <h3 className="text-lg font-bold">For creators</h3>
              <p className="mt-2 text-sm text-muted">
                Independent developers, vibe coders, freelancers, and small studios who build useful software. Publish
                your products, reach the people who need them, and grow your reputation while WIHARD handles the
                customer relationship.
              </p>
              <Link href="/for-creators" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                Build with us <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
        </ContentSection>

        <ContentSection
          eyebrow="What makes WIHARD different"
          title="More than a template store"
          intro="Long-term value comes from connecting three layers in one place. We are building them in stages."
        >
          <ul className="grid gap-6 md:grid-cols-3">
            {layers.map(({ icon: Icon, title, text, phase }) => (
              <li key={title} className="rounded-2xl border border-line bg-white p-6">
                <Icon aria-hidden className="size-6 text-brand-600" />
                <h3 className="mt-4 flex flex-wrap items-center gap-2 font-semibold">
                  {title} {phase && <LaterBadge phase={phase} />}
                </h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection eyebrow="Principles" title="What we hold ourselves to">
          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map(({ icon: Icon, text }) => (
              <li key={text} className="flex gap-3 text-sm">
                <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-600" />
                {text}
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection
          eyebrow="Roadmap"
          title="Where we are today"
          intro="WIHARD opens in stages, so we only promise what already works."
        >
          <ol className="grid gap-6 md:grid-cols-4">
            {roadmap.map((r) => (
              <li
                key={r.phase}
                className={`rounded-2xl p-6 ${r.phase === 1 ? "border-2 border-brand-600 bg-brand-50/50" : "border border-line bg-white"}`}
              >
                <p className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  Phase {r.phase}
                  {r.phase === 1 ? (
                    <span className="rounded bg-brand-600 px-1.5 py-0.5 text-[11px] normal-case tracking-normal text-white">
                      Now
                    </span>
                  ) : (
                    <LaterBadge className="normal-case tracking-normal" />
                  )}
                </p>
                <h3 className="mt-3 font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm text-muted">{r.text}</p>
              </li>
            ))}
          </ol>
        </ContentSection>

        <ContentSection eyebrow="Our promise" title="What you can count on today">
          <ul className="grid gap-6 md:grid-cols-3">
            {promises.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="group block h-full rounded-2xl bg-surface p-6 transition hover:bg-brand-50">
                  <Eye aria-hidden className="size-5 text-brand-600" />
                  <h3 className="mt-3 font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted">{p.text}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                    Read more <ArrowRight aria-hidden className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </ContentSection>

        <CtaBanner
          title="Discover it. Make it yours. Put it to work."
          text="Start from a product that already works for businesses like yours."
          href="/templates"
          label="Explore templates"
        />
      </Container>
    </>
  );
}
