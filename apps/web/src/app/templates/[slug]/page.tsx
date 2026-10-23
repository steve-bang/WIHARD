import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ChartColumn,
  Check,
  ChevronRight,
  ExternalLink,
  Headphones,
  Layers,
  ListChecks,
  ShieldCheck,
  SlidersHorizontal,
  Workflow,
  X,
} from "lucide-react";
import { Avatar } from "@/components/avatar";
import { Container } from "@/components/container";
import { Journey } from "@/components/journey";
import { ProductGallery } from "@/components/product-gallery";
import { ProductPreview } from "@/components/product-preview";
import { SectionTabs } from "@/components/section-tabs";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { ShareButton } from "@/components/share-button";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import {
  getCategory,
  getCreator,
  getProduct,
  getProducts,
  getRelatedProducts,
  type Product,
  type ProductStatus,
  type SupportProvider,
} from "@/lib/catalog";

// Layout follows docs/design/mockups/template-details.png; content covers FR-P01–P13.

const statusLabel: Record<ProductStatus, string> = {
  active: "Active",
  beta: "Beta",
  deprecated: "No longer developed",
};

const supportLabel: Record<SupportProvider, { short: string; long: string }> = {
  platform: { short: "Platform", long: "Supported by WIHARD." },
  creator: { short: "Creator", long: "Fixed by the creator, with WIHARD as your point of contact." },
  "platform-and-creator": { short: "Platform + creator", long: "Supported by WIHARD and the creator." },
};

const categorySingular: Record<Product["category"], string> = {
  websites: "website",
  apps: "app",
  "business-tools": "business tool",
};

const sections = [
  ["overview", "Overview"],
  ["features", "Features"],
  ["customization", "Customization"],
  ["deployment", "Deployment"],
  ["pricing", "Pricing"],
  ["support", "Support"],
  ["updates", "Updates"],
  ["faq", "FAQ"],
] as const;

const featureIcons = [Layers, Workflow, ListChecks, ChartColumn];

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(iso));

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/templates/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return pageMetadata({
    // e.g. "Shoply – E-commerce website": the primary tag is the keyword people search for.
    title: `${product.name} – ${product.tags[0]} ${categorySingular[product.category]}`,
    description: product.description,
    path: `/templates/${product.slug}`,
    image: { url: `/templates/${product.slug}/opengraph-image`, alt: `${product.name} on WIHARD` },
  });
}

export default async function ProductPage({ params }: PageProps<"/templates/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const creator = getCreator(product.creatorSlug);
  const support = supportLabel[product.support.provider];
  const price = product.pricing.included[0];
  const gallery = { name: product.name, category: product.category, screenshots: product.screenshots };

  return (
    <article className="bg-gradient-to-b from-surface to-white">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            category: category.name,
            url: absoluteUrl(`/templates/${product.slug}`),
            image: absoluteUrl(`/templates/${product.slug}/opengraph-image`),
            brand: { "@type": "Brand", name: creator?.name ?? "WIHARD" },
            offers: {
              "@type": "Offer",
              price: product.pricing.startingPrice,
              priceCurrency: "USD",
              url: absoluteUrl(`/templates/${product.slug}`),
              // Purchasing opens in Phase 2; until then products are listed, not sold.
              availability: "https://schema.org/PreOrder",
            },
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Templates", path: "/templates" },
            { name: category.name, path: `/templates/${category.slug}` },
            { name: product.name, path: `/templates/${product.slug}` },
          ]),
        ]}
      />
      {/* Header: FR-P01–P03, FR-P13 */}
      <Container className="py-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
            {[
              ["/", "Home"],
              ["/templates", "Templates"],
              [`/templates/${category.slug}`, category.name],
            ].map(([href, label]) => (
              <li key={href} className="flex items-center gap-1.5">
                <Link href={href} className="hover:text-ink">
                  {label}
                </Link>
                <ChevronRight aria-hidden className="size-3" />
              </li>
            ))}
            <li aria-current="page" className="text-ink">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_1fr]">
          <ProductGallery
            product={gallery}
            badge={
              <span className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-brand-600 shadow-sm">
                <ShieldCheck aria-hidden className="size-4" /> Reviewed
              </span>
            }
          />

          <div>
            <div className="flex gap-2 text-xs font-medium">
              <span className="rounded bg-brand-50 px-2 py-0.5 text-brand-700">{category.name}</span>
              {product.status !== "active" && (
                <span className="rounded bg-amber-50 px-2 py-0.5 text-amber-700">{statusLabel[product.status]}</span>
              )}
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{product.name}</h1>
            <p className="mt-3 text-lg text-muted">{product.tagline}</p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
              {product.tags.map((t) => (
                <li key={t} className="rounded-md bg-brand-50 px-2.5 py-1 text-xs text-ink/80">
                  {t}
                </li>
              ))}
            </ul>

            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              <Trust icon={SlidersHorizontal} title="Customizable" text={`${product.customization.allowed.length} options listed below`} />
              <Trust icon={ShieldCheck} title="Reviewed product" text="Quality checked by WIHARD" />
              <Trust icon={Headphones} title={`${support.short} support`} text={product.support.responseTime} />
            </ul>

            <p className="mt-6 text-3xl font-bold">
              {price.amount}
              {price.note && <span className="ml-1 text-sm font-normal text-muted">/ {price.note.toLowerCase()}</span>}
            </p>
            <p className="text-sm text-muted">
              Additional costs may apply.{" "}
              <a href="#pricing" className="text-brand-600 underline">
                See full pricing
              </a>
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/contact?product=${product.slug}`}
                className="flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-medium text-white hover:bg-brand-700"
              >
                Make it yours <ArrowRight aria-hidden className="size-4" />
              </Link>
              {product.demoUrl && (
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-brand-600 px-6 py-3 text-sm font-medium text-brand-600 hover:bg-brand-50"
                >
                  Live demo <ExternalLink aria-hidden className="size-4" />
                </a>
              )}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              {creator && (
                <div className="flex items-center gap-3 text-xs">
                  <Avatar name={creator.name} className="size-9 text-xs" />
                  <div>
                    <p className="font-medium">By {creator.name}</p>
                    <p className="text-muted">Last updated {formatDate(product.versions[0].date)}</p>
                  </div>
                </div>
              )}
              <ShareButton title={product.name} />
            </div>
          </div>
        </div>
      </Container>

      <SectionTabs sections={sections} />

      <Container className="space-y-16 py-12">
        {/* FR-P04, FR-P05 */}
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-bold">Overview</h2>
            <p className="mt-3 max-w-2xl text-muted">{product.description}</p>
            <p className="mt-3 text-sm">
              <span className="font-medium">Best for:</span>{" "}
              <span className="text-muted">{product.audience.join(", ")}</span>
            </p>
            <ul id="features" className="mt-8 grid scroll-mt-20 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {product.features.map((f, i) => {
                const Icon = featureIcons[i % featureIcons.length];
                return (
                  <li key={f.title}>
                    <Icon aria-hidden className="size-7 text-brand-600" />
                    <h3 className="mt-3 text-sm font-semibold">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted">{f.description}</p>
                  </li>
                );
              })}
            </ul>
          </section>

          <section id="customization" className="scroll-mt-20 rounded-2xl bg-surface p-6">
            <h2 className="font-semibold">What you can customize</h2>
            <CheckList items={product.customization.allowed} />
            {product.customization.notAllowed.length > 0 && (
              <>
                <h3 className="mt-6 text-sm font-semibold">Not supported</h3>
                <CheckList items={product.customization.notAllowed} negative />
              </>
            )}
          </section>
        </div>

        <section className="rounded-2xl bg-surface p-8">
          <h2 className="text-xl font-bold">How it works</h2>
          <p className="mb-8 mt-1 text-sm text-muted">From finding {product.name} to putting it to work.</p>
          <Journey />
        </section>

        {/* Screenshots + FR-P08, FR-P09, FR-P10 */}
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <section>
            <h2 className="mb-4 text-xl font-bold">Screenshots</h2>
            <ProductGallery product={gallery} orientation="vertical" />
          </section>

          <div className="space-y-6">
            <section id="support" className="scroll-mt-20">
              <h2 className="mb-4 text-xl font-bold">Support &amp; Updates</h2>
              <dl className="divide-y divide-line rounded-2xl border border-line bg-white">
                <SupportRow term="Support level" badge={support.short}>
                  {support.long} Covers {product.support.coverage.join(", ").toLowerCase()}. Response{" "}
                  {product.support.responseTime.toLowerCase()}, for {product.support.duration.toLowerCase()}.
                </SupportRow>
                <SupportRow term="Updates" badge="Included" tone="green">
                  Version updates during the support period.
                </SupportRow>
                <SupportRow term="Maintenance" badge={product.status === "beta" ? "Beta" : support.short}>
                  {product.maintenance}
                </SupportRow>
              </dl>
              <p className="mt-3 text-xs text-muted">
                You can always contact WIHARD directly — see our{" "}
                <Link href="/support-policy" className="text-brand-600 underline">
                  support policy
                </Link>
                .
              </p>
            </section>

            {creator && (
              <section className="rounded-2xl border border-line bg-white p-6">
                <h2 className="font-bold">Creator</h2>
                <div className="mt-4 flex gap-4">
                  <Avatar name={creator.name} className="size-12 text-sm" />
                  <div>
                    <p className="font-semibold">{creator.name}</p>
                    <p className="mt-1 text-sm text-muted">{creator.bio}</p>
                    <p className="mt-2 text-xs text-muted">{creator.skills.join(" · ")}</p>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>

        {/* FR-P06, FR-P07 (BR-T01) */}
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <section id="deployment" className="scroll-mt-20 rounded-2xl border border-line bg-white p-6">
            <h2 className="text-xl font-bold">Deployment &amp; hosting</h2>
            <p className="mt-3 text-sm text-muted">{product.deployment}</p>
          </section>
          <section id="pricing" className="scroll-mt-20 rounded-2xl border border-line bg-white p-6">
            <h2 className="text-xl font-bold">Pricing</h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <PriceList title="Included in the price" items={product.pricing.included} />
              <PriceList title="Possible additional costs" items={product.pricing.possibleExtras} />
            </div>
          </section>
        </div>

        {/* FR-P11 */}
        <section id="updates" className="scroll-mt-20">
          <h2 className="mb-4 text-xl font-bold">Version history</h2>
          <ol className="space-y-4 border-l-2 border-brand-100 pl-6">
            {product.versions.map((v) => (
              <li key={v.version} className="relative">
                <span className="absolute -left-[31px] top-1.5 size-3 rounded-full bg-brand-600" />
                <p className="text-sm">
                  <span className="font-semibold">v{v.version}</span>
                  <span className="text-muted"> · {formatDate(v.date)}</span>
                </p>
                <p className="text-sm text-muted">{v.notes}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FR-P12 */}
        <section id="faq" className="scroll-mt-20">
          <h2 className="mb-4 text-xl font-bold">FAQ</h2>
          <FaqList items={product.faq} />
        </section>

        {/* FR-D07 */}
        <RelatedProducts product={product} />
      </Container>
    </article>
  );
}

function Trust({ icon: Icon, title, text }: { icon: typeof ShieldCheck; title: string; text: string }) {
  return (
    <li className="flex gap-2">
      <Icon aria-hidden className="size-5 shrink-0 text-brand-600" />
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted">{text}</p>
      </div>
    </li>
  );
}

function CheckList({ items, negative = false }: { items: string[]; negative?: boolean }) {
  const Icon = negative ? X : Check;
  return (
    <ul className="mt-4 space-y-3 text-sm">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Icon aria-hidden className={`size-4 shrink-0 ${negative ? "text-muted" : "text-brand-600"}`} />
          <span className={negative ? "text-muted" : ""}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SupportRow({
  term,
  badge,
  tone = "brand",
  children,
}: {
  term: string;
  badge: string;
  tone?: "brand" | "green";
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-4 p-5">
      <dt className="text-sm font-medium">{term}</dt>
      <dd>
        <span
          className={`rounded px-2 py-0.5 text-xs font-medium ${tone === "green" ? "bg-emerald-50 text-emerald-700" : "bg-brand-50 text-brand-700"}`}
        >
          {badge}
        </span>
        <p className="mt-1.5 text-xs text-muted">{children}</p>
      </dd>
    </div>
  );
}

function PriceList({ title, items }: { title: string; items: { label: string; amount: string; note?: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-2 divide-y divide-line text-sm">
        {items.map((i) => (
          <li key={i.label} className="flex justify-between gap-4 py-2">
            <span>
              {i.label}
              {i.note && <span className="block text-xs text-muted">{i.note}</span>}
            </span>
            <span className="font-medium">{i.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RelatedProducts({ product }: { product: Product }) {
  const related = getRelatedProducts(product);
  if (related.length === 0) return null;
  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">Related templates</h2>
          <p className="text-sm text-muted">You might also like these templates.</p>
        </div>
        <Link href="/templates" className="flex items-center gap-1 text-sm font-medium text-brand-600">
          View all <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/templates/${p.slug}`}
              className="block overflow-hidden rounded-xl border border-line bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <ProductPreview product={p} className="h-28" />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold">{p.name}</h3>
                  <span className="text-sm font-semibold text-brand-600">{p.pricing.included[0].amount}</span>
                </div>
                <p className="mt-1 text-xs text-muted">{p.tagline}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
