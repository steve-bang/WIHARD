import { Code2, Rocket, Search, SlidersHorizontal, Sparkles } from "lucide-react";
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

// Hero art for the template listing (docs/design/mockups/templates.png).
export function TemplatesIllustration() {
  return (
    <div aria-hidden className="relative mx-auto h-[400px] w-full max-w-[540px]">
      {/* Website preview */}
      <div className="absolute left-28 top-0 w-80 overflow-hidden rounded-xl border border-line bg-white shadow-xl">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="h-1.5 w-12 rounded bg-brand-600/60" />
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-1.5 rounded-full bg-line" />
            ))}
          </div>
        </div>
        <div className="bg-ink py-7 pl-10 pr-5">
          <div className="h-1 w-10 rounded bg-emerald-400/70" />
          <p className="mt-2 text-lg font-bold text-white">Build. Grow. Succeed.</p>
          <div className="mt-2 h-1 w-40 rounded bg-white/20" />
          <div className="mt-4 flex gap-2">
            <span className="h-4 w-14 rounded bg-white" />
            <span className="h-4 w-12 rounded border border-white/30" />
          </div>
        </div>
      </div>

      {/* Preview card */}
      <div className="absolute left-0 top-14 z-10 w-36 rounded-xl border border-line bg-white p-3 shadow-lg">
        <div className="flex gap-2">
          <Search className="size-4 shrink-0 text-brand-600" />
          <div>
            <p className="text-xs font-semibold">Preview first</p>
            <p className="text-[10px] text-muted">See it before you commit.</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="h-4 rounded border border-line" />
          ))}
        </div>
        <svg viewBox="0 0 100 30" className="mt-3 h-10 w-full">
          <path d="M0 26 L15 20 L30 22 L45 12 L60 16 L75 6 L100 10 V30 H0Z" fill="#e0e7ff" />
          <path d="M0 26 L15 20 L30 22 L45 12 L60 16 L75 6 L100 10" fill="none" stroke="#4f46e5" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Dashboard card */}
      <div className="absolute bottom-4 left-28 w-72 rounded-xl border border-line bg-white p-4 shadow-xl">
        <p className="text-xs font-semibold">Dashboard</p>
        <div className="mt-3 flex justify-between">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="size-5 rounded-full bg-brand-50 ring-2 ring-brand-100" />
          ))}
        </div>
        <svg viewBox="0 0 200 50" className="mt-3 h-16 w-full">
          <path d="M0 40 L20 30 L40 34 L60 18 L80 26 L100 14 L120 22 L140 10 L160 20 L180 12 L200 18 V50 H0Z" fill="#eef2ff" />
          <path d="M0 40 L20 30 L40 34 L60 18 L80 26 L100 14 L120 22 L140 10 L160 20 L180 12 L200 18" fill="none" stroke="#a5b4fc" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Profile list card */}
      <div className="absolute bottom-6 -right-2 w-36 rounded-xl border border-line bg-white p-3 shadow-lg">
        <Avatar name="Sarah Kim" className="size-7 text-[10px]" />
        <div className="mt-3 space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between">
              <span className="h-1 w-14 rounded bg-surface" />
              <span className="h-1 w-4 rounded bg-surface" />
            </div>
          ))}
        </div>
      </div>

      {/* Phone */}
      <div className="absolute right-20 top-28 z-20 h-60 w-28 rounded-[1.4rem] border-4 border-ink bg-white p-2 shadow-2xl">
        <div className="mx-auto h-1 w-8 rounded bg-ink" />
        <p className="mt-4 text-[11px] font-bold leading-tight">Your business, made simpler.</p>
        <div className="mt-2 h-1 w-14 rounded bg-surface" />
        <div className="mt-2 h-3 w-12 rounded bg-brand-600" />
        <div className="mt-3 h-20 rounded-md bg-gradient-to-br from-brand-100 to-brand-600/40" />
      </div>

      {/* Floating card */}
      <div className="absolute -right-4 top-4 z-30 flex w-48 gap-3 rounded-xl border border-line bg-white p-3 shadow-lg">
        <SlidersHorizontal className="size-5 shrink-0 text-brand-600" />
        <div>
          <p className="text-sm font-semibold">Customizable</p>
          <p className="mt-0.5 text-xs text-muted">Every product lists what you can change.</p>
        </div>
      </div>
    </div>
  );
}

// Hero art for the solutions page (docs/design/mockups/solutions.png).
export function SolutionsIllustration() {
  return (
    <div aria-hidden className="relative mx-auto h-[380px] w-full max-w-[540px]">
      <div className="absolute left-0 top-4 flex h-[300px] w-[400px] overflow-hidden rounded-xl border border-line bg-white shadow-xl">
        <div className="w-24 space-y-2.5 bg-ink p-3">
          <div className="h-2 w-12 rounded bg-white/70" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={`h-1.5 rounded ${i === 0 ? "bg-brand-600" : "bg-white/20"}`} />
          ))}
        </div>
        <div className="flex-1 p-4">
          <p className="text-sm font-bold">Dashboard</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              ["Bookings", "248"],
              ["Revenue", "$12,480"],
              ["Customers", "186"],
            ].map(([label, v]) => (
              <div key={label} className="rounded-md border border-line p-2">
                <p className="text-[9px] text-muted">{label}</p>
                <p className="text-xs font-semibold">{v}</p>
              </div>
            ))}
          </div>
          <svg viewBox="0 0 200 60" className="mt-3 h-20 w-full">
            <path d="M0 48 L18 40 L36 44 L54 30 L72 36 L90 22 L108 28 L126 16 L144 24 L162 12 L180 18 L200 8" fill="none" stroke="#6366f1" strokeWidth="1.5" />
          </svg>
          <p className="mt-2 text-[10px] font-semibold">Recent bookings</p>
          <div className="mt-2 space-y-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="size-4 rounded-full bg-surface" />
                <span className="h-1 w-20 rounded bg-surface" />
                <span className="ml-auto h-1 w-8 rounded bg-surface" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute right-12 top-24 z-10 h-64 w-32 rounded-[1.4rem] border-4 border-ink bg-white p-2.5 shadow-2xl">
        <div className="mx-auto h-1 w-8 rounded bg-ink" />
        <p className="mt-3 text-center text-[11px] font-bold">Book Your Service</p>
        <div className="mt-3 space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-1.5 rounded-md border border-line p-1.5">
              <span className="size-3 rounded-full bg-brand-600" />
              <span className="h-1 flex-1 rounded bg-surface" />
            </div>
          ))}
        </div>
        <div className="mt-4 h-5 rounded-md bg-brand-600" />
      </div>

      <div className="absolute -right-2 top-0 z-20 flex w-48 gap-3 rounded-xl border border-line bg-white p-3 shadow-lg">
        <Sparkles className="size-5 shrink-0 text-brand-600" />
        <div>
          <p className="text-sm font-semibold">Easy to customize</p>
          <p className="mt-0.5 text-xs text-muted">Each product lists what you can change.</p>
        </div>
      </div>
    </div>
  );
}

// Hero art for the creators page (docs/design/mockups/for-creators.png). The mockup's photo
// is replaced by a creator card so the page ships without stock imagery.
export function CreatorsIllustration({ name, role }: { name: string; role: string }) {
  const rows = [
    ["Garage Management", "Published", "bg-emerald-50 text-emerald-700"],
    ["Booking System", "Published", "bg-emerald-50 text-emerald-700"],
    ["CRM Dashboard", "Draft", "bg-amber-50 text-amber-700"],
  ];
  return (
    <div aria-hidden className="relative mx-auto h-[400px] w-full max-w-[560px]">
      <div className="absolute right-0 top-10 h-[330px] w-64 rounded-[2rem] bg-gradient-to-br from-brand-100 via-brand-50 to-white" />
      <div className="absolute right-14 top-32 w-44 rounded-2xl border border-line bg-white p-5 text-center shadow-xl">
        <Avatar name={name} className="size-16 text-lg" />
        <p className="mt-3 font-semibold">{name}</p>
        <p className="text-xs text-muted">{role}</p>
        <p className="mt-4 -rotate-6 font-serif text-lg italic leading-tight text-brand-600">
          Build. Share.
          <br />
          Earn.
        </p>
      </div>

      <div className="absolute left-0 top-0 z-10 w-72 rounded-xl border border-line bg-white p-4 shadow-xl">
        <p className="text-xs font-semibold">Creator Dashboard</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            ["Products", "12"],
            ["Earnings", "$2,480"],
            ["Active users", "8,642"],
          ].map(([label, v]) => (
            <div key={label} className="rounded-md border border-line p-2">
              <p className="text-[9px] text-muted">{label}</p>
              <p className="text-xs font-semibold">{v}</p>
            </div>
          ))}
        </div>
        <svg viewBox="0 0 200 40" className="mt-3 h-12 w-full">
          <path d="M0 32 L20 26 L40 28 L60 18 L80 22 L100 14 L120 18 L140 10 L160 14 L180 8 L200 12" fill="none" stroke="#6366f1" strokeWidth="1.5" />
        </svg>
        <p className="mt-2 text-[10px] font-semibold">Your products</p>
        <ul className="mt-2 space-y-2">
          {rows.map(([product, status, cls]) => (
            <li key={product} className="flex items-center gap-2 text-[10px]">
              <span className="size-5 rounded bg-gradient-to-br from-slate-600 to-slate-400" />
              <span className="flex-1">{product}</span>
              <span className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${cls}`}>{status}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute -right-2 top-0 z-20 w-48 rounded-xl border border-line bg-white p-4 shadow-lg">
        <p className="text-xs font-semibold">Publish your product</p>
        <ul className="mt-3 space-y-1.5 text-[10px] text-muted">
          {["Create product details", "Add screenshots & demo", "Submit for review"].map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <span className="flex size-3 items-center justify-center rounded-full bg-brand-600 text-[7px] text-white">✓</span>
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-3 rounded-md bg-brand-600 py-1.5 text-center text-[10px] font-medium text-white">Publish</div>
      </div>
    </div>
  );
}
