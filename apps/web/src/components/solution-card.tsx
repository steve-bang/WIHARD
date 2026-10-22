import Link from "next/link";
import { ArrowUpRight, FlaskConical, ShieldCheck, SlidersHorizontal, Users } from "lucide-react";
import { getIndustry, type Product } from "@/lib/catalog";
import { ProductPreview } from "./product-preview";

// Card for the solutions page (docs/design/mockups/solutions.png).
export function SolutionCard({ product }: { product: Product }) {
  const support =
    product.status === "beta"
      ? { label: "Beta", icon: FlaskConical }
      : product.support.provider === "creator"
        ? { label: "Creator support", icon: Users }
        : { label: "Platform support", icon: ShieldCheck };
  const SupportIcon = support.icon;
  const { pricing } = product;
  return (
    <Link
      href={`/templates/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <ProductPreview product={product} className="h-40" />
      <div className="flex flex-1 flex-col p-5">
        <span className="w-fit rounded bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
          {getIndustry(product.industry).name}
        </span>
        <h3 className="mt-2 font-semibold">{product.name}</h3>
        <p className="mt-1 flex-1 text-sm text-muted">{product.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-2 text-xs">
          <li className="flex items-center gap-1.5 rounded-md bg-surface px-2.5 py-1 text-ink/70">
            <SlidersHorizontal aria-hidden className="size-3.5" /> Customizable
          </li>
          <li className="flex items-center gap-1.5 rounded-md bg-surface px-2.5 py-1 text-ink/70">
            <SupportIcon aria-hidden className="size-3.5" /> {support.label}
          </li>
        </ul>
        <div className="mt-5 flex items-center justify-between">
          <p>
            <span className="text-xl font-bold text-brand-600">${pricing.startingPrice}</span>
            <span className="ml-1 text-xs text-muted">{pricing.model === "one-time" ? "one-time" : "/month"}</span>
          </p>
          <ArrowUpRight aria-hidden className="size-4 text-brand-600" />
        </div>
      </div>
    </Link>
  );
}
