import { CalendarCheck, Car, Users, Puzzle, type LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  "garage-management": Car,
  "customer-management": Users,
  "booking-management": CalendarCheck,
};

export const solutionIcon = (slug: string): LucideIcon => icons[slug] ?? Puzzle;
