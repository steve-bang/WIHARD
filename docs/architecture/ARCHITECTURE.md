# WIHARD — Kiến trúc tổng thể và cấu trúc Monorepo

| Thuộc tính | Giá trị |
|---|---|
| Phiên bản | 0.1 (bản nháp) |
| Ngày | 2026-10-22 |
| Tài liệu nguồn | `docs/ba/BUSINESS_REQUIREMENTS.md`, `docs/ba/PRODUCT_VISION.md` |

> Quy ước nhãn giống BRD: **[GIẢ ĐỊNH]** cần xác nhận, **[CẦN QUYẾT ĐỊNH]** phải chốt trước khi scaffold project liên quan.

---

## 1. Nguyên tắc

1. **Một repo, nhiều project.** Toàn bộ web công khai, dashboard, backend, hạ tầng và tài liệu nằm trong cùng một repo để thay đổi xuyên project (ví dụ: thêm trường cho sản phẩm) đi chung một commit/PR.
2. **Tài liệu BA là nguồn sự thật chung.** Mọi project đọc yêu cầu từ `docs/ba/`; không sao chép yêu cầu vào từng project. Code và PR tham chiếu mã yêu cầu (`FR-*`, `BR-*`, `NFR-*`).
3. **Ranh giới rõ ràng.** Chỉ `services/api` được truy cập cơ sở dữ liệu. Các app frontend đi qua API.
4. **Hợp đồng dùng chung.** Kiểu dữ liệu và hợp đồng API được định nghĩa một nơi (`packages/`) và dùng lại ở mọi project.
5. **Phát triển theo giai đoạn.** Chỉ scaffold project khi giai đoạn tương ứng trong BRD bắt đầu; không xây trước hạ tầng chưa cần.

---

## 2. Cấu trúc thư mục

```
WIHARD/
├── docs/                      # Tài liệu dùng chung cho mọi project
│   ├── README.md              # Mục lục tài liệu
│   ├── ba/                    # Tài liệu nghiệp vụ (BRD, product vision)
│   ├── architecture/          # Kiến trúc, quyết định kỹ thuật (ADR)
│   └── design/mockups/        # Ảnh thiết kế tham chiếu
├── apps/
│   ├── web/                   # Website công khai, tối ưu SEO
│   └── dashboard/             # Ứng dụng sau đăng nhập: User, Creator, Admin
├── services/
│   └── api/                   # Backend API
├── packages/                  # (tạo khi cần) Code dùng chung
│   ├── contracts/             # Kiểu dữ liệu, schema, hợp đồng API
│   ├── ui/                    # Component và design token dùng chung
│   └── config/                # Cấu hình lint/tsconfig dùng chung
└── infra/                     # Hạ tầng dưới dạng mã, CI/CD, môi trường
```

Mỗi project có `CLAUDE.md` riêng mô tả phạm vi, yêu cầu BA liên quan và lệnh phát triển.

---

## 3. Các project

| Project | Đường dẫn | Mục đích | Người dùng | Giai đoạn bắt đầu |
|---|---|---|---|---|
| Web công khai | `apps/web` | Marketing, khám phá sản phẩm, trang chi tiết, hồ sơ creator công khai, form lead. Ưu tiên SEO và tốc độ. | Khách truy cập, công cụ tìm kiếm | 1 |
| Dashboard | `apps/dashboard` | Khu vực sau đăng nhập: User (yêu thích, lead, sau này là đơn hàng/tùy chỉnh), Creator (hồ sơ, sản phẩm, thống kê), Admin (kiểm duyệt, danh mục, lead) | User, Creator, Admin | 1 |
| Backend API | `services/api` | Nghiệp vụ, xác thực, phân quyền, dữ liệu, thông báo email, ghi nhận sự kiện | Các app | 1 |
| Hạ tầng | `infra` | Môi trường, triển khai, CI/CD, giám sát | Đội kỹ thuật | 1 |
| Shared packages | `packages/*` | Hợp đồng dữ liệu, UI, cấu hình | Các project | 1 (khi có ≥2 project dùng chung) |

**[GIẢ ĐỊNH]** Một app dashboard duy nhất, phân khu theo vai trò, thay vì tách riêng admin. Lý do: giai đoạn 1 khối lượng admin nhỏ, giảm chi phí vận hành. Tách admin ra app riêng khi yêu cầu bảo mật/kiểm toán tăng (giai đoạn 3–4).

---

## 4. Luồng hệ thống

```
                 ┌──────────────┐        ┌──────────────────┐
 Khách / SEO ───▶│  apps/web    │        │  apps/dashboard  │◀─── User / Creator / Admin
                 │ (SSR/SSG)    │        │  (sau đăng nhập) │
                 └──────┬───────┘        └────────┬─────────┘
                        │      HTTPS / REST       │
                        └───────────┬─────────────┘
                                    ▼
                          ┌───────────────────┐
                          │   services/api    │──▶ Email, lưu trữ ảnh, analytics
                          └─────────┬─────────┘    (GĐ2: thanh toán, AI; GĐ3: deployment)
                                    ▼
                          ┌───────────────────┐
                          │    Database       │
                          └───────────────────┘
```

- `apps/web` đọc dữ liệu công khai (sản phẩm đã xuất bản, danh mục, giải pháp, hồ sơ creator) và gửi form lead. Trang danh mục/chi tiết render phía server hoặc tĩnh có làm mới định kỳ để đáp ứng NFR-03, NFR-05.
- `apps/dashboard` dùng API có xác thực, phân quyền theo vai trò (NFR-06).
- Xác thực dùng chung một tài khoản cho cả web và dashboard (FR-A01–A04). **[CẦN QUYẾT ĐỊNH]** cơ chế phiên dùng chung giữa hai domain/subdomain.

---

## 5. Ánh xạ yêu cầu → project (Giai đoạn 1)

| Nhóm yêu cầu (BRD §7.1) | apps/web | apps/dashboard | services/api | infra |
|---|---|---|---|---|
| A. Khám phá (FR-D01–D08) | ● Giao diện | | ● Tìm kiếm, lọc | |
| B. Trang chi tiết (FR-P01–P13) | ● Giao diện | ○ Xem trước khi gửi duyệt | ● Dữ liệu sản phẩm | |
| C. Tài khoản (FR-A01–A05) | ○ Trang đăng nhập/đăng ký | ● Quản lý tài khoản | ● Xác thực | |
| D. Creator (FR-C01–C07) | ● Hồ sơ creator công khai, trang For Creators | ● Quản lý hồ sơ, sản phẩm, thống kê | ● Nghiệp vụ, trạng thái sản phẩm | |
| E. Kiểm duyệt (FR-M01–M07) | | ● Khu vực Admin | ● Quy trình duyệt, audit log | |
| F. Lead (FR-L01–L04) | ● Form | ● Danh sách, xuất file | ● Lưu trữ, email | |
| NFR-02/03/04/05 (truy cập, hiệu năng, SEO) | ● | ● (trừ SEO) | | ○ CDN, cache |
| NFR-06/07 (bảo mật, quyền riêng tư) | ○ | ○ | ● | ● |
| NFR-10 (đo lường) | ● Ghi sự kiện | ● | ● | ○ |

● = chịu trách nhiệm chính · ○ = có liên quan

Quy tắc nghiệp vụ (BRD §9) được **thực thi ở `services/api`** (ví dụ: BR-Q01 chỉ sản phẩm đã duyệt mới hiển thị công khai; BR-Q05 sửa trọng yếu phải duyệt lại). Frontend chỉ hiển thị và hỗ trợ kiểm tra sớm; không được là nơi duy nhất kiểm tra quy tắc.

Vòng đời trạng thái sản phẩm (BRD §10.3) là một máy trạng thái nằm trong `services/api`; danh sách trạng thái được export qua `packages/contracts`.

---

## 6. Đề xuất công nghệ

| Hạng mục | Đề xuất | Lý do | Trạng thái |
|---|---|---|---|
| Ngôn ngữ | TypeScript toàn bộ | Dùng chung kiểu dữ liệu giữa frontend và backend | **[CẦN QUYẾT ĐỊNH]** |
| Quản lý monorepo | pnpm workspaces + Turborepo | Phổ biến, nhẹ, cache build | **[CẦN QUYẾT ĐỊNH]** |
| `apps/web` | Next.js (App Router), Tailwind CSS, Lucide icons | Theo `PRODUCT_VISION.md` §4; SSR/SSG tốt cho SEO | Đã định hướng |
| `apps/dashboard` | Next.js (App Router), Tailwind CSS | Đồng bộ với web, dùng chung `packages/ui` | **[GIẢ ĐỊNH]** |
| `services/api` | Node.js (NestJS hoặc Fastify), PostgreSQL, ORM có migration | Dùng chung TypeScript; dữ liệu quan hệ (sản phẩm, creator, phiên bản, đơn hàng) | **[CẦN QUYẾT ĐỊNH]** |
| Hợp đồng API | OpenAPI sinh từ API hoặc schema (zod) trong `packages/contracts` | Một nguồn định nghĩa, sinh client cho frontend | **[CẦN QUYẾT ĐỊNH]** |
| `infra` | Terraform + GitHub Actions | IaC phổ biến, độc lập nhà cung cấp | **[CẦN QUYẾT ĐỊNH]** nhà cung cấp cloud (BRD Q8) |

Khi chốt một quyết định, ghi lại dưới dạng ADR trong `docs/architecture/adr/NNNN-tieu-de.md` (bối cảnh, quyết định, hệ quả) và cập nhật bảng trên.

---

## 7. Môi trường

| Môi trường | Mục đích |
|---|---|
| local | Phát triển trên máy, dữ liệu mẫu |
| staging | Kiểm thử tích hợp, review của Product Owner |
| production | Người dùng thật |

**[GIẢ ĐỊNH]** Dữ liệu mẫu thực tế (BRD giả định A2) được quản lý dưới dạng seed của `services/api` để mọi môi trường local/staging dùng cùng một bộ dữ liệu.

---

## 8. Quy ước làm việc trong repo

- Commit/PR nên giới hạn trong một project; thay đổi xuyên project chỉ khi thay đổi hợp đồng dùng chung.
- Tiêu đề hoặc mô tả PR tham chiếu mã yêu cầu liên quan (ví dụ: `FR-P07`, `BR-T01`).
- Khi yêu cầu thay đổi, cập nhật `docs/ba/` **trước** hoặc **cùng** PR thay đổi code.
- CI chỉ chạy kiểm tra cho project bị ảnh hưởng (lọc theo đường dẫn).
