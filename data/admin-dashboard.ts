
export type DashboardBooking = {
  id: number;
  bookingCode: string;
  customer: string;
  phone: string;
  route: string;
  departureTime: string;
  amount: number;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
};

export const dashboardBookings: DashboardBooking[] = [
  {
    id: 1,
    bookingCode: "GM001",
    customer: "Nguyễn Văn An",
    phone: "0912345678",
    route: "Hà Nội → Hải Phòng",
    departureTime: "21/10/2026 08:00",
    amount: 400000,
    status: "CONFIRMED",
  },
  {
    id: 2,
    bookingCode: "GM002",
    customer: "Trần Thị Mai",
    phone: "0987654321",
    route: "Hải Phòng → Hạ Long",
    departureTime: "21/10/2026 09:30",
    amount: 350000,
    status: "PENDING",
  },
  {
    id: 3,
    bookingCode: "GM003",
    customer: "Lê Minh Hoàng",
    phone: "0901234567",
    route: "Hà Nội → Quảng Ninh",
    departureTime: "20/10/2026 14:00",
    amount: 450000,
    status: "COMPLETED",
  },
  {
    id: 4,
    bookingCode: "GM004",
    customer: "Phạm Thu Hà",
    phone: "0934567890",
    route: "Hạ Long → Móng Cái",
    departureTime: "22/10/2026 07:00",
    amount: 500000,
    status: "CANCELLED",
  },
  {
    id: 5,
    bookingCode: "GM005",
    customer: "Đỗ Quang Huy",
    phone: "0976543210",
    route: "Hải Phòng → Hà Nội",
    departureTime: "22/10/2026 12:30",
    amount: 350000,
    status: "PENDING",
  },
];

export const revenueData = [
  { day: "T2", revenue: 3200000, bookings: 8 },
  { day: "T3", revenue: 4500000, bookings: 12 },
  { day: "T4", revenue: 3800000, bookings: 10 },
  { day: "T5", revenue: 6200000, bookings: 16 },
  { day: "T6", revenue: 5400000, bookings: 14 },
  { day: "T7", revenue: 8100000, bookings: 21 },
  { day: "CN", revenue: 6900000, bookings: 18 },
];
