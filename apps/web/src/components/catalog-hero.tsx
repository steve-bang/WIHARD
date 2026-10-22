import type { LucideIcon } from "lucide-react";
import { Container } from "./container";
import { HeroIllustration, type ShowcaseCard } from "./home-illustrations";
import { SearchForm } from "./search-form";

export function CatalogHero({
  eyebrow,
  icon: Icon,
  title,
  text,
  searchPlaceholder,
  cards,
  illustration,
}: {
  eyebrow: string;
  icon: LucideIcon;
  title: React.ReactNode;
  text: string;
  searchPlaceholder?: string;
  cards?: ShowcaseCard[];
  illustration?: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-white via-brand-50/60 to-brand-100/60">
      <Container className="grid items-center gap-12 py-14 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700">
            <Icon aria-hidden className="size-3" /> {eyebrow}
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-[2.75rem]">{title}</h1>
          <p className="mt-4 max-w-lg text-muted">{text}</p>
          <SearchForm className="mt-8 max-w-lg" placeholder={searchPlaceholder} />
        </div>
        <div className="hidden lg:block">
          {illustration ?? <HeroIllustration cards={cards} />}
        </div>
      </Container>
    </section>
  );
}
