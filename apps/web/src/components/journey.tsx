import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { journeySteps } from "@/lib/journey";

export function Journey() {
  return (
    <ol className="grid gap-8 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:gap-4">
      {journeySteps.map(({ title, icon: Icon, available, text }, i) => (
        <Fragment key={title}>
          {i > 0 && <ArrowRight aria-hidden className="mt-4 hidden size-4 text-muted md:block" />}
          <li>
            <div className="flex items-center gap-3">
              <span className="flex size-7 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white">
                {i + 1}
              </span>
              <span className="flex size-11 items-center justify-center rounded-full bg-white shadow-sm">
                <Icon aria-hidden className="size-5 text-brand-600" />
              </span>
            </div>
            <h3 className="mt-4 font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted">{text}</p>
            {!available && (
              <span className="mt-2 inline-block rounded bg-white px-1.5 py-0.5 text-xs text-muted">Coming later</span>
            )}
          </li>
        </Fragment>
      ))}
    </ol>
  );
}
