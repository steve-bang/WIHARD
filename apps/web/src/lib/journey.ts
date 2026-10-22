import { Heart, Rocket, Search, Sparkles } from "lucide-react";

// BR-T02: steps not yet built in Phase 1 are flagged so copy never presents them as available.
export const journeySteps = [
  { title: "Discover", icon: Search, available: true, text: "Browse templates and solutions by industry, need, or business problem." },
  { title: "Customize", icon: Sparkles, available: false, text: "Describe changes in plain language and have AI help adapt the product to you." },
  { title: "Deploy", icon: Rocket, available: false, text: "Put the product live through a simplified deployment process." },
  { title: "Operate", icon: Heart, available: false, text: "Keep using it with support, updates, and management throughout its life." },
];
