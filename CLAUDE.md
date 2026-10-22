# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

WIHARD is a monorepo holding every project of the platform plus the shared business documentation:

| Path | Project | Phase |
|---|---|---|
| `apps/web` | Public, SEO-focused marketing and product-discovery site | 1 |
| `apps/dashboard` | Logged-in app with User, Creator, and Admin areas | 1 |
| `services/api` | Backend API — the only project that touches the database and enforces business rules | 1 |
| `infra` | Infrastructure as code, CI/CD, environments | 1 |
| `packages/*` | Shared contracts, UI, config — created once two projects need the same code | 1 |
| `docs/` | Shared BA, architecture, and design docs read by every project | — |

Each project directory has its own `CLAUDE.md` with its scope, the requirements it owns, and its commands. Only `apps/web` is scaffolded so far.

## Commands

pnpm workspaces + Turborepo, Node ≥ 22 (`.nvmrc`). From the repo root:

- `pnpm install`
- `pnpm dev | build | lint | typecheck | test` — runs the task in every workspace via Turbo
- `pnpm --filter @wihard/web <script>` — run one project's script (workspace packages are named `@wihard/<project>`)

New projects must expose the same script names (`build`, `lint`, `typecheck`, `test`, `dev`) so the root commands and CI pick them up.

## Shared documentation — read before implementing

- `docs/ba/BUSINESS_REQUIREMENTS.md` (Vietnamese) — the source of truth for requirements: phased scope, `FR-*` functional requirements, `BR-*` business rules, `NFR-*` non-functional requirements, the platform/creator/infra responsibility matrix, and open questions (`[CẦN QUYẾT ĐỊNH]`) still awaiting the Product Owner. `[GIẢ ĐỊNH]` marks unconfirmed assumptions.
- `docs/ba/PRODUCT_VISION.md` — positioning, copy, public sitemap, and required sections of product detail pages.
- `docs/architecture/ARCHITECTURE.md` (Vietnamese) — project boundaries, system flow, the requirement → project mapping table, and the stack table; decided choices are recorded in `docs/architecture/adr/`.
- `docs/design/mockups/` — page screenshots used as visual references.

## Cross-project rules

- Requirements live only in `docs/ba/`; don't copy them into project folders. Reference requirement IDs (e.g. `FR-P07`, `BR-T01`) in PR titles or descriptions.
- When a requirement changes, update `docs/ba/` before or in the same PR as the code.
- Only `services/api` accesses the database. Business rules (BRD §9) and the product status lifecycle (BRD §10.3) are enforced in the API; frontends may pre-validate but are never the only check.
- Keep commits and PRs scoped to one project unless changing a shared contract.
- Phase 1 has no payments and no working AI customization. Never present unbuilt capabilities as available in UI or copy (`BR-T02`).
- Record decided technical choices as ADRs in `docs/architecture/adr/NNNN-title.md` and update the stack table in `ARCHITECTURE.md`.
