import Image from "next/image";
import { LayoutDashboard } from "lucide-react";
import type { Product } from "@/lib/catalog";

// Sample products have no screenshots yet; render a neutral placeholder.
export function ProductPreview({ product, className = "" }: { product: Product; className?: string }) {
  const shot = product.screenshots[0];
  return (
    <div className={`relative flex items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 ${className}`}>
      {shot?.src ? (
        <Image src={shot.src} alt={shot.alt} fill className="object-cover" />
      ) : (
        <LayoutDashboard aria-label={shot?.alt ?? product.name} className="size-12 text-brand-600/60" />
      )}
    </div>
  );
}
