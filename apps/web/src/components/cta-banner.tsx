import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBanner({ title, text, href, label }: { title: string; text: string; href: string; label: string }) {
  return (
    <section className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-ink to-brand-700 px-8 py-10 text-white">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-1 text-sm text-slate-300">{text}</p>
      </div>
      <Link href={href} className="flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-medium hover:bg-brand-700">
        {label} <ArrowRight aria-hidden className="size-4" />
      </Link>
    </section>
  );
}
