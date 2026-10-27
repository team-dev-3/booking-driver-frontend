# GOMOVE Frontend

Giao diện website đặt xe GOMOVE xây dựng bằng React, TypeScript và Vite. Ứng dụng gồm trang chủ, dịch vụ, bảng giá, giới thiệu, tin tức, liên hệ và các màn hình tìm, đặt xe.

## Chạy dự án

Từ thư mục gốc của repository:

```bash
cd Frontend
npm ci
npm run dev
```

Mở địa chỉ do Vite hiển thị trong terminal. Các lệnh kiểm tra và build:

```bash
npm run lint
npm run build
npm run preview
```

`preview` phục vụ bản build trong thư mục `dist` của Frontend.

## Cấu trúc chính

| Đường dẫn | Nội dung |
| --- | --- |
| `Frontend/src/pages` | Các trang và route của website. |
| `Frontend/src/components` | Thành phần giao diện dùng chung, layout và section trang chủ. |
| `Frontend/src/features` | State và xử lý theo tính năng tìm, đặt xe, liên hệ. |
| `Frontend/src/data` | Dữ liệu mẫu, tách khỏi giao diện. |
| `Frontend/src/services/api` | Vị trí chuẩn bị cho tích hợp backend. |
| `Frontend/src/styles` | Token thiết kế, font và CSS dùng chung. |
| `Frontend/public` | Ảnh, font và thông tin giấy phép tài nguyên. |
| `Frontend/tools/css` | Nguồn cấu hình cho bộ CSS tiện ích đã biên dịch. |

## Trạng thái tích hợp

Dữ liệu tuyến, dịch vụ và giá hiện là dữ liệu mẫu/tham khảo. Luồng đặt xe và form liên hệ chỉ kiểm tra, hiển thị thông tin trên trình duyệt; chưa tạo đơn hoặc gửi lời nhắn tới backend. Nút gọi điện và liên kết email thực hiện qua ứng dụng trên thiết bị người dùng. Bản đồ tương tác chỉ tải khi người dùng chọn mở.

Khi kết nối backend, thêm mã giao tiếp tại `Frontend/src/services/api` và thay dữ liệu mẫu bằng phản hồi API đã kiểm tra kiểu. Giá, tình trạng xe và trạng thái đơn cần được backend xác nhận trước khi hiển thị thành công. Nội dung chính sách và thông tin vận hành cần được xác nhận trước khi công bố chính thức.

## Triển khai

Ứng dụng dùng React Router. Hosting cần phục vụ `Frontend/dist` và cấu hình điều hướng các URL ứng dụng về `index.html`; route không tồn tại cần được xử lý HTTP 404 phù hợp trên hosting. Không đưa `node_modules`, `dist`, file môi trường hoặc file build tạm lên GitHub. `AGENTS.md`, `Frontend.mdc` và `GEMINI.md` là tài liệu hướng dẫn nằm trong repository.