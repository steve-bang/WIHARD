import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site";
import { Container } from "./container";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-slate-300">
      <Container className="grid gap-10 py-12 md:grid-cols-4">
        <div>
          <Logo className="text-white" />
          <p className="mt-3 text-sm">{siteConfig.headline}</p>
        </div>
        {footerNav.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-semibold text-white">{group.title}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
    </footer>
  );
}
