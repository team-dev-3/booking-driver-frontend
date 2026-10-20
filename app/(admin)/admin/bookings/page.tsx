
"use client";

import Link from "next/link";
import {
  CarFront,
  CalendarCheck,
  CircleCheck,
  Clock3,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  RefreshCw,
  Search,
  Plus,
  Wallet,
  XCircle,
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

import { useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import {
  dashboardBookings,
  revenueData,
} from "@/data/admin-dashboard";

const money = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + "đ";

const statusConfig = {
  PENDING: {
    label: "Chờ xác nhận",
    className: "bg-amber-50 text-amber-700",
  },
  CONFIRMED: {
    label: "Đã xác nhận",
    className: "bg-blue-50 text-blue-700",
  },
  COMPLETED: {
    label: "Hoàn thành",
    className: "bg-emerald-50 text-emerald-700",
  },
  CANCELLED: {
    label: "Đã hủy",
    className: "bg-red-50 text-red-600",
  },
};

export default function AdminDashboardPage() {
  const [search, setSearch] = useState("");

  const filteredBookings = dashboardBookings.filter((booking) =>
    `${booking.bookingCode} ${booking.customer} ${booking.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const stats = [
    {
      title: "Tổng đơn đặt xe",
      value: "1.248",
      change: "+12,5%",
      icon: CalendarCheck,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Đơn chờ xử lý",
      value: "38",
      change: "Cần xử lý",
      icon: Clock3,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Đơn hoàn thành",
      value: "1.086",
      change: "+8,2%",
      icon: CircleCheck,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Doanh thu",
      value: "186,5 triệu",
      change: "+18,4%",
      icon: Wallet,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <AdminShell>
      <div className="space-y-7">
        {/* Heading */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-orange-600">
              GOMOVE MANAGEMENT
            </p>

            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              Tổng quan hệ thống
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Theo dõi hoạt động và quản lý các đơn đặt xe.
            </p>
          </div>

          <Link
            href="/admin/bookings/create"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
          >
            <Plus size={18} />
            Tạo đơn mới
          </Link>
        </div>

        {/* Thông báo demo */}
        <div className="rounded-xl border border-sky-100 bg-sky-50 px-5 py-3 text-sm text-sky-700">
          Chế độ xem trước: Số liệu đang sử dụng dữ liệu mẫu,
          chưa kết nối Backend.
        </div>

        {/* Statistic cards */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
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
                    {item.value}
                  </h2>
                </div>

                <p className="mt-3 text-xs font-semibold text-emerald-600">
                  {item.change}
                  <span className="ml-2 font-normal text-slate-400">
                    (Dữ liệu mẫu)
                  </span>
                </p>
              </div>
            );
          })}
        </div>

        {/* Chart + information */}
        <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  Biểu đồ doanh thu
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Doanh thu 7 ngày trong tuần (minh họa)
                </p>
              </div>

              <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
                7 ngày
              </span>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#f97316"
                        stopOpacity={0.25}
                      />
                      <stop
                        offset="100%"
                        stopColor="#f97316"
                        stopOpacity={0}
                      />
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
                      `${value / 1000000}tr`
                    }
                  />

                  <Tooltip
                    formatter={(value) =>
                      money(Number(value ?? 0))
                    }
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

          {/* Quick summary */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-slate-900">
              Hoạt động đặt xe
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Thống kê theo dữ liệu minh họa
            </p>

            <div className="mt-8 space-y-6">
              {[
                {
                  title: "Đơn đã xác nhận",
                  count: 72,
                  color: "bg-blue-500",
                },
                {
                  title: "Đơn hoàn thành",
                  count: 86,
                  color: "bg-emerald-500",
                },
                {
                  title: "Đơn chờ xử lý",
                  count: 28,
                  color: "bg-amber-500",
                },
                {
                  title: "Đơn đã hủy",
                  count: 12,
                  color: "bg-red-500",
                },
              ].map((item) => (
                <div key={item.title}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-600">
                      {item.title}
                    </span>
                    <span className="font-bold text-slate-900">
                      {item.count}%
                    </span>
                  </div>

                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.count}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/admin/bookings"
              className="mt-9 flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Quản lý đơn đặt xe
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Booking table */}
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-6">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">
                Đơn đặt xe gần đây
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Danh sách booking minh họa
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2">
                <Search size={16} className="text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm mã đơn, khách hàng..."
                  className="w-40 bg-transparent text-xs outline-none sm:w-52"
                />
              </div>

              <Link
                href="/admin/bookings"
                className="rounded-xl bg-orange-50 px-4 py-2.5 text-xs font-bold text-orange-600 hover:bg-orange-100"
              >
                Xem tất cả
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4">Mã đơn</th>
                  <th className="px-6 py-4">Khách hàng</th>
                  <th className="px-6 py-4">Tuyến đường</th>
                  <th className="px-6 py-4">Khởi hành</th>
                  <th className="px-6 py-4">Tổng tiền</th>
                  <th className="px-6 py-4">Trạng thái</th>
                  <th className="px-6 py-4">Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => {
                  const status = statusConfig[booking.status];

                  return (
                    <tr
                      key={booking.id}
                      className="border-t border-slate-100 transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 font-bold text-slate-900">
                        {booking.bookingCode}
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-800">
                          {booking.customer}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {booking.phone}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {booking.route}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {booking.departureTime}
                      </td>

                      <td className="px-6 py-4 font-bold text-orange-600">
                        {money(booking.amount)}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-bold ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/bookings/${booking.id}`}
                          className="text-xs font-bold text-sky-600 hover:underline"
                        >
                          Chi tiết →
                        </Link>
                      </td>
                    </tr>
                  );
                })}

                {filteredBookings.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-10 text-center text-slate-500"
                    >
                      Không tìm thấy đơn phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Danh sách đơn",
              description: "Xem và quản lý tất cả đơn đặt xe",
              href: "/admin/bookings",
              icon: CarFront,
            },
            {
              title: "Đặt xe hộ khách",
              description: "Tạo đơn đặt xe mới cho khách hàng",
              href: "/admin/bookings/create",
              icon: Plus,
            },
            {
              title: "Xử lý đơn hủy",
              description: "Kiểm tra và xử lý đơn cần hỗ trợ",
              href: "/admin/bookings",
              icon: XCircle,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-orange-200 hover:shadow-md"
              >
                <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                  <Icon size={22} />
                </div>

                <div className="flex-1">
                  <p className="font-bold text-slate-900">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.description}
                  </p>
                </div>

                <ArrowUpRight size={18} className="text-slate-400" />
              </Link>
            );
          })}
        </div>
      </div>
    </AdminShell>
  );
}
