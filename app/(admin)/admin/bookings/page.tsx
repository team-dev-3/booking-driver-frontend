"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  CircleCheck,
  Clock3,
  ArrowUpRight,
  RefreshCw,
  Search,
  Plus,
  Wallet,
  CarFront,
  Filter,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import AdminShell from "@/components/admin/AdminShell";
import { getBookingList } from "@/lib/admin-api";
import type { BookingItem } from "@/types/admin";

const money = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + "đ";

const formatDateTime = (val?: string | Date) => {
  if (!val) return "---";
  try {
    const d = new Date(val);
    if (isNaN(d.getTime())) return "---";
    return d.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "---";
  }
};

const statusConfig: Record<string, { label: string; className: string }> = {
  PENDING_PAYMENT: {
    label: "Chờ thanh toán",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  FINDING_DRIVER: {
    label: "Đang tìm tài xế",
    className: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  DRIVER_ASSIGNED: {
    label: "Đã gán tài xế",
    className: "bg-sky-50 text-sky-700 border border-sky-200",
  },
  IN_PROGRESS: {
    label: "Đang di chuyển",
    className: "bg-purple-50 text-purple-700 border border-purple-200",
  },
  COMPLETED: {
    label: "Hoàn thành",
    className: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
  CANCELLED: {
    label: "Đã hủy",
    className: "bg-red-50 text-red-600 border border-red-200",
  },
  NO_SHOW: {
    label: "Khách vắng mặt",
    className: "bg-slate-100 text-slate-700 border border-slate-300",
  },
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [stats, setStats] = useState({
    totalBooking: 0,
    bookingProcessing: 0,
    bookingDone: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getBookingList();
      const list = Array.isArray(response.data) ? response.data : [];
      setBookings(list);
      setStats({
        totalBooking: response.totalBooking ?? list.length,
        bookingProcessing: response.bookingProcessing ?? 0,
        bookingDone: response.bookingDone ?? 0,
        revenue: response.revenue ?? 0,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Không thể kết nối đến Backend để tải danh sách đơn."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  // Lọc theo tìm kiếm và trạng thái
  const filteredBookings = useMemo(() => {
    return bookings.filter((item) => {
      const matchSearch =
        `${item.bookingCode || ""} ${item.customerName || ""} ${item.customerPhone || ""} ${item.routeName || ""}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "ALL" || item.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [bookings, search, statusFilter]);

  // Tính toán biểu đồ doanh thu thực tế 7 ngày gần nhất trong useEffect để tránh lỗi SSR
  const [chartData, setChartData] = useState<{ key: string; day: string; revenue: number }[]>([]);

  useEffect(() => {
    const days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const label = d.toLocaleDateString("vi-VN", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
      });
      return { key, day: label, revenue: 0 };
    });

    bookings.forEach((item) => {
      if (item.status === "COMPLETED" && item.departureTime) {
        const itemDateStr = new Date(item.departureTime)
          .toISOString()
          .slice(0, 10);
        const found = days.find((d) => d.key === itemDateStr);
        if (found) {
          found.revenue += Number(item.totalFare || 0);
        }
      }
    });

    setChartData(days);
  }, [bookings]);

  const statCards = [
    {
      title: "Tổng đơn đặt xe",
      value: stats.totalBooking.toLocaleString("vi-VN"),
      sub: "Toàn bộ cuốc trên hệ thống",
      icon: CalendarCheck,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Đơn đang xử lý",
      value: stats.bookingProcessing.toLocaleString("vi-VN"),
      sub: "Cần theo dõi & điều phối",
      icon: Clock3,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Đơn hoàn thành",
      value: stats.bookingDone.toLocaleString("vi-VN"),
      sub: "Đã hoàn thành chuyến đi",
      icon: CircleCheck,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Doanh thu hoàn tất",
      value: money(stats.revenue),
      sub: "Tổng cước các đơn đã xong",
      icon: Wallet,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <AdminShell>
      <div className="space-y-7">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-orange-600">
              GOMOVE MANAGEMENT
            </p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              Danh sách đơn đặt xe
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Dữ liệu đơn hàng thực tế kết nối từ Backend
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => void fetchData()}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Làm mới
            </button>

            <Link
              href="/admin/bookings/create"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
            >
              <Plus size={18} />
              Đặt hộ xe
            </Link>
          </div>
        </div>

        {/* Thông báo lỗi nếu có */}
        {error && (
          <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            <span>{error}</span>
            <button
              onClick={() => void fetchData()}
              className="font-bold underline hover:text-red-700"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Thẻ thống kê */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className={`rounded-xl p-3 ${item.color}`}>
                    <Icon size={23} />
                  </div>
                  <ArrowUpRight size={18} className="text-slate-300" />
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  {item.title}
                </p>

                <div className="mt-2 flex flex-wrap items-end gap-3">
                  <h2 className="text-3xl font-extrabold text-slate-900">
                    {loading ? "..." : item.value}
                  </h2>
                </div>

                <p className="mt-3 text-xs font-medium text-slate-400">
                  {item.sub}
                </p>
              </div>
            );
          })}
        </div>

        {/* Biểu đồ doanh thu & tỷ lệ đơn */}
        <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  Biểu đồ doanh thu 7 ngày qua
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Tính theo các đơn hoàn thành thực tế
                </p>
              </div>

              <span className="rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600">
                Thực tế
              </span>
            </div>

            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#f97316" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    tickFormatter={(value: number) =>
                      value >= 1000000
                        ? `${(value / 1000000).toFixed(1)}tr`
                        : `${value / 1000}k`
                    }
                  />

                  <Tooltip
                    formatter={(value) => [money(Number(value ?? 0)), "Doanh thu"]}
                  />

                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#f97316"
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tỷ lệ trạng thái đơn */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-slate-900">
              Phân bố trạng thái đơn
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Tổng quan tình trạng các chuyến đi
            </p>

            <div className="mt-6 space-y-4">
              {[
                {
                  label: "Đang xử lý / Tìm tài xế",
                  count: stats.bookingProcessing,
                  total: stats.totalBooking,
                  color: "bg-blue-500",
                },
                {
                  label: "Đã hoàn thành",
                  count: stats.bookingDone,
                  total: stats.totalBooking,
                  color: "bg-emerald-500",
                },
                {
                  label: "Đã hủy / Khác",
                  count: Math.max(
                    0,
                    stats.totalBooking -
                      stats.bookingProcessing -
                      stats.bookingDone
                  ),
                  total: stats.totalBooking,
                  color: "bg-red-400",
                },
              ].map((item) => {
                const percent =
                  item.total > 0
                    ? Math.round((item.count / item.total) * 100)
                    : 0;

                return (
                  <div key={item.label}>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-600">
                        {item.label} ({item.count})
                      </span>
                      <span className="font-bold text-slate-900">
                        {percent}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-500`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 rounded-xl bg-slate-50 p-4 text-xs text-slate-600">
              <p className="font-bold text-slate-800">💡 Mẹo điều phối:</p>
              <p className="mt-1">
                Ưu tiên kiểm tra các đơn ở trạng thái <b>FINDING_DRIVER</b> để sớm chỉ định tài xế trước giờ khởi hành.
              </p>
            </div>
          </div>
        </div>

        {/* Bảng danh sách đơn hàng */}
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-6">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">
                Chi tiết các đơn đặt xe ({filteredBookings.length})
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Tìm kiếm, lọc trạng thái và theo dõi chi tiết từng chuyến xe
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Lọc theo trạng thái */}
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs">
                <Filter size={14} className="text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent font-semibold outline-none text-slate-700"
                >
                  <option value="ALL">Tất cả trạng thái</option>
                  <option value="FINDING_DRIVER">Đang tìm tài xế</option>
                  <option value="DRIVER_ASSIGNED">Đã gán tài xế</option>
                  <option value="IN_PROGRESS">Đang di chuyển</option>
                  <option value="COMPLETED">Hoàn thành</option>
                  <option value="CANCELLED">Đã hủy</option>
                  <option value="PENDING_PAYMENT">Chờ thanh toán</option>
                </select>
              </div>

              {/* Tìm kiếm */}
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs">
                <Search size={15} className="text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Mã đơn, tên khách, SĐT..."
                  className="w-44 bg-transparent outline-none sm:w-56"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4">Mã đơn</th>
                  <th className="px-6 py-4">Khách hàng</th>
                  <th className="px-6 py-4">Tuyến đường</th>
                  <th className="px-6 py-4">Khởi hành</th>
                  <th className="px-6 py-4">Tổng tiền</th>
                  <th className="px-6 py-4">Trạng thái</th>
                  <th className="px-6 py-4 text-right">Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                      <div className="flex items-center justify-center gap-2">
                        <RefreshCw size={18} className="animate-spin text-orange-500" />
                        <span>Đang tải dữ liệu đơn đặt xe từ Backend...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredBookings.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      <CarFront size={36} className="mx-auto mb-2 text-slate-300" />
                      <p className="font-bold text-slate-700">Chưa có đơn đặt xe nào phù hợp</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {bookings.length === 0
                          ? "Hệ thống chưa có đơn đặt xe nào trong database."
                          : "Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc trạng thái."}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => {
                    const status = statusConfig[booking.status] || {
                      label: booking.status || "Chưa xác định",
                      className: "bg-slate-100 text-slate-700 border border-slate-200",
                    };

                    return (
                      <tr
                        key={booking.id}
                        className="border-t border-slate-100 transition hover:bg-slate-50/80"
                      >
                        <td className="px-6 py-4 font-bold text-slate-900">
                          {booking.bookingCode}
                        </td>

                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-800">
                            {booking.customerName || "Khách vãng lai"}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-400">
                            {booking.customerPhone || "---"}
                          </p>
                        </td>

                        <td className="px-6 py-4 font-medium text-slate-600">
                          {booking.routeName || "---"}
                        </td>

                        <td className="px-6 py-4 text-xs font-medium text-slate-600">
                          {formatDateTime(booking.departureTime)}
                        </td>

                        <td className="px-6 py-4 font-extrabold text-orange-600">
                          {money(booking.totalFare || 0)}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${status.className}`}
                          >
                            {status.label}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/admin/bookings/${booking.id}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline"
                          >
                            Chi tiết →
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
