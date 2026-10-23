import { ChevronDown } from "lucide-react";
import { JsonLd } from "./json-ld";

// Accordion FAQ that also emits FAQPage structured data for search engines.
export function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
      <div className="divide-y divide-line rounded-2xl border border-line bg-white">
        {items.map((f) => (
          <details key={f.question} className="group p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
              {f.question}
              <ChevronDown aria-hidden className="size-4 shrink-0 transition group-open:rotate-180" />
            </summary>
            <p className="mt-2 text-sm text-muted">{f.answer}</p>
          </details>
        ))}
      </div>
    </>
  );
}
