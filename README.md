# GoAnywhere Admin Dashboard

Frontend React + TypeScript + Vite cho cổng quản trị GoAnywhere. Các module chỉ được triển khai theo tài liệu trong `Rule/`.

## Đơn đặt xe

- Danh sách: `GET /admin/booking/list`, hỗ trợ phân trang và lọc theo trạng thái, mã đơn. Hợp đồng mô tả tìm theo số điện thoại nhưng không ghi rõ tên tham số; `phone` đang là tên query đề xuất.
- Chi tiết: `GET /admin/booking/detail/{id}`.
- Hủy: `PATCH /admin/booking/cancel/{id}` với `cancelReason` và `isDriverFault`. Tài liệu ghi endpoint `/admin/booking/cancel` cùng path variable `id`, nhưng chưa ghi rõ mẫu URL; frontend đang diễn giải thành `{id}` trên path. Cần xác nhận với backend.
- Bộ lọc theo tuyến và giờ/ngày khởi hành được yêu cầu trong SRS, nhưng chưa có trong API contract. Frontend gửi `routeName`, `departureDate`, `departureTime` như query parameters đề xuất; backend cần xác nhận hoặc triển khai chúng để bộ lọc hoạt động.
- API chi tiết chưa trả danh sách khách đi chung hoặc thông tin tuyến/giờ; API hiện tại cũng chưa mô tả cập nhật đơn. Chưa hiển thị dữ liệu suy đoán hoặc thêm thao tác cập nhật.
- API đặt hộ đã mô tả `fixedScheduleId`, nhưng hiện chưa có API tra cứu lịch/chuyến để chọn lịch hợp lệ; chưa triển khai form đặt hộ để tránh nhập ID tùy ý.
- Các API riêng tư cần token, nhưng contract chưa xác định cơ chế truyền token. Frontend hiện dùng `Authorization: Bearer <token>`; cần backend xác nhận.

## Chạy và kiểm tra

Tạo `.env` từ `.env.example`, đặt `VITE_API_BASE_URL` theo backend rồi chạy:

```powershell
npm install
npm run dev
```

Kiểm tra:

```powershell
npm run typecheck
npm run lint
npm run build
```