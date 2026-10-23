// Marks anything not available in Phase 1 (BR-T02). `phase` names when it is planned.
export function LaterBadge({ phase, className = "" }: { phase?: number; className?: string }) {
  return (
    <span className={`inline-block whitespace-nowrap rounded bg-amber-50 px-1.5 py-0.5 text-xs font-normal text-amber-700 ${className}`}>
      {phase ? `From phase ${phase}` : "Coming later"}
    </span>
  );
}
