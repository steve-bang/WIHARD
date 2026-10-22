import Link from "next/link";
import { ArrowRight, Boxes, Headphones, RefreshCw, ShieldCheck, Tag, Users, Zap } from "lucide-react";
import { Container } from "@/components/container";
import { CreatorIllustration, HeroIllustration } from "@/components/home-illustrations";
import { Journey } from "@/components/journey";
import { ProductGrid } from "@/components/product-card";
import { SearchForm } from "@/components/search-form";
import { getCreator, getProducts } from "@/lib/catalog";
import { siteConfig } from "@/lib/site";

const popular = [
  { label: "Website", href: "/templates/websites" },
  { label: "CRM", href: "/solutions/customer-management" },
  { label: "Booking", href: "/solutions/booking-management" },
  { label: "Garage Management", href: "/solutions/garage-management" },
  { label: "Business Tools", href: "/templates/business-tools" },
];

const highlights = [
  { icon: Zap, title: "No coding skills needed", text: "Start from a working product instead of a blank screen." },
  { icon: Boxes, title: "Real business solutions", text: "Templates built for actual workflows and use cases." },
  { icon: ShieldCheck, title: "Trusted platform", text: "WIHARD stays your point of contact, not only the creator." },
  { icon: Users, title: "For creators", text: "Build, share, and monetize your ideas." },
];

// Copy kept within what Phase 1 delivers (BR-T02).
const reasons = [
  { icon: ShieldCheck, title: "Reviewed products", text: "Every product is checked before it is published." },
  { icon: Headphones, title: "One point of contact", text: "Reach WIHARD for support, not only the creator." },
  { icon: RefreshCw, title: "Reviewed updates", text: "Creators publish updates; we review each version." },
  { icon: Tag, title: "Transparent pricing", text: "Every cost, including extras, listed up front." },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">{children}</p>;
}

export default function Home() {
  const featuredCreator = getCreator("alex-chen")!;
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-gradient-to-br from-white via-brand-50/60 to-brand-100/60">
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700">
              <Zap aria-hidden className="size-3" /> No coding required
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Build software for your work, <span className="text-brand-600">without coding.</span>
            </h1>
            <p className="mt-5 text-lg text-ink/80">{siteConfig.tagline}</p>
            <SearchForm className="mt-8 max-w-md" />
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-medium text-muted">Popular:</span>
              {popular.map((p) => (
                <Link key={p.label} href={p.href} className="rounded-full bg-white/80 px-3 py-1 text-ink/80 shadow-sm hover:text-brand-600">
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroIllustration />
          </div>
        </Container>
      </section>

      {/* Highlights */}
      <Container className="grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex gap-4">
            <Icon aria-hidden className="size-6 shrink-0 text-brand-600" />
            <div>
              <h2 className="text-sm font-semibold">{title}</h2>
              <p className="mt-1 text-sm text-muted">{text}</p>
            </div>
          </div>
        ))}
      </Container>

      {/* Popular templates */}
      <Container className="py-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Popular templates</Eyebrow>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Ready-to-use templates
              <br />
              for every business need
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted">
              Get started with ready-made templates. Customize them to fit your workflow and make them your own.
            </p>
            <Link
              href="/templates"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              Browse all templates <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          <Link href="/templates" className="flex items-center gap-1 text-sm font-medium text-brand-600">
            View all templates <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <ProductGrid products={getProducts().slice(0, 4)} columns={4} />
      </Container>

      {/* How it works */}
      <Container className="py-12">
        <div className="rounded-2xl bg-surface p-8 sm:p-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>How it works</Eyebrow>
              <h2 className="mt-2 text-2xl font-bold">From idea to live in 4 simple steps</h2>
            </div>
            <Link href="/how-it-works" className="flex items-center gap-1 text-sm font-medium text-brand-600">
              Learn more about how it works <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          <Journey />
        </div>
      </Container>

      {/* For creators */}
      <Container className="py-6">
        <div className="grid items-center gap-10 rounded-2xl bg-gradient-to-r from-brand-50 to-brand-100 p-8 sm:p-12 lg:grid-cols-2">
          <div>
            <Eyebrow>For creators</Eyebrow>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Share your ideas.
              <br />
              Build your audience.
            </h2>
            <p className="mt-3 max-w-sm text-muted">
              Turn your vibe coding projects into real products. Reach more users and earn from your creations.
            </p>
            <Link
              href="/for-creators"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-medium text-white"
            >
              Become a creator <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          <div className="hidden sm:block">
            <CreatorIllustration
              name={featuredCreator.name}
              role={featuredCreator.skills.slice(0, 2).join(" · ")}
              templates={getProducts().filter((p) => p.creatorSlug === featuredCreator.slug).length}
            />
          </div>
        </div>
      </Container>

      {/* Why WIHARD */}
      <Container className="py-16 text-center">
        <Eyebrow>Why WIHARD</Eyebrow>
        <h2 className="mt-2 text-2xl font-bold">The trusted platform for creators and users</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
          More than a marketplace: the central point of contact for finding, owning, and running your software.
        </p>
        <div className="mt-10 grid gap-8 text-left sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-50">
                <Icon aria-hidden className="size-5 text-brand-600" />
              </span>
              <div>
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="mt-1 text-xs text-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
