import Link from "next/link";
import { ChevronDown, Menu, Search } from "lucide-react";
import { mainNav, resourcesNav } from "@/lib/site";
import { Container } from "./container";
import { Logo } from "./logo";

// Dropdowns use <details> so navigation works without client JavaScript.
export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-line bg-white">
      <Container className="flex h-16 items-center gap-8">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-medium text-ink/80 md:flex">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand-600">
              {item.label}
            </Link>
          ))}
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1 hover:text-brand-600">
              Resources <ChevronDown aria-hidden className="size-4 transition group-open:rotate-180" />
            </summary>
            <ul className="absolute left-0 top-8 w-48 rounded-xl border border-line bg-white p-2 shadow-lg">
              {resourcesNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block rounded-lg px-3 py-2 hover:bg-surface">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/templates" aria-label="Search templates" className="text-ink/80 hover:text-brand-600">
            <Search className="size-5" />
          </Link>
          <Link
            href="/templates"
            className="hidden rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 sm:block"
          >
            Get Started
          </Link>
          <details className="group md:hidden">
            <summary aria-label="Menu" className="cursor-pointer list-none">
              <Menu className="size-6" />
            </summary>
            <nav aria-label="Mobile" className="absolute inset-x-0 top-16 border-b border-line bg-white p-4 shadow-lg">
              <ul className="space-y-1 text-sm font-medium">
                {[...mainNav, ...resourcesNav].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="block rounded-lg px-3 py-2 hover:bg-surface">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </Container>
    </header>
  );
}
