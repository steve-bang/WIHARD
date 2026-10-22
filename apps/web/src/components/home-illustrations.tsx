import { Code2, Rocket, Search, Sparkles } from "lucide-react";
import { Avatar } from "./avatar";

// Decorative product mock-ups for the homepage (docs/design/mockups/home.png).

function FloatingCard({ icon: Icon, title, text, className }: { icon: typeof Search; title: string; text: string; className: string }) {
  return (
    <div className={`absolute z-10 flex w-48 gap-3 rounded-xl border border-line bg-white p-3 shadow-lg ${className}`}>
      <Icon aria-hidden className="size-5 shrink-0 text-brand-600" />
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-xs text-muted">{text}</p>
      </div>
    </div>
  );
}

export interface ShowcaseCard {
  icon: typeof Search;
  title: string;
  text: string;
}

const cardSlots = ["left-6 top-0", "-right-2 top-10", "bottom-0 left-28"];

export function HeroIllustration({
  cards = [
    { icon: Search, title: "Discover", text: "Find ready-to-use templates for your business needs." },
    { icon: Sparkles, title: "Customize", text: "Describe what you need in natural language." },
    { icon: Rocket, title: "Deploy", text: "Put your website or app live." },
  ],
}: {
  cards?: ShowcaseCard[];
}) {
  return (
    <div aria-hidden className="relative mx-auto h-[400px] w-full max-w-[520px]">
      {cards.slice(0, cardSlots.length).map((c, i) => (
        <FloatingCard key={c.title} {...c} className={cardSlots[i]} />
      ))}

      {/* Desktop dashboard */}
      <div className="absolute left-0 top-24 flex h-56 w-[400px] overflow-hidden rounded-xl border border-line bg-white shadow-xl">
        <div className="w-20 space-y-2 border-r border-line p-3">
          <div className="h-2 w-12 rounded bg-ink/80" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`h-1.5 rounded ${i === 1 ? "bg-brand-600" : "bg-surface"}`} />
          ))}
        </div>
        <div className="flex-1 space-y-3 p-4">
          <p className="text-sm font-bold">Your Business, Your Way</p>
          <div className="grid grid-cols-3 gap-2">
            {["$24.5k", "1,248", "87"].map((v) => (
              <div key={v} className="rounded-md border border-line p-2">
                <div className="h-1 w-8 rounded bg-surface" />
                <p className="mt-1 text-xs font-semibold">{v}</p>
              </div>
            ))}
          </div>
          <svg viewBox="0 0 200 60" className="h-20 w-full">
            <defs>
              <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#2dd4bf" stopOpacity=".6" />
                <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 50 L25 40 L50 44 L75 28 L100 34 L125 18 L150 24 L175 10 L200 14 V60 H0Z" fill="url(#area)" />
            <path d="M0 50 L25 40 L50 44 L75 28 L100 34 L125 18 L150 24 L175 10 L200 14" fill="none" stroke="#14b8a6" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Phone */}
      <div className="absolute right-6 top-36 h-56 w-28 rounded-[1.4rem] border-4 border-ink bg-white p-2 shadow-xl">
        <div className="mx-auto h-1 w-8 rounded bg-ink" />
        <p className="mt-3 text-center text-[10px] font-bold leading-tight">Your Business, Your Way</p>
        <div className="mx-auto mt-2 h-1.5 w-10 rounded bg-brand-600" />
        <div className="mt-3 h-16 rounded-md bg-gradient-to-br from-brand-100 to-brand-600/40" />
        <div className="mt-2 space-y-1">
          <div className="h-1 rounded bg-surface" />
          <div className="h-1 w-2/3 rounded bg-surface" />
        </div>
      </div>
    </div>
  );
}

export function CreatorIllustration({ name, role, templates }: { name: string; role: string; templates: number }) {
  return (
    <div aria-hidden className="relative mx-auto h-56 w-full max-w-[440px]">
      <div className="absolute right-0 top-0 h-40 w-72 overflow-hidden rounded-xl border border-line bg-white p-3 shadow-lg">
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-12 rounded bg-gradient-to-br from-slate-600 to-slate-400" />
          ))}
        </div>
        <div className="mt-3 space-y-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-1.5 w-3/4 rounded bg-surface" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 right-4 w-40 rounded-lg bg-ink p-3 shadow-lg">
        <Code2 className="mb-2 size-4 text-brand-100" />
        {["w-3/4", "w-1/2", "w-2/3", "w-1/3"].map((w, i) => (
          <div key={i} className={`mt-1 h-1 rounded bg-white/30 ${w}`} />
        ))}
      </div>
      <div className="absolute bottom-2 left-0 w-44 rounded-xl border border-line bg-white p-4 text-center shadow-xl">
        <Avatar name={name} className="size-12 text-sm" />
        <p className="mt-2 text-sm font-semibold">{name}</p>
        <p className="text-xs text-muted">{role}</p>
        <p className="mt-3 text-sm font-semibold">{templates}</p>
        <p className="text-xs text-muted">Template{templates === 1 ? "" : "s"}</p>
      </div>
    </div>
  );
}
