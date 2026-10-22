import Image from "next/image";
import type { Product } from "@/lib/catalog";

// Sample products have no screenshots yet; draw a stylised app window instead.
export function ProductPreview({ product, className = "" }: { product: Product; className?: string }) {
  const shot = product.screenshots[0];
  if (shot?.src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={shot.src} alt={shot.alt} fill className="object-cover" />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={shot?.alt ?? product.name}
      className={`overflow-hidden bg-gradient-to-br from-brand-50 to-brand-100 px-4 pt-4 ${className}`}
    >
      <MiniApp variant={product.category} />
    </div>
  );
}

function MiniApp({ variant }: { variant: Product["category"] }) {
  return (
    <div className="flex h-full overflow-hidden rounded-t-lg border border-line bg-white shadow-sm">
      {variant !== "websites" && (
        <div className="w-1/5 space-y-1.5 bg-ink p-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-1.5 rounded ${i === 1 ? "bg-brand-600" : "bg-white/20"}`} />
          ))}
        </div>
      )}
      <div className="flex-1 space-y-2 p-2">
        {variant === "websites" ? (
          <>
            <div className="h-12 rounded bg-gradient-to-r from-slate-700 to-slate-500" />
            <div className="grid grid-cols-3 gap-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-6 rounded bg-surface" />
              ))}
            </div>
          </>
        ) : variant === "apps" ? (
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 21 }, (_, i) => (
              <div key={i} className={`h-3 rounded-sm ${[3, 9, 10, 16].includes(i) ? "bg-brand-600" : "bg-surface"}`} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-5 rounded border border-line" />
              ))}
            </div>
            <svg viewBox="0 0 100 30" className="h-8 w-full" aria-hidden>
              <polyline points="0,25 15,18 30,21 45,10 60,14 75,6 100,9" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
            </svg>
          </>
        )}
        {[0, 1].map((i) => (
          <div key={i} className="h-1.5 w-3/4 rounded bg-surface" />
        ))}
      </div>
    </div>
  );
}
