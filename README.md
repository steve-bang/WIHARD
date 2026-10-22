# WIHARD

> Build software for your work, without coding.

Monorepo của nền tảng WIHARD.

| Thư mục | Nội dung |
|---|---|
| `apps/web` | Website công khai (SEO) — `pnpm --filter @wihard/web dev` |
| `apps/dashboard` | Dashboard cho User, Creator, Admin |
| `services/api` | Backend API |
| `infra` | Hạ tầng, CI/CD |
| `docs` | Tài liệu BA, kiến trúc, thiết kế — xem [`docs/README.md`](docs/README.md) |

## Bắt đầu

Yêu cầu Node ≥ 22 và pnpm 10.

```bash
pnpm install
pnpm dev         # chạy mọi app
pnpm build | lint | typecheck | test
```
