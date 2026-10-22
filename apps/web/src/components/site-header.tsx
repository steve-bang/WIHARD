import Link from "next/link";
import { mainNav } from "@/lib/site";
import { Container } from "./container";
import { Logo } from "./logo";

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-white">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden gap-6 text-sm text-muted md:flex">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/templates"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Explore templates
        </Link>
      </Container>
    </header>
  );
}
