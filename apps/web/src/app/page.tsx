import Link from "next/link";
import { ArrowRight, Boxes, ShieldCheck, Users, Zap } from "lucide-react";
import { Container } from "@/components/container";
import { Journey } from "@/components/journey";
import { ProductGrid } from "@/components/product-card";
import { getProducts } from "@/lib/catalog";
import { siteConfig } from "@/lib/site";

const highlights = [
  { icon: Zap, title: "No coding skills needed", text: "Start from a working product instead of a blank screen." },
  { icon: Boxes, title: "Real business solutions", text: "Products built for actual workflows and use cases." },
  { icon: ShieldCheck, title: "Platform you can contact", text: "WIHARD stays your point of contact, not only the creator." },
  { icon: Users, title: "For creators", text: "Publish your products and reach customers who need them." },
];

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-20">
        <Container>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Build software for your work, <span className="text-brand-600">without coding.</span>
          </h1>
          <p className="mt-4 text-xl text-muted">{siteConfig.tagline}</p>
          <p className="mt-2 max-w-xl text-muted">{siteConfig.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/templates" className="rounded-lg bg-brand-600 px-5 py-3 font-medium text-white hover:bg-brand-700">
              Explore templates
            </Link>
            <Link href="/how-it-works" className="rounded-lg border border-line bg-white px-5 py-3 font-medium hover:bg-surface">
              How it works
            </Link>
          </div>
        </Container>
      </section>

      <Container className="grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex gap-3">
            <Icon aria-hidden className="size-6 shrink-0 text-brand-600" />
            <div>
              <h2 className="font-semibold">{title}</h2>
              <p className="mt-1 text-sm text-muted">{text}</p>
            </div>
          </div>
        ))}
      </Container>

      <Container className="py-10">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Ready-to-use templates</h2>
          <Link href="/templates" className="flex items-center gap-1 text-sm font-medium text-brand-600">
            View all <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <ProductGrid products={getProducts().slice(0, 3)} />
      </Container>

      <Container className="py-14">
        <h2 className="mb-6 text-2xl font-bold">How it works</h2>
        <Journey />
      </Container>

      <Container className="pb-20">
        <div className="rounded-2xl bg-brand-50 p-8 sm:p-12">
          <h2 className="text-2xl font-bold">Share your products. Reach customers.</h2>
          <p className="mt-2 max-w-xl text-muted">
            Publish websites, apps, and business tools, and let the platform handle the customer relationship.
          </p>
          <Link href="/for-creators" className="mt-6 inline-block rounded-lg bg-ink px-5 py-3 font-medium text-white">
            Build with us
          </Link>
        </div>
      </Container>
    </>
  );
}
