import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 20" aria-hidden className={className}>
      <path d="M0 0h6l6 12 6-12h6L14.5 20h-5z" fill="currentColor" />
      <path d="M0 0h6l3 6-3 6z" fill="currentColor" opacity=".55" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-lg font-bold tracking-tight ${className}`}>
      <LogoMark className="h-5 w-6 text-brand-600" />
      {siteConfig.name}
    </Link>
  );
}
