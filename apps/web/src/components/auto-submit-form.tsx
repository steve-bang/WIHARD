"use client";

// GET form that re-submits whenever a control inside it changes. Without JavaScript,
// the <noscript> apply button inside the form keeps it usable.
export function AutoSubmitForm(props: React.ComponentProps<"form">) {
  return <form {...props} onChange={(e) => e.currentTarget.requestSubmit()} />;
}
