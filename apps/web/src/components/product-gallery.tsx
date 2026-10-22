"use client";

import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { ProductPreview } from "./product-preview";

type GalleryProduct = Pick<Product, "name" | "category" | "screenshots">;

export function ProductGallery({
  product,
  orientation = "horizontal",
  badge,
}: {
  product: GalleryProduct;
  orientation?: "horizontal" | "vertical";
  badge?: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const vertical = orientation === "vertical";
  return (
    <div className={vertical ? "flex gap-3" : "space-y-3"}>
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-line bg-surface p-4 shadow-sm">
        {badge && <div className="absolute right-4 top-4 z-10">{badge}</div>}
        <ProductPreview product={product} index={active} className="aspect-video rounded-xl" />
      </div>
      {product.screenshots.length > 1 && (
        <ul className={vertical ? "flex w-24 flex-col gap-3" : "flex gap-3"} aria-label="Screenshots">
          {product.screenshots.map((shot, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show screenshot: ${shot.alt}`}
                aria-current={i === active}
                className={`block w-24 overflow-hidden rounded-lg border-2 ${i === active ? "border-brand-600" : "border-transparent opacity-70 hover:opacity-100"}`}
              >
                <ProductPreview product={product} index={i} className="aspect-video" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
