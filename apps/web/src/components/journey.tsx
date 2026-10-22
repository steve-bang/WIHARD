import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { journeySteps } from "@/lib/journey";

// "inline": number and icon side by side (home, how-it-works). "stacked": large icon above
// a numbered title (solutions page, per docs/design/mockups/solutions.png).
export function Journey({ variant = "inline" }: { variant?: "inline" | "stacked" }) {
  const stacked = variant === "stacked";
  return (
    <ol className="grid gap-8 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:gap-4">
      {journeySteps.map(({ title, icon: Icon, available, text }, i) => (
        <Fragment key={title}>
          {i > 0 && (
            <ArrowRight aria-hidden className={`hidden size-4 text-muted md:block ${stacked ? "mt-7" : "mt-4"}`} />
          )}
          <li>
            {stacked ? (
              <>
                <span className="flex size-14 items-center justify-center rounded-full bg-brand-100/70">
                  <Icon aria-hidden className="size-6 text-brand-600" />
                </span>
                <h3 className="mt-4 flex items-center gap-2 font-semibold">
                  <span className="flex size-5 items-center justify-center rounded-full bg-brand-100 text-[11px] text-brand-700">
                    {i + 1}
                  </span>
                  {title}
                </h3>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white">
                    {i + 1}
                  </span>
                  <span className="flex size-11 items-center justify-center rounded-full bg-white shadow-sm">
                    <Icon aria-hidden className="size-5 text-brand-600" />
                  </span>
                </div>
                <h3 className="mt-4 font-semibold">{title}</h3>
              </>
            )}
            <p className={`mt-1 text-muted ${stacked ? "text-xs" : "text-sm"}`}>{text}</p>
            {!available && (
              <span className="mt-2 inline-block rounded bg-white px-1.5 py-0.5 text-xs text-muted">Coming later</span>
            )}
          </li>
        </Fragment>
      ))}
    </ol>
  );
}
