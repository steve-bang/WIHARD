import Link from "next/link";
import { AppWindow, Briefcase, LayoutGrid, Monitor, type LucideIcon } from "lucide-react";
import { categories, type ProductCategory } from "@/lib/catalog";

const icons: Record<ProductCategory, LucideIcon> = {
  websites: Monitor,
  apps: AppWindow,
  "business-tools": Briefcase,
};

export function CategoryTabs({ active }: { active?: ProductCategory }) {
  const items = [{ href: "/templates", label: "All Templates", icon: LayoutGrid, current: !active }].concat(
    categories.map((c) => ({ href: `/templates/${c.slug}`, label: c.name, icon: icons[c.slug], current: c.slug === active })),
  );
  return (
    <nav aria-label="Categories" className="flex gap-3 overflow-x-auto pb-1">
      {items.map(({ href, label, icon: Icon, current }) => (
        <Link
          key={href}
          href={href}
          aria-current={current ? "page" : undefined}
          className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm ${
            current ? "border-brand-100 bg-brand-50 text-brand-700" : "border-line bg-white hover:bg-surface"
          }`}
        >
          <Icon aria-hidden className="size-4" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
