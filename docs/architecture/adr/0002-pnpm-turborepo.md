# 0002 — pnpm workspaces + Turborepo

- Trạng thái: Đã chấp nhận (2026-10-22)

## Bối cảnh
Repo là monorepo nhiều project (`apps/*`, `services/*`, `packages/*`). Cần cài đặt phụ thuộc chung, chạy task cho từng project và chỉ build lại phần bị ảnh hưởng.

## Quyết định
- pnpm workspaces (khai báo tại `pnpm-workspace.yaml`), một lockfile ở thư mục gốc.
- Turborepo điều phối task (`turbo.json`). Mọi project cung cấp cùng tên script: `dev`, `build`, `lint`, `typecheck`, `test`.
- Tên package: `@wihard/<project>`.

## Hệ quả
- `pnpm build|lint|typecheck|test` ở thư mục gốc chạy cho mọi project, có cache.
- CI có thể dùng `turbo run <task> --filter=...[origin/main]` để chỉ kiểm tra project bị ảnh hưởng.
