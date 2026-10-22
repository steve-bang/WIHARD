import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  categories,
  facetCount,
  filterProducts,
  getSolutions,
  paginate,
  parseFilters,
  sortOptions,
  type Facet,
  type ProductCategory,
  type ProductFilters,
} from "@/lib/catalog";
import { AutoSubmitForm } from "./auto-submit-form";
import { TemplateCard } from "./template-card";

type SearchParams = Record<string, string | string[] | undefined>;

const PAGE_SIZE = 9;

const groups: { facet: Facet; title: string; options: { value: string; label: string }[] }[] = [
  { facet: "category", title: "Product type", options: categories.map((c) => ({ value: c.slug, label: c.name })) },
  { facet: "solution", title: "Industry / Use case", options: getSolutions().map((s) => ({ value: s.slug, label: s.name })) },
  {
    facet: "price",
    title: "Price model",
    options: [
      { value: "one-time", label: "One-time payment" },
      { value: "subscription", label: "Subscription" },
    ],
  },
  {
    facet: "support",
    title: "Support level",
    options: [
      { value: "platform", label: "Platform" },
      { value: "platform-and-creator", label: "Platform + creator" },
      { value: "creator", label: "Creator" },
    ],
  },
];

// Template listing with filters (FR-D01–D05). All state lives in the URL so results are shareable and crawlable.
export function TemplatesBrowser({
  params,
  basePath,
  fixedCategory,
}: {
  params: SearchParams;
  basePath: string;
  fixedCategory?: ProductCategory;
}) {
  const filters: ProductFilters = parseFilters(params);
  if (fixedCategory) filters.category = [fixedCategory];
  const all = filterProducts(filters);
  const page = paginate(all, Number(params.page) || 1, PAGE_SIZE);
  const visibleGroups = groups.filter((g) => !(fixedCategory && g.facet === "category"));
  const hasFilters = Boolean(filters.q) || visibleGroups.some((g) => (filters[g.facet] ?? []).length > 0);

  const pageHref = (n: number) => {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (k !== "page") for (const item of [v ?? []].flat()) qs.append(k, item);
    }
    if (n > 1) qs.set("page", String(n));
    const s = qs.toString();
    return s ? `${basePath}?${s}` : basePath;
  };

  return (
    <AutoSubmitForm action={basePath} className="grid gap-8 lg:grid-cols-[240px_1fr]">
      {filters.q && <input type="hidden" name="q" value={filters.q} />}

      <aside aria-label="Filters" className="h-fit rounded-xl border border-line bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Filters</h2>
          {hasFilters && (
            <Link href={basePath} className="text-xs font-medium text-brand-600">
              Clear all
            </Link>
          )}
        </div>
        {visibleGroups.map((g) => (
          <details key={g.facet} open className="group mt-5 border-t border-line pt-4">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold">
              {g.title}
              <ChevronDown aria-hidden className="size-4 transition group-open:rotate-180" />
            </summary>
            <ul className="mt-3 space-y-2.5">
              {g.options.map((o) => {
                const count = facetCount(filters, g.facet, o.value);
                return (
                  <li key={o.value}>
                    <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                      <input
                        type="checkbox"
                        name={g.facet}
                        value={o.value}
                        defaultChecked={(filters[g.facet] as string[] | undefined)?.includes(o.value)}
                        className="size-4 rounded accent-brand-600"
                      />
                      <span className="flex-1 text-ink/80">{o.label}</span>
                      <span className="text-xs text-muted">{count}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </details>
        ))}
        <noscript>
          <button type="submit" className="mt-5 w-full rounded-lg bg-brand-600 py-2 text-sm font-medium text-white">
            Apply filters
          </button>
        </noscript>
      </aside>

      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            Showing {all.length} template{all.length === 1 ? "" : "s"}
            {filters.q && <> for “{filters.q}”</>}
          </p>
          <label className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-sm shadow-sm">
            <span className="text-muted">Sort by:</span>
            <select name="sort" defaultValue={filters.sort} className="bg-transparent font-medium outline-none">
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {page.items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line p-10 text-center text-muted">
            No templates match these filters.{" "}
            <Link href={basePath} className="text-brand-600 underline">
              Clear filters
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {page.items.map((p) => (
              <TemplateCard key={p.slug} product={p} />
            ))}
          </div>
        )}

        {page.pageCount > 1 && (
          <nav aria-label="Pagination" className="mt-10 flex justify-center gap-2 text-sm">
            <PageLink href={pageHref(page.page - 1)} disabled={page.page === 1} label="Previous page">
              <ChevronLeft className="size-4" />
            </PageLink>
            {Array.from({ length: page.pageCount }, (_, i) => i + 1).map((n) => (
              <PageLink key={n} href={pageHref(n)} current={n === page.page} label={`Page ${n}`}>
                {n}
              </PageLink>
            ))}
            <PageLink href={pageHref(page.page + 1)} disabled={page.page === page.pageCount} label="Next page">
              <ChevronRight className="size-4" />
            </PageLink>
          </nav>
        )}
      </div>
    </AutoSubmitForm>
  );
}

function PageLink({
  href,
  current,
  disabled,
  label,
  children,
}: {
  href: string;
  current?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  const cls = "flex size-8 items-center justify-center rounded-md border";
  if (disabled) return <span className={`${cls} border-line text-muted/50`}>{children}</span>;
  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={current ? "page" : undefined}
      className={`${cls} ${current ? "border-brand-600 bg-brand-600 text-white" : "border-line bg-white hover:bg-surface"}`}
    >
      {children}
    </Link>
  );
}
