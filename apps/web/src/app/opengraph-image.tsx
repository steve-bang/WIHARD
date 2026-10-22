import { ImageResponse } from "next/og";
import { OgCard, ogSize } from "@/lib/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.headline}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgCard
      eyebrow="Discover it. Make it yours. Put it to work."
      title={siteConfig.headline}
      subtitle="Ready-made websites, apps, and business tools — with transparent pricing and platform support."
      footer="Templates · Solutions · For creators"
    />,
    size,
  );
}
