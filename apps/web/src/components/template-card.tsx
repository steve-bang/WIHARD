import Link from "next/link";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import { getCategory, getSolution, type Product } from "@/lib/catalog";
import { ProductPreview } from "./product-preview";

// Card for listing pages (docs/design/mockups/templates.png).
export function TemplateCard({ product }: { product: Product }) {
  const price = product.pricing;
  const chips = [getCategory(product.category).name, getSolution(product.solutions[0] ?? "")?.name ?? product.tags[0]];
  return (
    <Link
      href={`/templates/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative">
        <ProductPreview product={product} className="h-40" />
        {product.status !== "active" && (
          <span className="absolute left-3 top-3 rounded-md bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white">
            {product.status === "beta" ? "Beta" : "No longer developed"}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="mt-1 flex-1 text-sm text-muted">{product.tagline}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {chips.map((c) => (
            <li key={c} className="rounded-md bg-brand-50 px-2 py-0.5 text-xs text-brand-700">
              {c}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-end justify-between border-t border-line pt-3">
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <SlidersHorizontal aria-hidden className="size-3.5" />
            {product.customization.allowed.length} customization options
          </span>
          <span className="flex items-center gap-2">
            <span className="text-right leading-tight">
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
