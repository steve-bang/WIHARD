import {
  Briefcase,
  Car,
  Ellipsis,
  GraduationCap,
  HeartPulse,
  House,
  ShoppingCart,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { Industry } from "@/lib/catalog";

export const industryIcon: Record<Industry, LucideIcon> = {
  "e-commerce": ShoppingCart,
  healthcare: HeartPulse,
  education: GraduationCap,
  "real-estate": House,
  automotive: Car,
  "food-beverage": UtensilsCrossed,
  "professional-services": Briefcase,
  other: Ellipsis,
};
