"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Header link that marks the current section, as in docs/design/mockups/.
export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const current = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={`border-b-2 py-[18px] hover:text-brand-600 ${current ? "border-brand-600 text-brand-600" : "border-transparent"}`}
    >
      {children}
    </Link>
  );
}
