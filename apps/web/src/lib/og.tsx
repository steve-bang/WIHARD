import { siteConfig } from "./site";

// Shared layout for generated Open Graph images (1200×630). Uses only flexbox, as next/og requires.
export const ogSize = { width: 1200, height: 630 };

export function OgCard({ eyebrow, title, subtitle, footer }: { eyebrow: string; title: string; subtitle: string; footer?: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "linear-gradient(135deg, #ffffff 0%, #eef2ff 60%, #e0e7ff 100%)",
        color: "#0f172a",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <svg width="48" height="40" viewBox="0 0 24 20">
          <path d="M0 0h6l6 12 6-12h6L14.5 20h-5z" fill="#4f46e5" />
          <path d="M0 0h6l3 6-3 6z" fill="#4f46e5" opacity=".55" />
        </svg>
        <span style={{ fontSize: 36, fontWeight: 700 }}>{siteConfig.name}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <span style={{ fontSize: 28, color: "#4f46e5", fontWeight: 600 }}>{eyebrow}</span>
        <span style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, maxWidth: 1000 }}>{title}</span>
        <span style={{ fontSize: 32, color: "#64748b", maxWidth: 950 }}>{subtitle}</span>
      </div>
      <span style={{ fontSize: 26, color: "#334155" }}>{footer ?? siteConfig.headline}</span>
    </div>
  );
}
