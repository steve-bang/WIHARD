// Public policy values shown on /pricing, /support-policy, and /security.
// All are provisional [GIẢ ĐỊNH] and mirror docs/ba/BUSINESS_REQUIREMENTS.md §9.4 (BR-P01–P10):
// change both together when the Product Owner confirms them.

export const policies = {
  // BR-P01 (Q1)
  supportHours: "Monday to Friday, 9:00–18:00 (UTC+7), excluding public holidays",
  // BR-P02 (Q7): first response, counted in business days.
  responseTimes: [
    { level: "Critical", example: "The product is down or a security vulnerability is affecting you", days: 1 },
    { level: "Standard", example: "A feature is broken or behaves differently from its description", days: 2 },
    { level: "General", example: "Questions about a product, pricing, or your account", days: 3 },
  ],
  // BR-P03 (Q7)
  minimumSupportMonths: 6,
  // BR-P04 — applies once purchasing opens (Phase 2).
  refundDays: 14,
  // BR-P05, BR-P06 (Q5) — apply once purchasing opens (Phase 2).
  platformFeePercent: 15,
  creatorPayoutCycle: "monthly",
  // BR-P07 (Q6)
  continuityNoticeDays: 30,
  // BR-P08
  criticalPatchDays: 7,
  // BR-P09
  vulnerabilityAckDays: 2,
  // BR-P10 (Q1, NFR-07)
  dataLaw: "Vietnam's personal data protection regulations",
} as const;

export const businessDays = (n: number) => `${n} business day${n === 1 ? "" : "s"}`;
