# infra — Infrastructure and delivery

Infrastructure as code, CI/CD, and the local/staging/production environments (`docs/architecture/ARCHITECTURE.md` §7). Not yet set up.

## Notes

- Proposed: Terraform and GitHub Actions. The cloud provider is an open question (BRD Q8) — don't commit to one until it's decided and recorded as an ADR.
- CI should run checks only for projects affected by a change (path filters per `apps/*`, `services/*`, `packages/*`).
- Supports NFR-03 (CDN/caching for `apps/web`), NFR-06, and NFR-07. Phase 3 adds managed deployment of customer products, backups, and monitoring (BRD §7.3).
