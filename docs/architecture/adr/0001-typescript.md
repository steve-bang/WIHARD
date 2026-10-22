# 0001 — TypeScript cho toàn bộ project

- Trạng thái: Đã chấp nhận (2026-10-22)

## Bối cảnh
Repo chứa web công khai, dashboard và backend API. Cần dùng chung mô hình dữ liệu sản phẩm (FR-P01–P13), trạng thái vòng đời (BRD §10.3) và hợp đồng API giữa các project.

## Quyết định
Dùng TypeScript cho mọi project, kể cả `services/api` (Node.js). Kiểu dữ liệu dùng chung đặt tại `packages/contracts` khi có từ hai project sử dụng.

## Hệ quả
- Một nguồn định nghĩa kiểu dữ liệu, giảm lệch giữa frontend và backend.
- Đội ngũ chỉ cần một ngôn ngữ chính.
- Framework backend cụ thể (NestJS hay Fastify) vẫn cần chốt bằng ADR riêng khi scaffold `services/api`.
