# Báo cáo testcase UAT — LRCC-2669 / LRCV2-3112

## Tổng quan

| Mục | Kết quả |
| --- | --- |
| Nguồn test | https://amelainc.backlog.com/view/LRCV2-3112#comment-34538989 |
| Môi trường | https://uat.loverec.com/revenue |
| Build quan sát | 8e835e4a-336994 |
| Ngày chụp | 2026-11-16T09:52:04.893Z |
| Số testcase | 30 |
| Đạt (lượt TC × viewport) | 46 |
| Bị chặn (lượt TC × viewport) | 4 |
| Tài khoản chính | anh.luong+1m@amela.vn |
| Tài khoản bổ sung | tuyet.nguyen+001@amela.vn — tài khoản test trong ticket cha |
| Viewport | PC 1440×900; SP 375×812; SP 320×568 |

※ SP là giả lập bằng Chrome headless. Chưa thay thế kiểm thiết bị thật.

※ TC-D1/D2 dùng lỗi mạng/API giả lập trong browser. Doanh thu và CSV ở các case chức năng là dữ liệu thật UAT.

## Trace spec → TC

| Mục comment | Testcase |
| --- | --- |
| A1–A7 | TC-A1–TC-A7; TC-A5r bổ sung chiều PDF → CSV |
| B1 | TC-B1a–TC-B1g: Top/tháng đang tổng hợp; Top/7 ngày; popup năm, tháng, tuần, ngày, toàn thời gian |
| B2–B8 | TC-B2–TC-B8 |
| C | TC-C; TC-Cpost; TC-Cuser; TC-Cexcel |
| D1–D2 | TC-D1–TC-D2 |
| E | PC/SP375/SP320 của TC-A1, TC-A3, TC-B1a–g, TC-B2; TC-Ereal |
| Hiệu năng và refund | TC-Perf; refund thuộc LRCC-2633 |

## Tổng hợp kết quả

| TC | Nội dung | PC | SP375 | SP320 |
| --- | --- | --- | --- | --- |
| TC-A1 | Vị trí CSV và PDF trên card tháng | Đạt | Đạt | Đạt |
| TC-A2 | Skeleton có CSV và PDF disabled | Đạt | — | — |
| TC-A3 | Tải CSV bảng kê tháng đã thanh toán | Đạt | Đạt | Đạt |
| TC-A4 | Tháng chưa có bảng kê tắt CSV và PDF | Đạt | — | — |
| TC-A5 | CSV và PDF dùng chung khóa tải | Đạt | — | — |
| TC-A6 | Card năm và tổng không có CSV | Đạt | — | — |
| TC-A7 | PDF rút tiền nhanh giữ nhãn | Bị chặn | — | — |
| TC-B1a | CSV hiện ở Top: tháng đang tổng hợp | Đạt | Đạt | Đạt |
| TC-B1b | CSV hiện ở Top: kỳ hiển thị 7 ngày | Đạt | Đạt | Đạt |
| TC-B1c | CSV hiện ở Popup kỳ năm | Đạt | Đạt | Đạt |
| TC-B1d | CSV hiện ở Popup kỳ tháng | Đạt | Đạt | Đạt |
| TC-B1e | CSV hiện ở Popup kỳ tuần | Đạt | Đạt | Đạt |
| TC-B1f | CSV hiện ở Popup kỳ ngày | Đạt | Đạt | Đạt |
| TC-B1g | CSV hiện ở Popup toàn thời gian | Đạt | Đạt | Đạt |
| TC-B2 | Tải CSV lịch sử và trạng thái loading | Đạt | Đạt | Đạt |
| TC-B3 | Tên file khớp năm/tháng/tuần/ngày/kỳ hiển thị | Đạt | — | — |
| TC-B4 | Kỳ không có giao dịch tắt CSV | Đạt | — | — |
| TC-B5 | Kỳ chỉ có điểm tắt CSV | Đạt | — | — |
| TC-B6 | Nút CSV tắt trước khi counts tải xong | Đạt | — | — |
| TC-B7 | Đổi tab/sort không làm đổi phạm vi CSV | Đạt | — | — |
| TC-B8 | Bấm CSV liên tục chỉ gửi một request | Đạt | — | — |
| TC-C | Nội dung CSV đối chiếu dữ liệu thật | Đạt | — | — |
| TC-Cpost | CSV bài đăng: 30 ký tự, emoji và xuống dòng | Đạt | — | — |
| TC-Cuser | CSV có gift trực tiếp và user đã xóa | Đạt | — | — |
| TC-D1 | Mất mạng: toast và phục hồi nút | Đạt | — | — |
| TC-D2 | API Not_Found: toast, không sang 404 | Đạt | — | — |
| TC-Ereal | Tải trên Safari iOS / Chrome Android / LINE thật | Bị chặn | — | — |
| TC-A5r | PDF đang tải chặn CSV | Đạt | — | — |
| TC-Cexcel | Hiển thị CSV trong Excel thật | Bị chặn | — | — |
| TC-Perf | Hiệu năng creator nhiều giao dịch | Bị chặn | — | — |

## Còn thiếu và cách bổ sung

| TC | Lý do | Cần làm | Phụ trách |
| --- | --- | --- | --- |
| TC-A7 | Chỉ tìm thấy rút tiền nhanh PENDING. | Cấp tài khoản có withdrawal COMPLETED. | QA |
| TC-Ereal | Chỉ có Chrome headless và viewport giả lập. | Chạy Safari iOS, Chrome Android và LINE thật. | QA |
| TC-Cexcel | Chưa mở Microsoft Excel thật. | Mở CSV đính kèm và kiểm font Nhật/emoji. | QA |
| TC-Perf | Dữ liệu hiện có 377 giao dịch; không đại diện creator lớn. | Tài khoản lớn để đo xuất toàn kỳ dưới 60 giây. | QA / BE |

## Tác động dữ liệu

- Đăng nhập hai tài khoản test.
- Tạo file export CSV qua UI/API.
- Trang revenue tự ghi snapshot khi tải.
- Không tạo giao dịch hoặc đổi trạng thái thanh toán.

## Chi tiết testcase và ảnh

### TC-A1 — Vị trí CSV và PDF trên card tháng

- Nguồn: LRCV2-3112#34538989 A1 / E
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: Vị trí CSV và PDF trên card tháng
- Steps: Mở 入金履歴. Đọc và đo hàng nút của card tháng trên ba viewport.

#### PC — Đạt

- ✓ Thứ tự 詳細 / CSV / 支払明細 (PDF)

> Log đo thực tế: [{"text":"詳細","disabled":false,"aria":null,"x":417,"y":472.0625,"right":465},{"text":"CSV","disabled":true,"aria":"支払明細 (CSV)","x":799.171875,"y":463.0625,"right":872.46875},{"text":"支払明細 (PDF)","disabled":true,"aria":"支払明細 (PDF)","x":880.46875,"y":463.0625,"right":1023}]

- ✓ CSV đứng bên trái PDF
- ✓ Cả cụm nút nằm trong viewport

![Ảnh TC-A1 pc — monthly-buttons](TC-A1_pc_01_monthly-buttons.png)

Card tháng: 詳細 / CSV / 支払明細 (PDF)

- Dữ liệu gốc: [monthly-buttons](api/TC-A1_pc_monthly-buttons.json)

#### SP375 — Đạt

- ✓ Thứ tự 詳細 / CSV / 支払明細 (PDF)

> Log đo thực tế: [{"text":"詳細","disabled":false,"aria":null,"x":36,"y":389,"right":84},{"text":"CSV","disabled":true,"aria":"支払明細 (CSV)","x":115.171875,"y":380,"right":188.46875},{"text":"支払明細 (PDF)","disabled":true,"aria":"支払明細 (PDF)","x":196.46875,"y":380,"right":339}]

- ✓ CSV đứng bên trái PDF
- ✓ Cả cụm nút nằm trong viewport

![Ảnh TC-A1 sp375 — monthly-buttons](TC-A1_sp375_01_monthly-buttons.png)

Card tháng: 詳細 / CSV / 支払明細 (PDF)

- Dữ liệu gốc: [monthly-buttons](api/TC-A1_sp375_monthly-buttons.json)

#### SP320 — Đạt

- ✓ Thứ tự 詳細 / CSV / 支払明細 (PDF)

> Log đo thực tế: [{"text":"詳細","disabled":false,"aria":null,"x":36,"y":380,"right":84},{"text":"CSV","disabled":true,"aria":"支払明細 (CSV)","x":36,"y":410,"right":109.296875},{"text":"支払明細 (PDF)","disabled":true,"aria":"支払明細 (PDF)","x":117.296875,"y":410,"right":259.828125}]

- ✓ CSV đứng bên trái PDF
- ✓ Cả cụm nút nằm trong viewport

![Ảnh TC-A1 sp320 — monthly-buttons](TC-A1_sp320_01_monthly-buttons.png)

Card tháng: 詳細 / CSV / 支払明細 (PDF)

- Dữ liệu gốc: [monthly-buttons](api/TC-A1_sp320_monthly-buttons.json)

### TC-A2 — Skeleton có CSV và PDF disabled

- Nguồn: LRCV2-3112#34538989 A2
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: Skeleton có CSV và PDF disabled
- Steps: Trì hoãn API summary thật. Mở 入金履歴. Chụp skeleton và card sau response.

#### PC — Đạt

- ✓ Skeleton có CSV/PDF đều disabled

> Log đo thực tế: [{"text":"CSV","disabled":true},{"text":"支払明細 (PDF)","disabled":true},{"text":"CSV","disabled":true},{"text":"支払明細 (PDF)","disabled":true},{"text":"CSV","disabled":true},{"text":"支払明細 (PDF)","disabled":true}]

- ✓ Vị trí nút trong card không dịch sau load

> Log đo thực tế: {"before":{"x":407.171875,"y":127,"width":223.828125,"height":32},"after":{"x":407.171875,"y":127,"width":223.828125,"height":32}}


![Ảnh TC-A2 pc — skeleton](TC-A2_pc_01_skeleton.png)

API thật bị trì hoãn 8 giây để chụp trạng thái tải.

![Ảnh TC-A2 pc — loaded](TC-A2_pc_02_loaded.png)

Hàng nút sau khi tải xong.

- Dữ liệu gốc: [skeleton-buttons](api/TC-A2_pc_skeleton-buttons.json)
- Dữ liệu gốc: [button-geometry](api/TC-A2_pc_button-geometry.json)

### TC-A3 — Tải CSV bảng kê tháng đã thanh toán

- Nguồn: LRCV2-3112#34538989 A3 / E
- Tài khoản: tuyet.nguyen+001@amela.vn
- Kỳ vọng: Tải CSV bảng kê tháng đã thanh toán
- Steps: Mở 入金履歴 bằng tài khoản bổ sung. Cuộn tới tháng 3/2026. Bấm CSV. Lưu download thật.

#### PC — Đạt

- ✓ Tháng 入金済 bật nút CSV
- ✓ Tên file payment đúng tháng

> Log đo thực tế: payment_Cgx5nZTY6-003_202603.csv


![Ảnh TC-A3 pc — paid-month](TC-A3_pc_01_paid-month.png)

Tài khoản bổ sung tuyet.nguyen+001; tháng 3 đã có bảng kê.

- Dữ liệu gốc: [statement-export](api/TC-A3_pc_statement-export.json)
- Dữ liệu gốc: [statement-downloaded](api/TC-A3_pc_statement-downloaded.json)

#### SP375 — Đạt

- ✓ Tháng 入金済 bật nút CSV
- ✓ Tên file payment đúng tháng

> Log đo thực tế: payment_Cgx5nZTY6-003_202603.csv


![Ảnh TC-A3 sp375 — paid-month](TC-A3_sp375_01_paid-month.png)

Tài khoản bổ sung tuyet.nguyen+001; tháng 3 đã có bảng kê.

- Dữ liệu gốc: [statement-export](api/TC-A3_sp375_statement-export.json)
- Dữ liệu gốc: [statement-downloaded](api/TC-A3_sp375_statement-downloaded.json)

#### SP320 — Đạt

- ✓ Tháng 入金済 bật nút CSV
- ✓ Tên file payment đúng tháng

> Log đo thực tế: payment_Cgx5nZTY6-003_202603.csv


![Ảnh TC-A3 sp320 — paid-month](TC-A3_sp320_01_paid-month.png)

Tài khoản bổ sung tuyet.nguyen+001; tháng 3 đã có bảng kê.

- Dữ liệu gốc: [statement-export](api/TC-A3_sp320_statement-export.json)
- Dữ liệu gốc: [statement-downloaded](api/TC-A3_sp320_statement-downloaded.json)

### TC-A4 — Tháng chưa có bảng kê tắt CSV và PDF

- Nguồn: LRCV2-3112#34538989 A4
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: Tháng chưa có bảng kê tắt CSV và PDF
- Steps: Mở 入金履歴 bằng tài khoản chính. Kiểm disabled của CSV/PDF trong mọi card tháng.

#### PC — Đạt

- ✓ Mọi tháng của tài khoản chính chưa có bảng kê đều tắt hai nút

> Log đo thực tế: 11 tháng


![Ảnh TC-A4 pc — unpaid](TC-A4_pc_01_unpaid.png)

Tháng 集計中 và 入金予定 đều chưa có bảng kê.

- Dữ liệu gốc: [unpaid-months](api/TC-A4_pc_unpaid-months.json)

### TC-A5 — CSV và PDF dùng chung khóa tải

- Nguồn: LRCV2-3112#34538989 A5
- Tài khoản: tuyet.nguyen+001@amela.vn
- Kỳ vọng: CSV và PDF dùng chung khóa tải
- Steps: Trì hoãn response CSV thật. Bấm CSV ở tháng 入金済. Thử PDF trong lúc tải. Đếm request và chờ download.

#### PC — Đạt

- ✓ Trong lúc tải CSV thì PDF disabled
- ✓ Chỉ một request xuất CSV, không có request PDF

> Log đo thực tế: ["https://uat-api.loverec.com/revenue/period/1620/export-csv"]

- ✓ PDF bật lại sau khi CSV hoàn tất

![Ảnh TC-A5 pc — shared-lock](TC-A5_pc_01_shared-lock.png)

Trì hoãn response thật để đo khóa chung CSV/PDF.

- Dữ liệu gốc: [request-count](api/TC-A5_pc_request-count.json)

### TC-A6 — Card năm và tổng không có CSV

- Nguồn: LRCV2-3112#34538989 A6
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: Card năm và tổng không có CSV
- Steps: Mở 入金履歴. Chọn 全期間. Kiểm toàn bộ card tổng và năm.

#### PC — Đạt

- ✓ Không có CSV ở 全期間

![Ảnh TC-A6 pc — all-time-payment](TC-A6_pc_01_all-time-payment.png)

Card tổng và card năm ở tab 全期間 không có CSV.


### TC-A7 — PDF rút tiền nhanh giữ nhãn

- Nguồn: LRCV2-3112#34538989 A7
- Tài khoản: tuyet.nguyen+001@amela.vn
- Kỳ vọng: PDF rút tiền nhanh giữ nhãn
- Steps: Mở chi tiết tháng 5/2026 của tài khoản bổ sung. Bung dòng エクスプレス出金. Kiểm trạng thái withdrawal.

#### PC — Bị chặn

- Giới hạn: Chưa có rút tiền nhanh COMPLETED trong hai tài khoản; cần QA cung cấp dữ liệu có nút PDF rút tiền nhanh.

![Ảnh TC-A7 pc — express-pending](TC-A7_pc_01_express-pending.png)

Rút tiền nhanh đang 入金待ち; chưa đủ điều kiện hiện nút PDF.

- Dữ liệu gốc: [express-detail](api/TC-A7_pc_express-detail.json)

### TC-B1a — CSV hiện ở Top: tháng đang tổng hợp

- Nguồn: LRCV2-3112#34538989 B1 / E
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: CSV hiện ở Top: tháng đang tổng hợp
- Steps: Chọn kỳ theo tên testcase. Mở 収益履歴 từ Top hoặc popup chi tiết kỳ. Kiểm CSV và khoảng kỳ.

#### PC — Đạt

- ✓ CSV hiện ở hàng ngày

![Ảnh TC-B1a pc — top](TC-B1a_pc_01_top.png)

Top: tháng đang tổng hợp

- Dữ liệu gốc: [period](api/TC-B1a_pc_period.json)

#### SP375 — Đạt

- ✓ CSV hiện ở hàng ngày

![Ảnh TC-B1a sp375 — top](TC-B1a_sp375_01_top.png)

Top: tháng đang tổng hợp

- Dữ liệu gốc: [period](api/TC-B1a_sp375_period.json)

#### SP320 — Đạt

- ✓ CSV hiện ở hàng ngày

![Ảnh TC-B1a sp320 — top](TC-B1a_sp320_01_top.png)

Top: tháng đang tổng hợp

- Dữ liệu gốc: [period](api/TC-B1a_sp320_period.json)

### TC-B1b — CSV hiện ở Top: kỳ hiển thị 7 ngày

- Nguồn: LRCV2-3112#34538989 B1 / E
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: CSV hiện ở Top: kỳ hiển thị 7 ngày
- Steps: Chọn kỳ theo tên testcase. Mở 収益履歴 từ Top hoặc popup chi tiết kỳ. Kiểm CSV và khoảng kỳ.

#### PC — Đạt

- ✓ CSV hiện ở hàng ngày

![Ảnh TC-B1b pc — display](TC-B1b_pc_01_display.png)

Top: kỳ hiển thị 7 ngày

- Dữ liệu gốc: [period](api/TC-B1b_pc_period.json)

#### SP375 — Đạt

- ✓ CSV hiện ở hàng ngày

![Ảnh TC-B1b sp375 — display](TC-B1b_sp375_01_display.png)

Top: kỳ hiển thị 7 ngày

- Dữ liệu gốc: [period](api/TC-B1b_sp375_period.json)

#### SP320 — Đạt

- ✓ CSV hiện ở hàng ngày

![Ảnh TC-B1b sp320 — display](TC-B1b_sp320_01_display.png)

Top: kỳ hiển thị 7 ngày

- Dữ liệu gốc: [period](api/TC-B1b_sp320_period.json)

### TC-B1c — CSV hiện ở Popup kỳ năm

- Nguồn: LRCV2-3112#34538989 B1 / E
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: CSV hiện ở Popup kỳ năm
- Steps: Chọn kỳ theo tên testcase. Mở 収益履歴 từ Top hoặc popup chi tiết kỳ. Kiểm CSV và khoảng kỳ.

#### PC — Đạt

- ✓ CSV hiện ở hàng ngày

![Ảnh TC-B1c pc — year](TC-B1c_pc_01_year.png)

Popup kỳ năm

- Dữ liệu gốc: [period](api/TC-B1c_pc_period.json)

#### SP375 — Đạt

- ✓ CSV hiện ở hàng ngày

![Ảnh TC-B1c sp375 — year](TC-B1c_sp375_01_year.png)

Popup kỳ năm

- Dữ liệu gốc: [period](api/TC-B1c_sp375_period.json)

#### SP320 — Đạt

- ✓ CSV hiện ở hàng ngày

![Ảnh TC-B1c sp320 — year](TC-B1c_sp320_01_year.png)

Popup kỳ năm

- Dữ liệu gốc: [period](api/TC-B1c_sp320_period.json)

### TC-B1d — CSV hiện ở Popup kỳ tháng

- Nguồn: LRCV2-3112#34538989 B1 / E
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: CSV hiện ở Popup kỳ tháng
- Steps: Chọn kỳ theo tên testcase. Mở 収益履歴 từ Top hoặc popup chi tiết kỳ. Kiểm CSV và khoảng kỳ.

#### PC — Đạt

- ✓ CSV hiện ở hàng ngày

![Ảnh TC-B1d pc — month](TC-B1d_pc_01_month.png)

Popup kỳ tháng

- Dữ liệu gốc: [period](api/TC-B1d_pc_period.json)

#### SP375 — Đạt

- ✓ CSV hiện ở hàng ngày

![Ảnh TC-B1d sp375 — month](TC-B1d_sp375_01_month.png)

Popup kỳ tháng

- Dữ liệu gốc: [period](api/TC-B1d_sp375_period.json)

#### SP320 — Đạt

- ✓ CSV hiện ở hàng ngày

![Ảnh TC-B1d sp320 — month](TC-B1d_sp320_01_month.png)

Popup kỳ tháng

- Dữ liệu gốc: [period](api/TC-B1d_sp320_period.json)

### TC-B1e — CSV hiện ở Popup kỳ tuần

- Nguồn: LRCV2-3112#34538989 B1 / E
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: CSV hiện ở Popup kỳ tuần
- Steps: Chọn kỳ theo tên testcase. Mở 収益履歴 từ Top hoặc popup chi tiết kỳ. Kiểm CSV và khoảng kỳ.

#### PC — Đạt

- ✓ CSV hiện ở hàng ngày

![Ảnh TC-B1e pc — week](TC-B1e_pc_01_week.png)

Popup kỳ tuần

- Dữ liệu gốc: [period](api/TC-B1e_pc_period.json)

#### SP375 — Đạt

- ✓ CSV hiện ở hàng ngày

![Ảnh TC-B1e sp375 — week](TC-B1e_sp375_01_week.png)

Popup kỳ tuần

- Dữ liệu gốc: [period](api/TC-B1e_sp375_period.json)

#### SP320 — Đạt

- ✓ CSV hiện ở hàng ngày

![Ảnh TC-B1e sp320 — week](TC-B1e_sp320_01_week.png)

Popup kỳ tuần

- Dữ liệu gốc: [period](api/TC-B1e_sp320_period.json)

### TC-B1f — CSV hiện ở Popup kỳ ngày

- Nguồn: LRCV2-3112#34538989 B1 / E
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: CSV hiện ở Popup kỳ ngày
- Steps: Chọn kỳ theo tên testcase. Mở 収益履歴 từ Top hoặc popup chi tiết kỳ. Kiểm CSV và khoảng kỳ.

#### PC — Đạt

- ✓ CSV hiện ở hàng ngày

![Ảnh TC-B1f pc — day](TC-B1f_pc_01_day.png)

Popup kỳ ngày

- Dữ liệu gốc: [period](api/TC-B1f_pc_period.json)

#### SP375 — Đạt

- ✓ CSV hiện ở hàng ngày

![Ảnh TC-B1f sp375 — day](TC-B1f_sp375_01_day.png)

Popup kỳ ngày

- Dữ liệu gốc: [period](api/TC-B1f_sp375_period.json)

#### SP320 — Đạt

- ✓ CSV hiện ở hàng ngày

![Ảnh TC-B1f sp320 — day](TC-B1f_sp320_01_day.png)

Popup kỳ ngày

- Dữ liệu gốc: [period](api/TC-B1f_sp320_period.json)

### TC-B1g — CSV hiện ở Popup toàn thời gian

- Nguồn: LRCV2-3112#34538989 B1 / E
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: CSV hiện ở Popup toàn thời gian
- Steps: Chọn kỳ theo tên testcase. Mở 収益履歴 từ Top hoặc popup chi tiết kỳ. Kiểm CSV và khoảng kỳ.

#### PC — Đạt

- ✓ CSV hiện ở hàng ngày

![Ảnh TC-B1g pc — all](TC-B1g_pc_01_all.png)

Popup toàn thời gian

- Dữ liệu gốc: [period](api/TC-B1g_pc_period.json)

#### SP375 — Đạt

- ✓ CSV hiện ở hàng ngày

![Ảnh TC-B1g sp375 — all](TC-B1g_sp375_01_all.png)

Popup toàn thời gian

- Dữ liệu gốc: [period](api/TC-B1g_sp375_period.json)

#### SP320 — Đạt

- ✓ CSV hiện ở hàng ngày

![Ảnh TC-B1g sp320 — all](TC-B1g_sp320_01_all.png)

Popup toàn thời gian

- Dữ liệu gốc: [period](api/TC-B1g_sp320_period.json)

### TC-B2 — Tải CSV lịch sử và trạng thái loading

- Nguồn: LRCV2-3112#34538989 B2 / E
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: Tải CSV lịch sử và trạng thái loading
- Steps: Mở lịch sử tháng 6/2026 từ popup chi tiết kỳ. Bấm CSV. Chụp loading. Chờ download và kiểm nút phục hồi.

#### PC — Đạt

- ✓ CSV có aria-busy và disabled khi tải
- ✓ File revenue đúng tháng 6

> Log đo thực tế: revenue_VVXPkXBk_202606_20261116-1538.csv

- ✓ Hết loading sau khi xong

![Ảnh TC-B2 pc — loading](TC-B2_pc_01_loading.png)

Trì hoãn response thật 1,8 giây; nút CSV đang tải.

![Ảnh TC-B2 pc — downloaded](TC-B2_pc_02_downloaded.png)

File tải thật: revenue_VVXPkXBk_202606_20261116-1538.csv

- Dữ liệu gốc: [export](api/TC-B2_pc_export.json)
- Dữ liệu gốc: [download](api/TC-B2_pc_download.json)

#### SP375 — Đạt

- ✓ CSV có aria-busy và disabled khi tải
- ✓ File revenue đúng tháng 6

> Log đo thực tế: revenue_VVXPkXBk_202606_20261116-1539.csv

- ✓ Hết loading sau khi xong

![Ảnh TC-B2 sp375 — loading](TC-B2_sp375_01_loading.png)

Trì hoãn response thật 1,8 giây; nút CSV đang tải.

![Ảnh TC-B2 sp375 — downloaded](TC-B2_sp375_02_downloaded.png)

File tải thật: revenue_VVXPkXBk_202606_20261116-1539.csv

- Dữ liệu gốc: [export](api/TC-B2_sp375_export.json)
- Dữ liệu gốc: [download](api/TC-B2_sp375_download.json)

#### SP320 — Đạt

- ✓ CSV có aria-busy và disabled khi tải
- ✓ File revenue đúng tháng 6

> Log đo thực tế: revenue_VVXPkXBk_202606_20261116-1539.csv

- ✓ Hết loading sau khi xong

![Ảnh TC-B2 sp320 — loading](TC-B2_sp320_01_loading.png)

Trì hoãn response thật 1,8 giây; nút CSV đang tải.

![Ảnh TC-B2 sp320 — downloaded](TC-B2_sp320_02_downloaded.png)

File tải thật: revenue_VVXPkXBk_202606_20261116-1539.csv

- Dữ liệu gốc: [export](api/TC-B2_sp320_export.json)
- Dữ liệu gốc: [download](api/TC-B2_sp320_download.json)

### TC-B3 — Tên file khớp năm/tháng/tuần/ngày/kỳ hiển thị

- Nguồn: LRCV2-3112#34538989 B3
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: Tên file khớp năm/tháng/tuần/ngày/kỳ hiển thị
- Steps: Lần lượt chọn năm / tháng / tuần / ngày / 7 ngày / toàn thời gian. Tải CSV qua UI. So tên file với startDate/endDate.

#### PC — Đạt

- ✓ Tải file thật qua nút CSV

> Log đo thực tế: revenue_VVXPkXBk_2026_20261116-1539.csv

- ✓ Tên file year khớp khoảng request

> Log đo thực tế: revenue_VVXPkXBk_2026_20261116-1539.csv

- ✓ Tải file thật qua nút CSV

> Log đo thực tế: revenue_VVXPkXBk_202606_20261116-1539.csv

- ✓ Tên file month khớp khoảng request

> Log đo thực tế: revenue_VVXPkXBk_202606_20261116-1539.csv

- ✓ Tải file thật qua nút CSV

> Log đo thực tế: revenue_VVXPkXBk_20260608-20260614_20261116-1539.csv

- ✓ Tên file week khớp khoảng request

> Log đo thực tế: revenue_VVXPkXBk_20260608-20260614_20261116-1539.csv

- ✓ Tải file thật qua nút CSV

> Log đo thực tế: revenue_VVXPkXBk_20260610_20261116-1539.csv

- ✓ Tên file day khớp khoảng request

> Log đo thực tế: revenue_VVXPkXBk_20260610_20261116-1539.csv

- ✓ Tải file thật qua nút CSV

> Log đo thực tế: revenue_VVXPkXBk_20261110-20261116_20261116-1539.csv

- ✓ Tên file display khớp khoảng request

> Log đo thực tế: revenue_VVXPkXBk_20261110-20261116_20261116-1539.csv

- ✓ Tải file thật qua nút CSV

> Log đo thực tế: revenue_VVXPkXBk_20250101-20261231_20261116-1539.csv

- ✓ Tên file all khớp khoảng request

> Log đo thực tế: revenue_VVXPkXBk_20250101-20261231_20261116-1539.csv


![Ảnh TC-B3 pc — year-download](TC-B3_pc_01_year-download.png)

Đã tải file thật: revenue_VVXPkXBk_2026_20261116-1539.csv

![Ảnh TC-B3 pc — month-download](TC-B3_pc_02_month-download.png)

Đã tải file thật: revenue_VVXPkXBk_202606_20261116-1539.csv

![Ảnh TC-B3 pc — week-download](TC-B3_pc_03_week-download.png)

Đã tải file thật: revenue_VVXPkXBk_20260608-20260614_20261116-1539.csv

![Ảnh TC-B3 pc — day-download](TC-B3_pc_04_day-download.png)

Đã tải file thật: revenue_VVXPkXBk_20260610_20261116-1539.csv

![Ảnh TC-B3 pc — display-download](TC-B3_pc_05_display-download.png)

Đã tải file thật: revenue_VVXPkXBk_20261110-20261116_20261116-1539.csv

![Ảnh TC-B3 pc — all-download](TC-B3_pc_06_all-download.png)

Đã tải file thật: revenue_VVXPkXBk_20250101-20261231_20261116-1539.csv

- Dữ liệu gốc: [year-request-response](api/TC-B3_pc_year-request-response.json)
- Dữ liệu gốc: [year-download](api/TC-B3_pc_year-download.json)
- Dữ liệu gốc: [month-request-response](api/TC-B3_pc_month-request-response.json)
- Dữ liệu gốc: [month-download](api/TC-B3_pc_month-download.json)
- Dữ liệu gốc: [week-request-response](api/TC-B3_pc_week-request-response.json)
- Dữ liệu gốc: [week-download](api/TC-B3_pc_week-download.json)
- Dữ liệu gốc: [day-request-response](api/TC-B3_pc_day-request-response.json)
- Dữ liệu gốc: [day-download](api/TC-B3_pc_day-download.json)
- Dữ liệu gốc: [display-request-response](api/TC-B3_pc_display-request-response.json)
- Dữ liệu gốc: [display-download](api/TC-B3_pc_display-download.json)
- Dữ liệu gốc: [all-request-response](api/TC-B3_pc_all-request-response.json)
- Dữ liệu gốc: [all-download](api/TC-B3_pc_all-download.json)

### TC-B4 — Kỳ không có giao dịch tắt CSV

- Nguồn: LRCV2-3112#34538989 B4
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: Kỳ không có giao dịch tắt CSV
- Steps: Chọn tháng 11. Mở tuần 11/2–11/8 rồi mở 収益履歴. Kiểm số giao dịch và CSV.

#### PC — Đạt

- ✓ Danh sách 0 và CSV disabled

> Log đo thực tế: 収益履歴 2026/11/2~11/8 CSV 全体  (0) サブスクプラン  (0) 単品販売 / 動画  (0) 単品販売 / ポスト  (0) コイン  (0) 収益額：￥0 新着順 収益履歴はありません


![Ảnh TC-B4 pc — empty](TC-B4_pc_01_empty.png)

Kỳ tuần 11/2–11/8 không có giao dịch.

- Dữ liệu gốc: [empty-ui](api/TC-B4_pc_empty-ui.json)

### TC-B5 — Kỳ chỉ có điểm tắt CSV

- Nguồn: LRCV2-3112#34538989 B5
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: Kỳ chỉ có điểm tắt CSV
- Steps: Chọn tháng 4. Mở popup chi tiết tháng rồi mở 収益履歴. Kiểm 52 giao dịch điểm và CSV.

#### PC — Đạt

- ✓ Có 52 giao dịch điểm và CSV disabled

> Log đo thực tế: 収益履歴 2026/4/1~4/30 繰越し CSV 全体  (52) サブスクプラン  (0) 単品販売 / 動画  (0) 単品販売 / ポスト  (0) ポイント  (52) コイン  (0) 収益額：￥2,539 新着順 日付	項目	詳細	収益額	ユーザー 26/4/24 16:09	 103pt 	 無料です🎄🎁💕サンタさんからプレゼントです♡ 	￥412	 Phuong03UAT-123  26/4/21 23:43	 0.9pt 	 テスト 	￥3	 れちゃん🐣れちゃん🐣れちゃん🐣れちゃん🐣れちゃん🐣れちゃん🐣れちゃん🐣れちゃん🐣れち  26/4/21 23:41	 1.8pt 	 テスト 	￥7	 れちゃん🐣れちゃん🐣れちゃん🐣れちゃん🐣れちゃん


![Ảnh TC-B5 pc — point-only](TC-B5_pc_01_point-only.png)

Tháng 4 có 52 giao dịch điểm; CSV không xuất điểm.

- Dữ liệu gốc: [point-ui](api/TC-B5_pc_point-ui.json)

### TC-B6 — Nút CSV tắt trước khi counts tải xong

- Nguồn: LRCV2-3112#34538989 B6
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: Nút CSV tắt trước khi counts tải xong
- Steps: Trì hoãn response history thật. Mở 収益履歴. Đo CSV trước và sau response.

#### PC — Đạt

- ✓ Trước response CSV disabled
- ✓ Có counts thì CSV bật

![Ảnh TC-B6 pc — before-counts](TC-B6_pc_01_before-counts.png)

Response thật bị trì hoãn để kiểm trạng thái trước counts.

![Ảnh TC-B6 pc — after-counts](TC-B6_pc_02_after-counts.png)

CSV bật sau khi dữ liệu thật tải về.


### TC-B7 — Đổi tab/sort không làm đổi phạm vi CSV

- Nguồn: LRCV2-3112#34538989 B7 / Q8
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: Đổi tab/sort không làm đổi phạm vi CSV
- Steps: Mở tháng 6. Theo dõi DOM bằng MutationObserver. Đổi tất cả tab và chọn 古い順. Xuất CSV từ tab điểm.

#### PC — Đạt

- ✓ CSV bật ở tab サブスクプラン
- ✓ CSV bật ở tab 単品販売 / 動画
- ✓ CSV bật ở tab ポイント
- ✓ CSV bật ở tab コイン
- ✓ CSV bật ở tab 全体
- ✓ Không xuất hiện trạng thái disabled khi đổi tab/sort

> Log đo thực tế: []

- ✓ Tải file thật qua nút CSV

> Log đo thực tế: revenue_VVXPkXBk_202606_20261116-1540.csv

- ✓ Xuất 85 giao dịch không phụ thuộc tab điểm

> Log đo thực tế: 85

- ✓ Request chỉ có khoảng ngày

> Log đo thực tế: {"startDate":"2026-05-31T15:00:00.000Z","endDate":"2026-06-30T14:59:59.999Z"}


![Ảnh TC-B7 pc — from-point-tab-download](TC-B7_pc_01_from-point-tab-download.png)

Đã tải file thật: revenue_VVXPkXBk_202606_20261116-1540.csv

- Dữ liệu gốc: [csv-state-mutations](api/TC-B7_pc_csv-state-mutations.json)
- Dữ liệu gốc: [from-point-tab-request-response](api/TC-B7_pc_from-point-tab-request-response.json)
- Dữ liệu gốc: [from-point-tab-download](api/TC-B7_pc_from-point-tab-download.json)

### TC-B8 — Bấm CSV liên tục chỉ gửi một request

- Nguồn: LRCV2-3112#34538989 B8
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: Bấm CSV liên tục chỉ gửi một request
- Steps: Mở tháng 6. Trì hoãn response export thật. Click nút 8 lần liên tiếp. Đếm request xuất.

#### PC — Đạt

- ✓ 8 click chỉ tạo 1 request

> Log đo thực tế: 1


![Ảnh TC-B8 pc — rapid-click](TC-B8_pc_01_rapid-click.png)

Gọi click 8 lần liên tiếp trên nút thật.

- Dữ liệu gốc: [rapid-click-result](api/TC-B8_pc_rapid-click-result.json)

### TC-C — Nội dung CSV đối chiếu dữ liệu thật

- Nguồn: LRCV2-3112#34538989 C
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: CSV 7 cột; 85 dòng; tổng chính xác sau loại điểm; đối chiếu từng dòng với API popup.
- Steps: Tải CSV tháng 6 qua UI. Parse CSV. Lấy API popup sort asc và tab điểm cùng kỳ. So sánh các cột và từng giao dịch.

#### PC — Đạt

- ✓ Tải file thật qua nút CSV

> Log đo thực tế: revenue_VVXPkXBk_202606_20261116-1542.csv

- ✓ Đúng 7 cột

> Log đo thực tế: ["日付","項目","詳細","通貨量","換算レート","収益額（円）","ユーザー"]

- ✓ UTF-8 BOM
- ✓ Số dòng = counts.all - counts.point

> Log đo thực tế: 85

- ✓ Không có điểm hoặc dòng tổng
- ✓ Tổng CSV = toàn kỳ trừ điểm

> Log đo thực tế: {"csv":211194.38000000003,"all":211653.98,"point":459.6,"expected":211194.38}

- ✓ Ngày subscription / ngày giờ JST đúng định dạng
- ✓ Đơn vị tk/cn
- ✓ Lượng × rate = thu nhập (sai số <0,00005)
- ✓ Mọi doanh thu và tên người dùng khớp API popup
- ✓ Thứ tự cũ → mới khớp API sort asc

![Ảnh TC-C pc — csv-content-june-download](TC-C_pc_01_csv-content-june-download.png)

Đã tải file thật: revenue_VVXPkXBk_202606_20261116-1542.csv

![Ảnh TC-C pc — csv-table](TC-C_pc_csv-table.png)

Trích dữ liệu nguyên văn từ revenue_VVXPkXBk_202606_20261116-1542.csv. Trang xem local; chưa kiểm Excel.

- Dữ liệu gốc: [csv-content-june-request-response](api/TC-C_pc_csv-content-june-request-response.json)
- Dữ liệu gốc: [csv-content-june-download](api/TC-C_pc_csv-content-june-download.json)
- Dữ liệu gốc: [history-all](api/TC-C_pc_history-all.json)
- Dữ liệu gốc: [history-all-page-2](api/TC-C_pc_history-all-page-2.json)
- Dữ liệu gốc: [history-point](api/TC-C_pc_history-point.json)
- Dữ liệu gốc: [csv-calculations](api/TC-C_pc_csv-calculations.json)

### TC-Cpost — CSV bài đăng: 30 ký tự, emoji và xuống dòng

- Nguồn: LRCV2-3112#34538989 C / Q6
- Tài khoản: tuyet.nguyen+001@amela.vn
- Kỳ vọng: CSV bài đăng: 30 ký tự, emoji và xuống dòng
- Steps: Dùng tài khoản bổ sung. Tải CSV tháng 11. Parse ô quoted multiline và kiểm dòng bài đăng.

#### PC — Đạt

- ✓ Tải file thật qua nút CSV

> Log đo thực tế: revenue_gx5nZTY6_202611_20261116-1542.csv

- ✓ Có đủ 30 giao dịch bài đăng

> Log đo thực tế: 30

- ✓ Có fallback ポスト và bài dài rút gọn
- ✓ CSV có emoji và newline trong cùng ô
- ✓ Mọi dòng vẫn 7 cột sau parse CSV quoted multiline

![Ảnh TC-Cpost pc — post-csv-download](TC-Cpost_pc_01_post-csv-download.png)

Đã tải file thật: revenue_gx5nZTY6_202611_20261116-1542.csv

![Ảnh TC-Cpost pc — csv-table](TC-Cpost_pc_csv-table.png)

Trích dữ liệu nguyên văn từ revenue_gx5nZTY6_202611_20261116-1542.csv. Trang xem local; chưa kiểm Excel.

- Dữ liệu gốc: [post-csv-request-response](api/TC-Cpost_pc_post-csv-request-response.json)
- Dữ liệu gốc: [post-csv-download](api/TC-Cpost_pc_post-csv-download.json)
- Dữ liệu gốc: [post-popup-api](api/TC-Cpost_pc_post-popup-api.json)
- Dữ liệu gốc: [post-samples](api/TC-Cpost_pc_post-samples.json)

### TC-Cuser — CSV có gift trực tiếp và user đã xóa

- Nguồn: LRCV2-3112#34538989 C / Q6
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: CSV có gift trực tiếp và user đã xóa
- Steps: Tải CSV năm 2026. Kiểm các dòng gift trực tiếp và người dùng đã xóa.

#### PC — Đạt

- ✓ Tải file thật qua nút CSV

> Log đo thực tế: revenue_VVXPkXBk_2026_20261116-1541.csv

- ✓ Có người dùng đã xóa
- ✓ Gift trực tiếp ghi ダイレクト

![Ảnh TC-Cuser pc — deleted-user-download](TC-Cuser_pc_01_deleted-user-download.png)

Đã tải file thật: revenue_VVXPkXBk_2026_20261116-1541.csv

![Ảnh TC-Cuser pc — csv-table](TC-Cuser_pc_csv-table.png)

Trích dữ liệu nguyên văn từ revenue_VVXPkXBk_2026_20261116-1541.csv. Trang xem local; chưa kiểm Excel.

- Dữ liệu gốc: [deleted-user-request-response](api/TC-Cuser_pc_deleted-user-request-response.json)
- Dữ liệu gốc: [deleted-user-download](api/TC-Cuser_pc_deleted-user-download.json)
- Dữ liệu gốc: [special-rows](api/TC-Cuser_pc_special-rows.json)

### TC-D1 — Mất mạng: toast và phục hồi nút

- Nguồn: LRCV2-3112#34538989 D1 / D2
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: Mất mạng: toast và phục hồi nút
- Steps: Mở tháng 6. Chuyển context browser sang offline. Bấm CSV. Chụp toast. Khôi phục mạng.

#### PC — Đạt

- ✓ Hiện toast lỗi kết nối

> Log đo thực tế: 接続エラーです。しばらくしてからもう一度お試しください。

- ✓ Không chuyển hướng /404

> Log đo thực tế: https://uat.loverec.com/revenue

- ✓ CSV bật lại sau lỗi

![Ảnh TC-D1 pc — error-toast](TC-D1_pc_01_error-toast.png)

Mất mạng giả lập bằng context.setOffline(true).

- Dữ liệu gốc: [error-ui](api/TC-D1_pc_error-ui.json)

### TC-D2 — API Not_Found: toast, không sang 404

- Nguồn: LRCV2-3112#34538989 D1 / D2
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: API Not_Found: toast, không sang 404
- Steps: Mở tháng 6. Giả lập response Not_Found cho export trong browser. Bấm CSV. Kiểm toast và URL.

#### PC — Đạt

- ✓ Hiện toast lỗi kết nối

> Log đo thực tế: 接続エラーです。しばらくしてからもう一度お試しください。

- ✓ Không chuyển hướng /404

> Log đo thực tế: https://uat.loverec.com/revenue

- ✓ CSV bật lại sau lỗi

![Ảnh TC-D2 pc — error-toast](TC-D2_pc_01_error-toast.png)

Giả lập response Not_Found chỉ trong browser; không đổi BE UAT.

- Dữ liệu gốc: [error-ui](api/TC-D2_pc_error-ui.json)

### TC-Ereal — Tải trên Safari iOS / Chrome Android / LINE thật

- Nguồn: LRCV2-3112#34538989 E
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: Tải trên Safari iOS / Chrome Android / LINE thật
- Steps: Kiểm download trên Safari iOS, Chrome Android và LINE thật. Runtime hiện tại chưa hỗ trợ.

#### PC — Bị chặn

- Giới hạn: Headless Chrome và viewport SP không chứng minh thiết bị thật. QA kiểm download trên Safari iOS, Chrome Android và LINE WebView.


### TC-A5r — PDF đang tải chặn CSV

- Nguồn: LRCV2-3112#34538989 A5 chiều ngược
- Tài khoản: tuyet.nguyen+001@amela.vn
- Kỳ vọng: PDF đang tải chặn CSV
- Steps: Bấm PDF tại tháng 3 đã thanh toán. Trì hoãn response thật. Thử CSV trong lúc tải và đếm request.

#### PC — Đạt

- ✓ CSV disabled khi PDF đang tải
- ✓ Không gửi request CSV trong lúc tải PDF

> Log đo thực tế: ["https://uat-api.loverec.com/revenue/period/1620/export"]

- ✓ CSV bật lại sau response PDF

![Ảnh TC-A5r pc — pdf-lock](TC-A5r_pc_01_pdf-lock.png)

Trì hoãn response PDF thật; CSV bị khóa.

- Dữ liệu gốc: [pdf-response](api/TC-A5r_pc_pdf-response.json)
- Dữ liệu gốc: [requests](api/TC-A5r_pc_requests.json)

### TC-Cexcel — Hiển thị CSV trong Excel thật

- Nguồn: LRCV2-3112#34538989 C: font Nhật và emoji
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: Hiển thị CSV trong Excel thật
- Steps: Kiểm điều kiện dữ liệu/thiết bị của testcase trước khi chạy.

#### PC — Bị chặn

- Giới hạn: Đã kiểm UTF-8 BOM và parse ký tự. Chưa mở bằng Microsoft Excel thật; QA kiểm font và emoji trong Excel.


### TC-Perf — Hiệu năng creator nhiều giao dịch

- Nguồn: LRCV2-3112#34538989 Chưa test được / cần chú ý
- Tài khoản: anh.luong+1m@amela.vn
- Kỳ vọng: Hiệu năng creator nhiều giao dịch
- Steps: Kiểm điều kiện dữ liệu/thiết bị của testcase trước khi chạy.

#### PC — Bị chặn

- Giới hạn: Tài khoản chính chỉ có 377 giao dịch popup / 299 dòng CSV. Chưa có creator dữ liệu lớn để kết luận tải toàn kỳ dưới 60 giây.



## Review độc lập

- Kết quả review độc lập: PASS. Reviewer đã xem đủ 60 ảnh.
- Không còn finding high / medium / low.
- Kết quả chi tiết: [review-result.json](review-result.json).
- Nhật ký sửa ảnh A2/B6: [review-log.md](review-log.md).
- Bản này dùng để user review nội bộ.
