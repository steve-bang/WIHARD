// A titled block for long-form pages: eyebrow, H2, optional intro, then content.
export function ContentSection({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">{eyebrow}</p>}
      <h2 className="mt-2 text-2xl font-bold">{title}</h2>
      {intro && <p className="mt-2 max-w-3xl text-muted">{intro}</p>}
      {children && <div className="mt-6">{children}</div>}
    </section>
  );
}
