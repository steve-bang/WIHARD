import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ExternalLink, X } from "lucide-react";
import { Container } from "@/components/container";
import { ProductGrid } from "@/components/product-card";
import { ProductPreview } from "@/components/product-preview";
import {
  getCategory,
  getCreator,
  getProduct,
  getProducts,
  getRelatedProducts,
  type ProductStatus,
  type SupportProvider,
} from "@/lib/catalog";

const statusLabel: Record<ProductStatus, string> = {
  active: "Active",
  beta: "Beta",
  deprecated: "No longer developed",
};

const supportLabel: Record<SupportProvider, string> = {
  platform: "WIHARD",
  creator: "The creator, with WIHARD as your point of contact",
  "platform-and-creator": "WIHARD and the creator",
};

const sections = [
  ["overview", "Overview"],
  ["customization", "Customization"],
  ["deployment", "Deployment"],
  ["pricing", "Pricing"],
  ["support", "Support"],
  ["updates", "Updates"],
  ["faq", "FAQ"],
] as const;

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/templates/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return { title: product.name, description: product.tagline };
}

export default async function ProductPage({ params }: PageProps<"/templates/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const creator = getCreator(product.creatorSlug);
  const related = getRelatedProducts(product);

  return (
    <article>
      <Container className="py-10">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link href="/templates">Templates</Link> / <Link href={`/templates/${category.slug}`}>{category.name}</Link> /{" "}
          <span className="text-ink">{product.name}</span>
        </nav>

        {/* FR-P01–P03, FR-P13 */}
        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <ProductPreview product={product} className="aspect-video rounded-2xl" />
          <div>
            <div className="flex gap-2 text-xs font-medium">
              <span className="rounded bg-brand-50 px-2 py-0.5 text-brand-700">{category.name}</span>
              <span className="rounded bg-surface px-2 py-0.5 text-muted">{statusLabel[product.status]}</span>
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{product.name}</h1>
            <p className="mt-3 text-lg text-muted">{product.tagline}</p>
            <p className="mt-6 text-2xl font-bold">
              {product.pricing.included[0].amount}
              <span className="ml-2 text-sm font-normal text-muted">{product.pricing.included[0].note}</span>
            </p>
            <p className="text-sm text-muted">Additional costs may apply — see pricing below.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/contact?product=${product.slug}`}
                className="flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-3 font-medium text-white hover:bg-brand-700"
              >
                Make it yours <ArrowRight aria-hidden className="size-4" />
              </Link>
              {product.demoUrl && (
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-brand-600 px-5 py-3 font-medium text-brand-600"
                >
                  Live demo <ExternalLink aria-hidden className="size-4" />
                </a>
              )}
            </div>
            {creator && (
              <p className="mt-6 text-sm text-muted">
                By <span className="font-medium text-ink">{creator.name}</span> · Last updated {product.versions[0].date}
              </p>
            )}
          </div>
        </div>
      </Container>

      <nav aria-label="Sections" className="sticky top-0 z-10 border-y border-line bg-white/95 backdrop-blur">
        <Container className="flex gap-6 overflow-x-auto py-3 text-sm text-muted">
          {sections.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="whitespace-nowrap hover:text-ink">
              {label}
            </a>
          ))}
        </Container>
      </nav>

      <Container className="space-y-14 py-12">
        {/* FR-P04 */}
        <Section id="overview" title="Overview">
          <p className="max-w-3xl text-muted">{product.description}</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <List title="Main features" items={product.features} />
            <List title="Who it's for" items={product.audience} />
          </div>
        </Section>

        {/* FR-P05, BR-T03 */}
        <Section id="customization" title="What you can customize">
          <div className="grid gap-6 md:grid-cols-2">
            <List title="Included" items={product.customization.allowed} icon="check" />
            <List title="Not supported" items={product.customization.notAllowed} icon="x" />
          </div>
          <p className="mt-4 text-sm text-muted">
            Customization in plain language with AI assistance opens in a later phase. Until then, describe what you
            need when you register your interest.
          </p>
        </Section>

        {/* FR-P06 */}
        <Section id="deployment" title="Deployment and hosting">
          <p className="text-muted">{product.deployment}</p>
        </Section>

        {/* FR-P07, BR-T01 */}
        <Section id="pricing" title="Pricing">
          <div className="grid gap-6 md:grid-cols-2">
            <PriceTable title="Included in the price" items={product.pricing.included} />
            <PriceTable title="Possible additional costs" items={product.pricing.possibleExtras} />
          </div>
        </Section>

        {/* FR-P08, BR-T04, BR-T05 */}
        <Section id="support" title="Support">
          <dl className="grid gap-4 sm:grid-cols-2">
            <Fact term="Provided by" value={supportLabel[product.support.provider]} />
            <Fact term="Covers" value={product.support.coverage.join(", ")} />
            <Fact term="Response time" value={product.support.responseTime} />
            <Fact term="Duration" value={product.support.duration} />
          </dl>
          <p className="mt-4 text-sm text-muted">
            You can always reach WIHARD directly through our{" "}
            <Link href="/support-policy" className="text-brand-600 underline">
              support policy
            </Link>{" "}
            channels.
          </p>
        </Section>

        {/* FR-P09–P11 */}
        <Section id="updates" title="Updates and maintenance">
          <p className="text-muted">{product.maintenance}</p>
          <ol className="mt-4 space-y-3">
            {product.versions.map((v) => (
              <li key={v.version} className="text-sm">
                <span className="font-semibold">v{v.version}</span> <span className="text-muted">· {v.date}</span>
                <p className="text-muted">{v.notes}</p>
              </li>
            ))}
          </ol>
          {creator && (
            <div className="mt-6 rounded-xl border border-line p-5">
              <h3 className="font-semibold">About the creator: {creator.name}</h3>
              <p className="mt-1 text-sm text-muted">{creator.bio}</p>
            </div>
          )}
        </Section>

        {/* FR-P12 */}
        <Section id="faq" title="FAQ">
          <dl className="space-y-4">
            {product.faq.map((f) => (
              <div key={f.question}>
                <dt className="font-medium">{f.question}</dt>
                <dd className="mt-1 text-muted">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* FR-D07 */}
        {related.length > 0 && (
          <Section id="related" title="Related products">
            <ProductGrid products={related} />
          </Section>
        )}
      </Container>
    </article>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-16">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

function List({ title, items, icon }: { title: string; items: string[]; icon?: "check" | "x" }) {
  const Icon = icon === "x" ? X : Check;
  return (
    <div className="rounded-xl bg-surface p-5">
      <h3 className="font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <Icon aria-hidden className={`size-4 shrink-0 ${icon === "x" ? "text-muted" : "text-brand-600"}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PriceTable({ title, items }: { title: string; items: { label: string; amount: string; note?: string }[] }) {
  return (
    <div className="rounded-xl border border-line p-5">
      <h3 className="font-semibold">{title}</h3>
      <ul className="mt-3 divide-y divide-line text-sm">
        {items.map((i) => (
          <li key={i.label} className="flex justify-between gap-4 py-2">
            <span>
              {i.label}
              {i.note && <span className="block text-muted">{i.note}</span>}
            </span>
            <span className="font-medium">{i.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Fact({ term, value }: { term: string; value: string }) {
  return (
    <div className="rounded-xl bg-surface p-4">
      <dt className="text-sm text-muted">{term}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}
