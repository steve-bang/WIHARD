import { journeySteps } from "@/lib/journey";

export function Journey() {
  return (
    <ol className="grid gap-6 md:grid-cols-4">
      {journeySteps.map(({ title, icon: Icon, available, text }, i) => (
        <li key={title} className="rounded-xl border border-line bg-white p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-7 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
              {i + 1}
            </span>
            <Icon aria-hidden className="size-6 text-brand-600" />
          </div>
          <h3 className="mt-4 font-semibold">
            {title}
            {!available && (
              <span className="ml-2 rounded bg-surface px-1.5 py-0.5 text-xs font-normal text-muted">Coming later</span>
            )}
          </h3>
          <p className="mt-1 text-sm text-muted">{text}</p>
        </li>
      ))}
    </ol>
  );
}
