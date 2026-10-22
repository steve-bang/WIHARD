import { Heart, Rocket, Search, Sparkles } from "lucide-react";

// BR-T02: steps not yet built in Phase 1 are flagged so copy never presents them as available.
export const journeySteps = [
  { title: "Discover", icon: Search, available: true, text: "Browse templates and solutions that fit your needs." },
  { title: "Customize", icon: Sparkles, available: false, text: "Use natural language to tailor the template to your requirements." },
  { title: "Deploy", icon: Rocket, available: false, text: "Put your website or app live through a simplified deployment process." },
  { title: "Operate", icon: Heart, available: false, text: "Keep it running with support and updates from the platform." },
];
