import Link from "next/link";
import { ArrowUpRight, FlaskConical, ShieldCheck, SlidersHorizontal, Users, type LucideIcon } from "lucide-react";
import { getCategory, getIndustry, type Product, type SupportProvider } from "@/lib/catalog";
import { ProductPreview } from "./product-preview";

// Card for listing pages (docs/design/mockups/templates.png). The badge shows the support model
// rather than "Verified"/"Popular", which have no data behind them yet (BR-T02).
const supportBadge: Record<SupportProvider, { label: string; icon: LucideIcon }> = {
  platform: { label: "Platform-managed", icon: ShieldCheck },
  "platform-and-creator": { label: "Platform + creator", icon: ShieldCheck },
  creator: { label: "Creator-supported", icon: Users },
};

export function TemplateCard({ product }: { product: Product }) {
  const price = product.pricing;
  const badge =
    product.status === "beta"
      ? { label: "Beta", icon: FlaskConical, className: "bg-amber-500 text-white" }
      : { ...supportBadge[product.support.provider], className: "bg-white text-brand-700" };
  const BadgeIcon = badge.icon;
  return (
    <Link
      href={`/templates/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative">
        <ProductPreview product={product} className="h-44" />
        <span className={`absolute left-3 top-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${badge.className}`}>
          <BadgeIcon aria-hidden className="size-3.5" />
          {badge.label}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="mt-1 flex-1 text-sm text-muted">{product.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {[getCategory(product.category).name, getIndustry(product.industry).name].map((c) => (
            <li key={c} className="rounded-full bg-surface px-3 py-1 text-xs text-ink/70">
              {c}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 whitespace-nowrap text-xs text-muted">
            <SlidersHorizontal aria-hidden className="size-4" />
            {product.customization.allowed.length} customizations
          </span>
          <span className="flex items-center gap-3">
            <span className="whitespace-nowrap text-right leading-tight">
              <span className="block font-semibold text-brand-600">${price.startingPrice}</span>
              <span className="text-[11px] text-muted">{price.model === "one-time" ? "one-time" : "monthly"}</span>
            </span>
            <ArrowUpRight aria-hidden className="size-4 text-brand-600" />
          </span>
        </div>
      </div>
    </Link>
  );
}
