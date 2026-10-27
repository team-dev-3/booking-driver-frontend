/** Nội dung trích từ thiết kế tham chiếu, chưa kết nối dữ liệu vận hành. */
export type ServiceCategory = 'shared' | 'airport' | 'transfer' | 'private'
export interface RoutePreview {
  id: string
  from: string
  to: string
  title: string
  seats: string
  price?: number
  priceLabel?: string
  category: ServiceCategory
  badge: string
  caption: string
  image: string
  features: [string, string]
}
export const routePreviews: RoutePreview[] = [
  {
    id: 'hanoi-haiphong',
    from: 'Hà Nội',
    to: 'Hải Phòng',
    title: 'Hà Nội ⇄ Hải Phòng',
    seats: '4–7 chỗ',
    price: 400000,
    category: 'shared',
    badge: 'Xe ghép',
    caption: 'Cao tốc 5B',
    image: 'route-1',
    features: ['Đón trả tận nhà nội thành', 'Chạy liên tục mỗi 30 phút'],
  },
  {
    id: 'haiphong-halong',
    from: 'Hải Phòng',
    to: 'Hạ Long',
    title: 'Hải Phòng ⇄ Hạ Long',
    seats: '4–7 chỗ',
    price: 250000,
    category: 'shared',
    badge: 'Xe ghép',
    caption: 'Đưa đón du lịch',
    image: 'route-2',
    features: ['Sân bay Cát Bi · Bãi Cháy', 'Xe đời mới điều hòa mát lạnh'],
  },
  {
    id: 'hanoi-halong',
    from: 'Hà Nội',
    to: 'Hạ Long',
    title: 'Hà Nội ⇄ Hạ Long',
    seats: '4–7 chỗ',
    price: 450000,
    category: 'shared',
    badge: 'Xe ghép',
    caption: 'Cao tốc mới',
    image: 'route-3',
    features: ['Đón trả tận cảng tàu quốc tế', 'Miễn phí đợi bay trễ giờ'],
  },
  {
    id: 'halong-mongcai',
    from: 'Hạ Long',
    to: 'Móng Cái',
    title: 'Hạ Long ⇄ Móng Cái',
    seats: '4–7 chỗ',
    price: 350000,
    category: 'shared',
    badge: 'Xe ghép',
    caption: 'Cao tốc Vân Đồn',
    image: 'route-4',
    features: ['Chạy thẳng cửa khẩu Móng Cái', 'Nhận gửi kèm hàng hóa hỏa tốc'],
  },
  {
    id: 'haiphong-mongcai',
    from: 'Hải Phòng',
    to: 'Móng Cái',
    title: 'Hải Phòng ⇄ Móng Cái',
    seats: '5–7 chỗ',
    price: 500000,
    category: 'shared',
    badge: 'Xe ghép',
    caption: 'Tuyến đường dài',
    image: 'route-5',
    features: [
      'Xe riêng / xe ghép linh hoạt',
      'Đón trả tận nơi các xã, phường',
    ],
  },
  {
    id: 'noibai-haiphong',
    from: 'Sân bay Nội Bài',
    to: 'Hải Phòng',
    title: 'Nội Bài ⇄ Hải Phòng',
    seats: '4–7 chỗ',
    priceLabel: 'Báo giá 24/7',
    category: 'airport',
    badge: 'Sân bay',
    caption: 'Đón tận sảnh đến',
    image: 'route-6',
    features: ['Miễn phí biển tên đón sân đến', 'Theo dõi giờ bay hạ cánh'],
  },
  {
    id: 'thaibinh-haiphong',
    from: 'Thái Bình',
    to: 'Hải Phòng',
    title: 'Thái Bình ⇄ Hải Phòng',
    seats: '4–7 chỗ',
    price: 200000,
    category: 'transfer',
    badge: 'Tiện chuyến',
    caption: 'Khám bệnh · Về quê',
    image: 'route-7',
    features: ['Xe tiện chuyến mỗi ngày', 'Đưa đón các viện lớn tận nơi'],
  },
  {
    id: 'private',
    from: '',
    to: '',
    title: 'Bao xe riêng theo yêu cầu',
    seats: '5–7–16 chỗ',
    priceLabel: '900k - 1.200k',
    category: 'private',
    badge: 'Bao xe riêng',
    caption: 'Riêng tư · Không ghép',
    image: 'route-8',
    features: ['Không ghép thêm người lạ', 'Đưa đón chuẩn giờ 100%'],
  },
]
export const articles = [
  {
    id: 'hanoi-vinhlam',
    image: 'stitch/asset-24',
    title: 'Xe ghép Hà Nội – Vịnh Lan Hạ thuận tiện, tiết kiệm, đón trả linh hoạt',
    body: 'Khi lên kế hoạch đi liên tỉnh, bạn nên xác nhận trước điểm đón, điểm trả và thời gian dự kiến. Chuẩn bị hành lý gọn gàng và trao đổi với đơn vị vận chuyển nếu có hành lý lớn.',
  },
  {
    id: 'halong-mongcai',
    image: 'stitch/asset-25',
    title: 'Xe ghép Hạ Long – Móng Cái: Chủ động hành trình, thuận tiện mỗi chuyến đi',
    body: 'Hãy lựa chọn giờ khởi hành phù hợp với lịch trình và dành thời gian dự phòng cho việc di chuyển. Giá tham khảo có thể thay đổi theo loại xe, điểm đón và thời điểm đi.',
  },
  {
    id: 'hanoi-mongcai',
    image: 'stitch/asset-26',
    title: 'Xe ghép Hà Nội – Móng Cái: Hành trình đường dài thuận tiện',
    body: 'Đối với hành trình đường dài, bạn nên kiểm tra đầy đủ thông tin xe, thời gian, tổng chi phí và điều kiện hủy trước khi xác nhận. Nếu di chuyển tới khu vực cửa khẩu, hãy tự kiểm tra giấy tờ cần thiết cho hành trình của mình.',
  },
]
