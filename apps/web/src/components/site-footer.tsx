import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site";
import { Container } from "./container";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-slate-300">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Logo className="text-white" />
          <p className="mt-3 max-w-56 text-sm">{siteConfig.headline}</p>
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
      <Container className="pb-6 text-xs">
        <p className="border-t border-white/10 pt-6">
          © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
