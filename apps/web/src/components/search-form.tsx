import { Search } from "lucide-react";

// Plain GET form so search works without client JavaScript.
export function SearchForm({
  defaultValue,
  placeholder = "Search for templates, solutions, or use cases…",
  className = "",
}: {
  defaultValue?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <form action="/templates" role="search" className={`flex rounded-xl border border-line bg-white p-1.5 shadow-sm ${className}`}>
      <label htmlFor="q" className="sr-only">
        Search templates
      </label>
      <input
        id="q"
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted"
      />
      <button type="submit" aria-label="Search" className="rounded-lg bg-brand-600 p-2.5 text-white hover:bg-brand-700">
        <Search aria-hidden className="size-4" />
      </button>
    </form>
  );
}
