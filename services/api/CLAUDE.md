# services/api — Backend API

The only project that accesses the database. Owns authentication, authorization, business logic, notifications, and event tracking. Not yet scaffolded.

## Requirements owned

From `docs/ba/BUSINESS_REQUIREMENTS.md`:
- Data and logic behind all Phase 1 functional groups (FR-D, FR-P, FR-A, FR-C, FR-M, FR-L); see the mapping table in `docs/architecture/ARCHITECTURE.md` §5.
- All business rules in BRD §9 (BR-Q, BR-T, BR-O) — enforced here, e.g. only approved products are public (BR-Q01), material edits re-enter review (BR-Q05).
- Product status state machine: BRD §10.3. Export the status list via `packages/contracts`.
- Security and privacy: NFR-06, NFR-07. Event recording for KPIs: NFR-10.

## Notes

- Stack is pending a decision (proposed: TypeScript on Node.js with NestJS or Fastify, PostgreSQL, an ORM with migrations) — see `docs/architecture/ARCHITECTURE.md` §6.
- Realistic sample data (BRD assumption A2) lives here as seeds, shared by local and staging.
- Design the product model to grow into licenses, pricing, and versions (Phase 2–3) without reshaping Phase 1 data.
