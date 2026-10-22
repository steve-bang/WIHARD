import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`text-lg font-bold tracking-tight ${className}`}>
      <span className="text-brand-600">W</span>
      {siteConfig.name.slice(1)}
    </Link>
  );
}
