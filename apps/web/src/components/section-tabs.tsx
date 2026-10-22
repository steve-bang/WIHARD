"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "./container";

// Sticky in-page navigation that highlights the section currently in view.
export function SectionTabs({ sections }: { sections: readonly (readonly [id: string, label: string])[] }) {
  const [active, setActive] = useState(sections[0][0]);
  // Sections can share a row (Deployment/Pricing), so an explicit jump wins over the observer until scrolling settles.
  const lockedUntil = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockedUntil.current) return;
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px" },
    );
    for (const [id] of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    const onHashChange = () => {
      const id = window.location.hash.slice(1);
      if (!sections.some(([s]) => s === id)) return;
      lockedUntil.current = Date.now() + 1000;
      setActive(id);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [sections]);

  return (
    <nav aria-label="Sections" className="sticky top-0 z-10 border-b border-line bg-white/95 backdrop-blur">
      <Container className="flex gap-8 overflow-x-auto text-sm">
        {sections.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
            className={`whitespace-nowrap border-b-2 py-4 ${active === id ? "border-brand-600 font-medium text-brand-600" : "border-transparent text-muted hover:text-ink"}`}
          >
            {label}
          </a>
        ))}
      </Container>
    </nav>
  );
}
