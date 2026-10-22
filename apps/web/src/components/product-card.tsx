import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCategory, getCreator, type Product } from "@/lib/catalog";
import { ProductPreview } from "./product-preview";

export function ProductCard({ product }: { product: Product }) {
  const creator = getCreator(product.creatorSlug);
  return (
    <Link
      href={`/templates/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition hover:shadow-md"
    >
      <ProductPreview product={product} className="h-40" />
      <div className="flex flex-1 flex-col p-4">
        <span className="w-fit rounded bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
          {getCategory(product.category).name}
        </span>
        <h3 className="mt-2 font-semibold">{product.name}</h3>
        <p className="mt-1 flex-1 text-sm text-muted">{product.tagline}</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted">By {creator?.name}</span>
          <span className="flex items-center gap-1 font-semibold text-brand-600">
            {product.pricing.included[0].amount}
            <ArrowUpRight aria-hidden className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <p className="text-muted">No products here yet.</p>;
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
