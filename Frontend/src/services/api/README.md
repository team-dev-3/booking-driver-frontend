# Kết nối API

Thư mục này dành cho mã giao tiếp với backend khi có hợp đồng API. Hiện frontend dùng dữ liệu mẫu trong `src/data` và chưa gửi yêu cầu đặt xe hoặc lời nhắn liên hệ.

Khi tích hợp, đặt client HTTP và các service theo chức năng tại đây. Khai báo kiểu dữ liệu trả về, xử lý trạng thái tải/lỗi, và xác thực lại giá cùng tình trạng xe trước khi xác nhận đặt chuyến. Không đưa khóa bí mật hoặc token phiên vào mã frontend.
