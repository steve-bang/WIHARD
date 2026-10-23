# WIHARD — Tài liệu Yêu cầu Nghiệp vụ (Business Requirements Document)

| Thuộc tính | Giá trị |
|---|---|
| Phiên bản | 0.1 (bản nháp đầu tiên) |
| Ngày | 2026-10-22 |
| Trạng thái | Draft — chờ review từ Product Owner |
| Tài liệu liên quan | `docs/ba/PRODUCT_VISION.md` (định hướng website công khai, sitemap) · `docs/architecture/ARCHITECTURE.md` (ánh xạ yêu cầu → project) |

> Quy ước: **[GIẢ ĐỊNH]** là nội dung BA đề xuất dựa trên mô tả dự án, cần Product Owner xác nhận. **[CẦN QUYẾT ĐỊNH]** là điểm mở, phải chốt trước khi triển khai giai đoạn liên quan. Mức ưu tiên dùng MoSCoW: **M** (Must), **S** (Should), **C** (Could), **W** (Won't — không làm trong giai đoạn này).

---

## 1. Tóm tắt điều hành

WIHARD là nền tảng marketplace kết hợp AI, nơi:

- **Product Users** (người không chuyên công nghệ) khám phá, tùy chỉnh bằng ngôn ngữ tự nhiên, triển khai và vận hành phần mềm có sẵn.
- **Product Creators** (lập trình viên độc lập, vibe coders, nhóm nhỏ) đăng tải, phân phối và kiếm tiền từ sản phẩm.

Khác biệt chiến lược nằm ở việc kết nối ba lớp: **Marketplace → AI Customization → Managed Lifecycle & Trust**. Lớp thứ ba là lời hứa cốt lõi: khách hàng không bị phụ thuộc vào một cá nhân duy nhất. Muốn giữ được lời hứa đó, phải phân định rõ trách nhiệm giữa nền tảng, creator và nhà cung cấp hạ tầng (xem mục 8).

Slogan: **Build software for your work, without coding.**

Tài liệu này mô tả chi tiết yêu cầu cho **Giai đoạn 1 — Marketplace**. Các giai đoạn sau chỉ ở mức định hướng để phần thiết kế giai đoạn 1 không chặn đường mở rộng.

---

## 2. Bối cảnh và bài toán

| # | Vấn đề | Đối tượng chịu ảnh hưởng | Cách WIHARD giải quyết |
|---|---|---|---|
| P1 | Chi phí phát triển phần mềm riêng cao | User | Bắt đầu từ sản phẩm có sẵn thay vì xây từ đầu |
| P2 | Thời gian tìm dev, thống nhất yêu cầu, xây dựng kéo dài | User | Xem demo trước, tùy chỉnh nhanh bằng AI |
| P3 | Không tự tùy chỉnh, triển khai, bảo trì được | User | AI Customization + Deployment Platform |
| P4 | Phụ thuộc vào một lập trình viên duy nhất | User | Nền tảng là đầu mối dài hạn, có tiêu chuẩn hỗ trợ và tính liên tục |
| P5 | Creator thiếu kênh phân phối và thương mại hóa | Creator | Marketplace, hồ sơ creator, cơ chế bán hàng và chia doanh thu |

---

## 3. Mục tiêu nghiệp vụ và chỉ số đo lường

| Mã | Mục tiêu | KPI đề xuất | Giai đoạn |
|---|---|---|---|
| BO-01 | Xây dựng nguồn cung sản phẩm chất lượng | Số sản phẩm được duyệt; tỷ lệ duyệt lần đầu; thời gian kiểm duyệt trung bình | 1 |
| BO-02 | Giúp user tìm được sản phẩm phù hợp | Tỷ lệ xem chi tiết → bấm demo/CTA; tỷ lệ tìm kiếm không có kết quả | 1 |
| BO-03 | Kiểm chứng nhu cầu thị trường | Số lead/đăng ký quan tâm trên mỗi sản phẩm; số creator đăng ký | 1 |
| BO-04 | Tạo doanh thu từ giao dịch | GMV; doanh thu nền tảng; tỷ lệ chuyển đổi mua | 2 |
| BO-05 | Giảm khoảng cách giữa sản phẩm có sẵn và nhu cầu riêng | Tỷ lệ yêu cầu tùy chỉnh hoàn thành; mức độ hài lòng sau tùy chỉnh | 2 |
| BO-06 | Xây dựng niềm tin vòng đời | Thời gian phản hồi hỗ trợ; uptime; tỷ lệ khách hàng tiếp tục sử dụng | 3 |

**[CẦN QUYẾT ĐỊNH]** Giá trị mục tiêu cụ thể (target) cho từng KPI.

---

## 4. Các bên liên quan

| Bên liên quan | Vai trò | Mối quan tâm chính |
|---|---|---|
| Product Owner / Founder | Ra quyết định sản phẩm, ưu tiên | Kiểm chứng thị trường, định vị đúng |
| Product User | Khách hàng cuối | Giá rõ ràng, dễ dùng, có hỗ trợ lâu dài, sở hữu dữ liệu |
| Product Creator | Nguồn cung | Tiếp cận khách hàng, doanh thu, điều khoản rõ ràng |
| Đội kiểm duyệt (Platform Ops) | Duyệt sản phẩm, xử lý vi phạm | Tiêu chuẩn duyệt rõ, công cụ quản trị |
| Đội hỗ trợ khách hàng | Đầu mối hỗ trợ | Phân định trách nhiệm với creator, quy trình escalation |
| Nhà cung cấp hạ tầng / AI | Hosting, thanh toán, mô hình AI | SLA, chi phí, tuân thủ |
| Pháp chế / Tài chính | Điều khoản, thuế, chi trả | Giấy phép sử dụng, hoàn tiền, đối soát |

---

## 5. Chân dung người dùng (Personas)

### 5.1 Product User

| Persona | Mô tả | Nhu cầu | Rào cản |
|---|---|---|---|
| Chủ garage / cửa hàng dịch vụ | Kinh doanh nhỏ, không có IT | Quản lý lịch hẹn, khách hàng, phiếu sửa chữa | Không biết chọn công nghệ, sợ chi phí ẩn |
| Freelancer / chuyên gia độc lập | Cần website giới thiệu, nhận booking | Có website nhanh, đúng thương hiệu | Ngân sách thấp, không có thời gian |
| Founder startup giai đoạn sớm | Cần MVP hoặc công cụ nội bộ | Ra mắt nhanh, chỉnh sửa linh hoạt | Sợ bị khóa vào một dev |
| Đội vận hành doanh nghiệp | Cần công cụ nội bộ (CRM, quản lý lead) | Quy trình riêng, dữ liệu tự quản | Yêu cầu bảo mật, phân quyền |

### 5.2 Product Creator

| Persona | Mô tả | Nhu cầu | Rào cản |
|---|---|---|---|
| Vibe coder / AI-assisted builder | Tạo sản phẩm nhanh bằng AI | Kênh phân phối, kiếm tiền | Chưa quen tiêu chuẩn chất lượng, hỗ trợ |
| Indie hacker / freelancer | Có sản phẩm tái sử dụng | Doanh thu thụ động, thương hiệu cá nhân | Không muốn tự làm marketing, hỗ trợ |
| Studio phần mềm nhỏ | Có nhiều sản phẩm, đội ngũ | Mở rộng thị trường, quản lý danh mục | Cần điều khoản thương mại rõ ràng |

---

## 6. Phạm vi

### 6.1 Lộ trình tổng thể

| Giai đoạn | Tên | Phạm vi chính |
|---|---|---|
| 1 | Marketplace | Website công khai, danh mục template, trang chi tiết, hồ sơ creator, đăng tải và kiểm duyệt |
| 2 | Giao dịch & cá nhân hóa | Mua sản phẩm, quyền sử dụng (license), luồng yêu cầu tùy chỉnh, tích hợp AI |
| 3 | Triển khai & vận hành | Deployment, quản lý phiên bản, hỗ trợ khách hàng, bảo mật, cập nhật |
| 4 | Hệ sinh thái | Mở rộng mạng lưới creator, khám phá nâng cao, tiêu chuẩn chất lượng, dịch vụ doanh nghiệp |

### 6.2 Trong phạm vi Giai đoạn 1

- Website công khai theo sitemap trong `docs/ba/PRODUCT_VISION.md` §5.
- Danh mục sản phẩm: duyệt theo loại (Websites, Apps, Business Tools) và theo giải pháp/ngành nghề.
- Trang chi tiết sản phẩm với đầy đủ thông tin minh bạch (giá, hỗ trợ, bảo trì, creator).
- Đăng ký / đăng nhập cho cả User và Creator.
- Hồ sơ creator công khai.
- Luồng creator gửi sản phẩm và đội nền tảng kiểm duyệt.
- Thu thập lead / đăng ký quan tâm từ User (thay cho mua hàng thật).

### 6.3 Ngoài phạm vi Giai đoạn 1

- Thanh toán trực tuyến, chia doanh thu, chi trả cho creator (Giai đoạn 2).
- Tùy chỉnh bằng AI hoạt động thật (Giai đoạn 2). Giai đoạn 1 chỉ được *giới thiệu* tính năng, không được hứa hẹn như đã có.
- Triển khai tự động, hosting được quản lý (Giai đoạn 3).
- Hệ thống ticket hỗ trợ đầy đủ (Giai đoạn 3).

---

## 7. Yêu cầu chức năng

### 7.1 Giai đoạn 1 — Marketplace (chi tiết)

#### A. Khám phá sản phẩm (Discover)

| Mã | Yêu cầu | Ưu tiên |
|---|---|---|
| FR-D01 | Hiển thị danh mục sản phẩm, lọc theo loại: Websites, Apps, Business Tools | M |
| FR-D02 | Duyệt theo giải pháp/ngành nghề (ví dụ: garage, quản lý khách hàng, đặt lịch) | M |
| FR-D03 | Tìm kiếm theo từ khóa trên tên, mô tả, ngành nghề, tính năng | M |
| FR-D04 | Lọc theo mức giá, mức hỗ trợ, trạng thái sản phẩm | S |
| FR-D05 | Sắp xếp theo mới nhất, phổ biến, giá | S |
| FR-D06 | So sánh 2–3 sản phẩm theo các tiêu chí chính (giá, tính năng, mức hỗ trợ) | S |
| FR-D07 | Gợi ý sản phẩm liên quan trên trang chi tiết | S |
| FR-D08 | Tìm kiếm bằng mô tả nhu cầu bằng ngôn ngữ tự nhiên | C |

#### B. Trang chi tiết sản phẩm

| Mã | Yêu cầu | Ưu tiên |
|---|---|---|
| FR-P01 | Tên, mô tả ngắn, danh mục, trạng thái (ví dụ: Đang hoạt động, Beta, Ngừng phát triển) | M |
| FR-P02 | Ảnh chụp màn hình / bản xem trước | M |
| FR-P03 | Nút xem demo trực tiếp khi có URL demo | M |
| FR-P04 | Tính năng chính và đối tượng phù hợp | M |
| FR-P05 | Những gì khách hàng **có thể** và **không thể** tùy chỉnh | M |
| FR-P06 | Thông tin triển khai và hosting | M |
| FR-P07 | Giá và các chi phí có thể phát sinh | M |
| FR-P08 | Mức hỗ trợ, phạm vi hỗ trợ, ai chịu trách nhiệm hỗ trợ | M |
| FR-P09 | Thông tin cập nhật và bảo trì | M |
| FR-P10 | Thông tin creator, liên kết đến hồ sơ creator | M |
| FR-P11 | Lịch sử phiên bản / cập nhật gần đây | S |
| FR-P12 | FAQ | S |
| FR-P13 | CTA "Make it yours" → ở Giai đoạn 1 dẫn tới form đăng ký quan tâm | M |

#### C. Tài khoản

| Mã | Yêu cầu | Ưu tiên |
|---|---|---|
| FR-A01 | Đăng ký / đăng nhập bằng email | M |
| FR-A02 | Đăng nhập bằng tài khoản mạng xã hội (Google, GitHub) | S |
| FR-A03 | Một tài khoản có thể có vai trò User, Creator hoặc cả hai | S |
| FR-A04 | Quên mật khẩu, xác thực email | M |
| FR-A05 | User lưu sản phẩm yêu thích | C |

#### D. Creator

| Mã | Yêu cầu | Ưu tiên |
|---|---|---|
| FR-C01 | Đăng ký làm creator, chấp nhận điều khoản creator | M |
| FR-C02 | Quản lý hồ sơ công khai: tên, giới thiệu, kỹ năng, liên kết, danh mục sản phẩm | M |
| FR-C03 | Tạo / chỉnh sửa bản nháp sản phẩm với đầy đủ trường ở mục B | M |
| FR-C04 | Gửi sản phẩm để kiểm duyệt; xem trạng thái và phản hồi của kiểm duyệt viên | M |
| FR-C05 | Đăng phiên bản mới / ghi chú cập nhật | S |
| FR-C06 | Xem thống kê cơ bản: lượt xem, lượt bấm demo, số lead | S |
| FR-C07 | Gỡ sản phẩm khỏi marketplace (theo điều khoản về tính liên tục) | S |

#### E. Kiểm duyệt và quản trị

| Mã | Yêu cầu | Ưu tiên |
|---|---|---|
| FR-M01 | Hàng đợi sản phẩm chờ duyệt | M |
| FR-M02 | Duyệt theo checklist chất lượng (xem BR-Q) | M |
| FR-M03 | Phê duyệt / từ chối / yêu cầu chỉnh sửa, kèm lý do | M |
| FR-M04 | Ẩn hoặc gỡ sản phẩm đã xuất bản khi vi phạm | M |
| FR-M05 | Quản lý danh mục, giải pháp, ngành nghề | M |
| FR-M06 | Quản lý người dùng, khóa tài khoản | S |
| FR-M07 | Nhật ký thao tác kiểm duyệt (audit log) | S |

#### F. Thu thập nhu cầu (thay cho mua hàng ở Giai đoạn 1)

| Mã | Yêu cầu | Ưu tiên |
|---|---|---|
| FR-L01 | Form đăng ký quan tâm sản phẩm: thông tin liên hệ, nhu cầu tùy chỉnh mô tả bằng lời | M |
| FR-L02 | Form liên hệ chung và form "Build with us" cho creator | M |
| FR-L03 | Quản trị viên xem và xuất danh sách lead | M |
| FR-L04 | Thông báo email cho quản trị viên khi có lead mới | S |

**[CẦN QUYẾT ĐỊNH]** Lead có được chuyển cho creator không, hay nền tảng là đầu mối duy nhất? Khuyến nghị của BA: nền tảng là đầu mối, phù hợp nguyên tắc "nền tảng là điểm liên hệ dài hạn".

### 7.2 Giai đoạn 2 — Giao dịch & cá nhân hóa (định hướng)

- Thanh toán, hóa đơn, hoàn tiền; chia doanh thu và chi trả cho creator.
- Quản lý giấy phép sử dụng (license): loại giấy phép, phạm vi, thời hạn.
- Luồng yêu cầu tùy chỉnh: User mô tả nhu cầu → hệ thống/AI phân tích → báo giá/ước tính → thực hiện → User nghiệm thu.
- AI Customization: chỉnh giao diện, nội dung, cấu hình dữ liệu trong giới hạn sản phẩm cho phép (khai báo ở FR-P05).
- Đánh giá và nhận xét sau mua.

### 7.3 Giai đoạn 3 — Triển khai & vận hành (định hướng)

- Triển khai lên môi trường do nền tảng quản lý, gắn tên miền riêng.
- Quản lý phiên bản, cập nhật, rollback.
- Hệ thống ticket hỗ trợ, SLA theo mức hỗ trợ, escalation.
- Sao lưu, khôi phục, xuất dữ liệu của khách hàng.
- Giám sát bảo mật và vá lỗi.

### 7.4 Giai đoạn 4 — Hệ sinh thái (định hướng)

- Chương trình creator (cấp độ, huy hiệu chất lượng).
- Khám phá nâng cao, cá nhân hóa gợi ý.
- Gói doanh nghiệp: phân quyền, SSO, hỗ trợ ưu tiên.

---

## 8. Ma trận trách nhiệm (Managed Lifecycle & Trust)

Đây là nền tảng cho lời hứa "không phụ thuộc vào một cá nhân". **[GIẢ ĐỊNH]** Phân định dưới đây là đề xuất của BA, cần chốt cùng pháp chế trước Giai đoạn 2.

R = Thực hiện · A = Chịu trách nhiệm cuối · C = Tham vấn · I = Được thông báo

| Hạng mục | Nền tảng | Creator | Nhà cung cấp hạ tầng |
|---|---|---|---|
| Kiểm duyệt chất lượng trước khi xuất bản | A/R | C | — |
| Đầu mối tiếp nhận hỗ trợ khách hàng | A/R | I | — |
| Sửa lỗi trong mã nguồn sản phẩm | A | R | — |
| Cập nhật tính năng sản phẩm | C | A/R | — |
| Hosting, uptime | A | — | R |
| Sao lưu và khôi phục dữ liệu | A/R | — | R |
| Vá lỗ hổng bảo mật | A | R | R (tầng hạ tầng) |
| Tính liên tục khi creator ngừng hoạt động | A/R | C | — |
| Thanh toán, hoàn tiền | A/R | I | R (cổng thanh toán) |

**[CẦN QUYẾT ĐỊNH]** Cơ chế tính liên tục khi creator ngừng hỗ trợ: nền tảng tiếp quản mã nguồn (cần điều khoản ký gửi mã nguồn), chuyển cho creator khác, hay cho phép khách hàng xuất dữ liệu và chuyển đi?

---

## 9. Quy tắc nghiệp vụ

### 9.1 Chất lượng và xuất bản (BR-Q)

| Mã | Quy tắc |
|---|---|
| BR-Q01 | Sản phẩm chỉ hiển thị công khai sau khi được kiểm duyệt viên phê duyệt. |
| BR-Q02 | Trang sản phẩm bắt buộc có: mô tả, ít nhất 1 ảnh xem trước, giá, mức hỗ trợ, phạm vi tùy chỉnh. |
| BR-Q03 | Nếu khai báo URL demo, demo phải truy cập được tại thời điểm duyệt. |
| BR-Q04 | Creator phải khai báo quyền sở hữu mã nguồn và các thư viện/tài sản bên thứ ba cùng giấy phép của chúng. |
| BR-Q05 | Chỉnh sửa trọng yếu (giá, phạm vi hỗ trợ, giấy phép) trên sản phẩm đã xuất bản phải duyệt lại. **[GIẢ ĐỊNH]** |

### 9.2 Minh bạch (BR-T)

| Mã | Quy tắc |
|---|---|
| BR-T01 | Mọi chi phí có thể phát sinh (hosting, tùy chỉnh, gia hạn) phải hiển thị trên trang sản phẩm. |
| BR-T02 | Không mô tả tính năng chưa được triển khai như đã có. Tính năng sắp ra mắt phải gắn nhãn rõ ràng. |
| BR-T03 | Không hứa hẹn tùy chỉnh không giới hạn; phải nêu rõ giới hạn tùy chỉnh. |
| BR-T04 | Mức hỗ trợ phải chỉ rõ ai hỗ trợ, phạm vi gì, trong bao lâu. |
| BR-T05 | Hồ sơ creator không được là kênh hỗ trợ duy nhất; mọi trang phải có đường dẫn đến hỗ trợ của nền tảng. |

### 9.3 Dữ liệu và quyền sở hữu (BR-O)

| Mã | Quy tắc |
|---|---|
| BR-O01 | Dữ liệu nghiệp vụ do khách hàng nhập vào sản phẩm thuộc về khách hàng. |
| BR-O02 | Khách hàng có quyền xuất dữ liệu của mình (áp dụng từ Giai đoạn 3). |
| BR-O03 | Phạm vi quyền sử dụng (license) phải hiển thị trước khi mua (áp dụng từ Giai đoạn 2). |

### 9.4 Chính sách công bố trên website **[GIẢ ĐỊNH]**

Các giá trị dưới đây **đang hiển thị công khai** trên các trang `/pricing`, `/support-policy`, `/security` để website có nội dung đầy đủ, trong khi Q1, Q5, Q6, Q7 (mục 15) chưa được chốt. Chúng nằm tại một nơi duy nhất trong code: `apps/web/src/lib/policies.ts`. Khi Product Owner thay đổi, sửa đồng thời bảng này và file đó.

| Mã | Chính sách | Giá trị tạm | Câu hỏi mở liên quan |
|---|---|---|---|
| BR-P01 | Giờ hỗ trợ | Thứ 2 – Thứ 6, 9:00–18:00 (UTC+7), trừ ngày lễ | Q1 |
| BR-P02 | Thời gian phản hồi đầu tiên | Sự cố nghiêm trọng (ngừng hoạt động, lỗ hổng bảo mật): 1 ngày làm việc · Lỗi thông thường: 2 ngày làm việc · Câu hỏi chung: 3 ngày làm việc | Q7 |
| BR-P03 | Hỗ trợ tối thiểu cho mọi sản phẩm | 6 tháng sửa lỗi và vá bảo mật | Q7 |
| BR-P04 | Hoàn tiền (khi mở bán) | Trong 14 ngày nếu sản phẩm không đúng mô tả | Giai đoạn 2 |
| BR-P05 | Phí nền tảng cho creator (khi mở bán) | 15% mỗi giao dịch, creator chịu; khách trả đúng giá niêm yết; không phí đăng sản phẩm | Q5 |
| BR-P06 | Chu kỳ chi trả cho creator | Hằng tháng | Q5 |
| BR-P07 | Khi creator ngừng hỗ trợ | Báo trước cho khách 30 ngày; WIHARD tìm creator thay thế hoặc tiếp tục vá bảo mật đến hết thời hạn hỗ trợ đã mua | Q6 |
| BR-P08 | Thời hạn vá lỗ hổng nghiêm trọng | Creator vá trong 7 ngày; quá hạn WIHARD tạm ẩn sản phẩm (FR-M04) | — |
| BR-P09 | Xác nhận báo cáo lỗ hổng | Trong 2 ngày làm việc | — |
| BR-P10 | Luật bảo vệ dữ liệu áp dụng | Quy định bảo vệ dữ liệu cá nhân hiện hành của Việt Nam | Q1, NFR-07 |

---

## 10. Hành trình người dùng chính

### 10.1 User: Discover → Customize → Deploy → Operate

1. Vào trang chủ hoặc trang giải pháp theo ngành.
2. Duyệt / tìm kiếm / lọc sản phẩm.
3. Xem chi tiết, mở demo, so sánh với sản phẩm khác.
4. Bấm "Make it yours" →
   - **Giai đoạn 1:** gửi form đăng ký quan tâm kèm mô tả nhu cầu tùy chỉnh.
   - **Giai đoạn 2+:** mua, mô tả tùy chỉnh bằng ngôn ngữ tự nhiên, nghiệm thu.
5. **Giai đoạn 3+:** triển khai, gắn tên miền, vận hành, nhận cập nhật và hỗ trợ.

### 10.2 Creator: Đăng ký → Xuất bản → Tăng trưởng

1. Vào trang "For Creators", bấm "Build with us".
2. Đăng ký tài khoản, chấp nhận điều khoản creator.
3. Hoàn thiện hồ sơ.
4. Tạo bản nháp sản phẩm → gửi kiểm duyệt.
5. Nhận phản hồi → chỉnh sửa → được phê duyệt → xuất bản.
6. Theo dõi thống kê, đăng cập nhật phiên bản.

### 10.3 Vòng đời trạng thái sản phẩm

```
Draft → Submitted → In Review → (Changes Requested → Submitted)* → Approved/Published
                                └→ Rejected
Published → Unpublished (creator gỡ) | Suspended (nền tảng gỡ do vi phạm) | Deprecated (ngừng phát triển, vẫn hỗ trợ khách hàng hiện có)
```

---

## 11. Yêu cầu phi chức năng

| Mã | Nhóm | Yêu cầu |
|---|---|---|
| NFR-01 | Khả năng sử dụng | Người không chuyên công nghệ hiểu được giá trị, giá và mức hỗ trợ của sản phẩm mà không cần thuật ngữ kỹ thuật. |
| NFR-02 | Truy cập | Đạt chuẩn WCAG 2.1 AA cho các trang công khai. |
| NFR-03 | Hiệu năng | Trang công khai tải nhanh trên di động; đặt mục tiêu theo Core Web Vitals ở mức "Good". |
| NFR-04 | Responsive | Hỗ trợ đầy đủ di động, máy tính bảng, desktop. |
| NFR-05 | SEO | Trang danh mục, giải pháp, chi tiết sản phẩm có thể được lập chỉ mục, có metadata riêng. |
| NFR-06 | Bảo mật | Mật khẩu băm an toàn, HTTPS toàn bộ, phân quyền theo vai trò (User / Creator / Admin). |
| NFR-07 | Quyền riêng tư | Tuân thủ quy định bảo vệ dữ liệu cá nhân tại thị trường mục tiêu. **[CẦN QUYẾT ĐỊNH]** thị trường ra mắt. |
| NFR-08 | Đa ngôn ngữ | **[CẦN QUYẾT ĐỊNH]** Ra mắt bằng tiếng Anh, tiếng Việt hay cả hai. Kiến trúc nên sẵn sàng i18n. |
| NFR-09 | Khả năng mở rộng | Mô hình dữ liệu sản phẩm dùng chung cho danh mục, giải pháp, trang chi tiết; sẵn sàng thêm license, giá, phiên bản ở giai đoạn sau. |
| NFR-10 | Đo lường | Ghi nhận sự kiện: xem sản phẩm, bấm demo, bấm CTA, gửi form — phục vụ các KPI ở mục 3. |

---

## 12. Mô hình kinh doanh

Các nguồn doanh thu tiềm năng (chưa phải mô hình giá đã chốt):

| Nguồn | Mô tả | Giai đoạn sớm nhất |
|---|---|---|
| Phí giao dịch | % trên mỗi giao dịch bán sản phẩm | 2 |
| Gói creator | Công cụ quản lý, phân tích nâng cao | 2–4 |
| Phí tùy chỉnh AI | Theo gói hoặc theo mức tiêu thụ | 2 |
| Phí triển khai và vận hành | Hosting, deployment, bảo trì | 3 |
| Gói doanh nghiệp | Hỗ trợ, quản trị nâng cao | 4 |

**Khuyến nghị BA:** Giai đoạn 1 không thu phí, chỉ đo nhu cầu thông qua lead. Giai đoạn 2 bắt đầu với **một** mô hình duy nhất (phí giao dịch) để đơn giản, minh bạch và dễ kiểm chứng.

---

## 13. Giả định và ràng buộc

**Giả định**
- A1. Có đủ creator sẵn sàng đăng sản phẩm khi chưa có doanh thu (Giai đoạn 1). Cần có chương trình thu hút creator ban đầu.
- A2. Giai đoạn 1 có thể dùng dữ liệu sản phẩm mẫu thực tế để ra mắt website trước khi có nguồn cung thật.
- A3. Đội nền tảng đủ năng lực kiểm duyệt thủ công trong giai đoạn đầu.

**Ràng buộc**
- C1. Mọi nội dung công khai phải phản ánh đúng năng lực đã triển khai (BR-T02).
- C2. Ưu tiên công nghệ ổn định, ít phụ thuộc (xem `docs/architecture/ARCHITECTURE.md`).

---

## 14. Rủi ro

| Mã | Rủi ro | Mức độ | Giảm thiểu |
|---|---|---|---|
| R1 | Bài toán "con gà – quả trứng": thiếu creator thì thiếu user và ngược lại | Cao | Tập trung vào 2–3 ngành dọc (garage, CRM, booking); tự tuyển chọn sản phẩm khởi đầu |
| R2 | Chất lượng sản phẩm không đồng đều (đặc biệt sản phẩm tạo bằng AI) | Cao | Checklist kiểm duyệt bắt buộc, phân hạng chất lượng |
| R3 | Lời hứa vòng đời vượt năng lực thực tế | Cao | Ma trận trách nhiệm rõ ràng; chỉ công bố mức hỗ trợ đã có |
| R4 | Rủi ro pháp lý về sở hữu trí tuệ và giấy phép mã nguồn | Trung bình | Khai báo bắt buộc (BR-Q04), điều khoản creator |
| R5 | AI tùy chỉnh làm hỏng sản phẩm hoặc tạo lỗ hổng | Trung bình | Giới hạn phạm vi tùy chỉnh, môi trường xem trước, rollback |
| R6 | Chi phí AI và hạ tầng vượt doanh thu | Trung bình | Định giá theo mức tiêu thụ, theo dõi chi phí trên từng khách hàng |
| R7 | Creator rời đi làm gián đoạn dịch vụ | Cao | Điều khoản ký gửi mã nguồn, cơ chế chuyển giao |

---

## 15. Câu hỏi mở cần Product Owner quyết định

| # | Câu hỏi | Ảnh hưởng đến |
|---|---|---|
| Q1 | Thị trường và ngôn ngữ ra mắt? *(website đang dùng tạm BR-P01, BR-P10)* | NFR-07, NFR-08, nội dung |
| Q2 | Lead thuộc về nền tảng hay chuyển cho creator? | FR-L01, quan hệ creator |
| Q3 | Mở đăng ký creator tự do hay chỉ theo lời mời ở Giai đoạn 1? | FR-C01, khối lượng kiểm duyệt |
| Q4 | Các loại giấy phép sử dụng nào được hỗ trợ? | Giai đoạn 2 |
| Q5 | Tỷ lệ phí giao dịch và chu kỳ chi trả cho creator? *(website đang dùng tạm BR-P05, BR-P06)* | Giai đoạn 2 |
| Q6 | Cơ chế tính liên tục khi creator ngừng hoạt động? *(website đang dùng tạm BR-P07)* | Mục 8, điều khoản creator |
| Q7 | Mức hỗ trợ tối thiểu bắt buộc với mọi sản phẩm? *(website đang dùng tạm BR-P02, BR-P03)* | BR-T04, FR-P08 |
| Q8 | Nền tảng hosting được chọn cho Giai đoạn 3? | Giai đoạn 3, chi phí |

---

## 16. Thuật ngữ

| Thuật ngữ | Định nghĩa |
|---|---|
| Product / Template | Website, ứng dụng hoặc công cụ kinh doanh do creator đăng trên marketplace |
| Solution | Nhóm sản phẩm theo ngành nghề hoặc bài toán kinh doanh |
| Product Creator | Cá nhân hoặc tổ chức đăng tải và bán sản phẩm |
| Product User | Khách hàng tìm kiếm, mua, tùy chỉnh và sử dụng sản phẩm |
| AI Customization | Tùy chỉnh sản phẩm thông qua mô tả bằng ngôn ngữ tự nhiên |
| Managed Lifecycle | Nền tảng hỗ trợ triển khai, bảo trì và tính liên tục của sản phẩm |
| Support Level | Mức hỗ trợ được cam kết cho một sản phẩm (phạm vi, thời gian, người chịu trách nhiệm) |
| Lead | Đăng ký quan tâm của User đối với một sản phẩm |
| Vibe coder | Người xây dựng phần mềm chủ yếu nhờ công cụ AI |
