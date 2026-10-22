import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  ChartNoAxesCombined,
  CloudUpload,
  FilePenLine,
  FileText,
  Headphones,
  Rocket,
  Send,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { Avatar } from "@/components/avatar";
import { Container } from "@/components/container";
import { CreatorsIllustration } from "@/components/home-illustrations";
import { Journey } from "@/components/journey";
import { ProductPreview } from "@/components/product-preview";
import { getCreator, getProducts } from "@/lib/catalog";
import type { JourneyStep } from "@/lib/journey";

// Layout follows docs/design/mockups/for-creators.png. Copy is limited to what Phase 1 delivers
// (BR-T02): payouts open with transactions in Phase 2, and hosting/operations in Phase 3.

export const metadata: Metadata = pageMetadata({
  title: "For creators",
  description:
    "Publish your websites, apps, and business tools on WIHARD. Reach customers who need them, set your price, and get platform support.",
  path: "/for-creators",
});

// Until the creator dashboard exists, sign-up goes through the "Build with us" form (FR-L02).
const SIGN_UP = "/contact?topic=creator";

const benefits = [
  { icon: Users, title: "Reach real customers", text: "Get your products in front of people looking for solutions." },
  { icon: BadgeDollarSign, title: "Set your price", text: "You choose the price. Sales open in a later phase." },
  { icon: ShieldCheck, title: "Clear standards", text: "Quality guidelines ensure a better experience for everyone." },
  { icon: Headphones, title: "Platform support", text: "WIHARD is the customer's point of contact, not just you." },
  { icon: Star, title: "Build your reputation", text: "Showcase your work and grow your personal brand." },
];

const reasons = [
  { icon: Send, title: "Simple publishing process", text: "Submit your product, provide details, and get listed after review." },
  { icon: BadgeDollarSign, title: "Your pricing", text: "Set your own price and list every extra cost up front." },
  { icon: FileText, title: "Transparent terms", text: "Clear commercial terms and intellectual property rules." },
  { icon: Headphones, title: "Ongoing support", text: "We help with review feedback, policy questions, and your account." },
];

const steps: JourneyStep[] = [
  { title: "Create your product", icon: FilePenLine, available: true, text: "Build a website, app, or business tool and prepare the details." },
  { title: "Submit for review", icon: CloudUpload, available: true, text: "We check quality, security, and licensing against our guidelines." },
  { title: "Publish on WIHARD", icon: Rocket, available: true, text: "Your product goes live and becomes discoverable by customers." },
  { title: "Earn and grow", icon: ChartNoAxesCombined, available: false, text: "Track performance, get paid, and keep improving." },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">{children}</p>;
}

export default function ForCreatorsPage() {
  const featured = ["alex-chen", "sarah-kim", "david-lee"].map((slug) => getCreator(slug)!);
  const products = getProducts();

  return (
    <>
      <section className="overflow-hidden bg-gradient-to-br from-white via-brand-50/60 to-brand-100/60">
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-2">
          <div>
            <p className="flex items-center gap-2 text-xs font-medium">
              <span className="rounded-full bg-brand-100 px-3 py-1 text-brand-700">For Creators</span>
              <span className="text-brand-600">· Build. Share. Earn.</span>
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Turn your ideas
              <br />
              into real products.
              <br />
              <span className="text-brand-600">Reach more people.</span>
            </h1>
            <p className="mt-5 max-w-lg text-muted">
              Publish websites, applications, and business tools on WIHARD. Reach customers who need them, and focus
              on what you do best — building.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={SIGN_UP}
                className="flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-medium text-white hover:bg-brand-700"
              >
                Become a creator <ArrowRight aria-hidden className="size-4" />
              </Link>
              <a
                href="#how-it-works"
                className="rounded-lg border border-brand-600 px-5 py-3 text-sm font-medium text-brand-600 hover:bg-brand-50"
              >
                Learn more
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            <CreatorsIllustration name="Alex Chen" role="Full-stack developer" />
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-surface/60">
        <Container className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <span className="flex size-11 items-center justify-center rounded-full bg-brand-50">
                <Icon aria-hidden className="size-5 text-brand-600" />
              </span>
              <h2 className="mt-4 text-sm font-semibold">{title}</h2>
              <p className="mt-1 text-xs text-muted">{text}</p>
            </div>
          ))}
        </Container>
      </section>

      <Container className="grid items-center gap-10 py-16 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <Eyebrow>The benefits</Eyebrow>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Why create on WIHARD?</h2>
          <p className="mt-4 text-muted">
            We give you the audience, the standards, and the support to turn your ideas into products people use.
            Whether you&apos;re a solo creator or a small team, WIHARD helps you publish and grow without handling every
            customer conversation yourself.
          </p>
          <Link
            href={SIGN_UP}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-medium text-white hover:bg-brand-700"
          >
            Join the creator community <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-xl border border-line bg-surface/60 p-5">
              <Icon aria-hidden className="size-5 text-brand-600" />
              <h3 className="mt-3 text-sm font-semibold">{title}</h3>
              <p className="mt-1 text-xs text-muted">{text}</p>
            </div>
          ))}
        </div>
      </Container>

      <section id="how-it-works" className="scroll-mt-4 bg-surface py-14">
        <Container>
          <Eyebrow>Get started</Eyebrow>
          <h2 className="mb-8 mt-2 text-2xl font-bold sm:text-3xl">How it works</h2>
          <Journey steps={steps} />
        </Container>
      </section>

      <Container className="space-y-14 py-16">
        <section>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Featured creators</Eyebrow>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Real creators. Real products.</h2>
              <p className="mt-2 max-w-lg text-sm text-muted">
                From indie developers to small studios, creators on WIHARD build useful products for real businesses.
              </p>
            </div>
            <Link href="/templates" className="flex items-center gap-1 text-sm font-medium text-brand-600">
              Browse their templates <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {featured.map((creator) => {
              const theirs = products.filter((p) => p.creatorSlug === creator.slug);
              return (
                <li key={creator.slug} className="overflow-hidden rounded-xl border border-line bg-white shadow-sm">
                  {theirs[0] && <ProductPreview product={theirs[0]} className="h-32" />}
                  <div className="p-5">
                    <div className="flex items-center gap-3">
                      <Avatar name={creator.name} className="size-10 text-xs" />
                      <div>
                        <p className="text-sm font-semibold">{creator.name}</p>
                        <p className="text-xs text-muted">{creator.skills.join(" · ")}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted">{creator.bio}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {theirs.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/templates/${p.slug}`}
                            className="flex items-center gap-1 rounded-md bg-brand-50 px-2 py-0.5 text-xs text-brand-700 hover:bg-brand-100"
                          >
                            {p.name} <ArrowRight aria-hidden className="size-3" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-ink to-brand-700 px-8 py-10 text-white">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-100">Ready to get started?</p>
            <h2 className="mt-1 text-2xl font-bold">Turn your skills into opportunities.</h2>
            <p className="mt-1 text-sm text-slate-300">Join WIHARD and start building and sharing your products.</p>
          </div>
          <Link
            href={SIGN_UP}
            className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-brand-700 hover:bg-brand-50"
          >
            Become a creator <ArrowRight aria-hidden className="size-4" />
          </Link>
        </section>
      </Container>
    </>
  );
}
