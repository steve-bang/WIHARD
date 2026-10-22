import Link from "next/link";
import { categories, type ProductCategory } from "@/lib/catalog";

export function CategoryNav({ active }: { active?: ProductCategory }) {
  const items = [{ href: "/templates", label: "All", current: !active }].concat(
    categories.map((c) => ({ href: `/templates/${c.slug}`, label: c.name, current: c.slug === active })),
  );
  return (
    <nav aria-label="Categories" className="mb-8 flex flex-wrap gap-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={item.current ? "page" : undefined}
          className={`rounded-full border px-4 py-1.5 text-sm ${
            item.current ? "border-brand-600 bg-brand-600 text-white" : "border-line hover:bg-surface"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
