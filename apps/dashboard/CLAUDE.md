# apps/dashboard — Logged-in application

One app with role-based areas for Users, Creators, and Admins (decided in `docs/architecture/adr/0003-single-dashboard-app.md`). Not yet scaffolded.

## Requirements owned

From `docs/ba/BUSINESS_REQUIREMENTS.md`:
- Accounts: FR-A01–A05 (account management screens).
- Creator area: FR-C01–C07 — profile, product drafts, submit for review, versions, stats.
- Admin area: FR-M01–M07 — review queue, approve/reject/request changes, catalog management, users, audit log; FR-L03 lead list and export.
- Product status lifecycle shown to creators and admins: BRD §10.3.

## Notes

- Stack (proposed): Next.js App Router, TypeScript, Tailwind CSS, sharing `packages/ui` with `apps/web`.
- All data via authenticated `services/api` calls with role-based access (NFR-06). Business rules are enforced by the API; the UI only pre-validates.
- Phase 2+ will add orders, licenses, and customization requests here — don't build them in Phase 1.
