import Link from "next/link";
import { ArrowRight, Headphones, ShieldCheck, SlidersHorizontal, Tag } from "lucide-react";

// Copy limited to what Phase 1 delivers (BR-T02).
const reasons = [
  { icon: ShieldCheck, title: "Reviewed before publishing", text: "Every template is checked for quality before it goes live." },
  { icon: SlidersHorizontal, title: "Clear customization", text: "Each product lists what you can and can't change." },
  { icon: Headphones, title: "Platform support", text: "WIHARD stays your point of contact." },
  { icon: Tag, title: "Transparent pricing", text: "Every cost, including extras, listed up front." },
];

export function WhyTemplates() {
  return (
    <section className="grid items-center gap-8 rounded-2xl bg-surface p-8 lg:grid-cols-[1fr_2fr]">
      <div>
        <h2 className="text-2xl font-bold">Why choose WIHARD templates?</h2>
        <p className="mt-2 text-sm text-muted">Built by creators, reviewed by our platform, and ready for your business.</p>
        <Link
          href="/how-it-works"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-white"
        >
          Explore how it works <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map(({ icon: Icon, title, text }) => (
          <li key={title}>
            <span className="flex size-10 items-center justify-center rounded-full bg-white shadow-sm">
              <Icon aria-hidden className="size-5 text-brand-600" />
            </span>
            <h3 className="mt-3 text-sm font-semibold">{title}</h3>
            <p className="mt-1 text-xs text-muted">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
