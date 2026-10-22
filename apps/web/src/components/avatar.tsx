export function Avatar({ name, className = "size-6 text-[10px]" }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <span aria-hidden className={`inline-flex shrink-0 items-center justify-center rounded-full bg-ink font-semibold text-white ${className}`}>
      {initials}
    </span>
  );
}
