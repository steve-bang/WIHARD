import { ImageResponse } from "next/og";
import { getProduct, getProducts } from "@/lib/catalog";
import { OgCard, ogSize } from "@/lib/og";

export const alt = "Product preview on WIHARD";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) return new Response("Not found", { status: 404 });
  const price = `$${product.pricing.startingPrice} ${product.pricing.model === "one-time" ? "one-time" : "/ month"}`;
  return new ImageResponse(
    <OgCard
      eyebrow={`${product.tags[0]} template`}
      title={product.name}
      subtitle={product.tagline}
      footer={`From ${price} · Additional costs may apply`}
    />,
    size,
  );
}
