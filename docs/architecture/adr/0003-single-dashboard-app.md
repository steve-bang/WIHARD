# 0003 — Một app dashboard cho User, Creator và Admin

- Trạng thái: Đã chấp nhận (2026-10-22)

## Bối cảnh
Giai đoạn 1 cần khu vực sau đăng nhập cho User, Creator (FR-C01–C07) và Admin (FR-M01–M07, FR-L03). Khối lượng chức năng Admin còn nhỏ.

## Quyết định
Một app `apps/dashboard`, chia khu theo vai trò, phân quyền thực thi tại `services/api`.

## Hệ quả
- Ít app cần vận hành và triển khai hơn trong giai đoạn đầu.
- Khi yêu cầu bảo mật/kiểm toán của Admin tăng (giai đoạn 3–4), xem xét tách Admin thành app riêng bằng ADR mới.
