"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { getBookingList } from "@/lib/admin-api";
import type { BookingItem } from "@/types/admin";

function formatMoney(value: number) {
  return value.toLocaleString("vi-VN") + "đ";
}

export default function AdminDashboardPage() {
  const [items, setItems] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getBookingList({ page: 1 });
      setItems(result.data?.items || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không tải được dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const totalRevenue = items.reduce((sum, item) => sum + (item.totalFare || 0), 0);
  const pendingCount = items.filter((i) => i.status === "PENDING").length;
  const completedCount = items.filter((i) => i.status === "COMPLETED").length;

  return (
    <AdminShell>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Tổng quan hệ thống</h2>
          <p className="mt-1 text-sm text-slate-500">
            Thống kê nhanh các đơn đặt xe gần đây
          </p>
        </div>

        <Link
          href="/admin/bookings/create"
          className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600"
        >
          + Tạo đơn mới
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Số đơn vừa tải</p>
          <h3 className="mt-3 text-3xl font-black text-slate-900">
            {loading ? "..." : items.length}
          </h3>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Đơn chờ xử lý</p>
          <h3 className="mt-3 text-3xl font-black text-orange-600">
            {loading ? "..." : pendingCount}
          </h3>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Tổng doanh thu</p>
          <h3 className="mt-3 text-3xl font-black text-emerald-600">
            {loading ? "..." : formatMoney(totalRevenue)}
          </h3>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900">Đơn gần đây</h3>
            <p className="text-sm text-slate-500">Hiển thị từ API danh sách đơn</p>
          </div>

          <Link
            href="/admin/bookings"
            className="text-sm font-bold text-orange-600 hover:underline"
          >
            Xem tất cả
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-bold">Mã đơn</th>
                <th className="px-4 py-3 font-bold">Khách hàng</th>
                <th className="px-4 py-3 font-bold">SĐT</th>
                <th className="px-4 py-3 font-bold">Tuyến</th>
                <th className="px-4 py-3 font-bold">Ghế</th>
                <th className="px-4 py-3 font-bold">Tổng tiền</th>
                <th className="px-4 py-3 font-bold">Trạng thái</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                items.slice(0, 5).map((item) => (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-semibold">{item.bookingCode}</td>
                    <td className="px-4 py-3">{item.passengerName}</td>
                    <td className="px-4 py-3">{item.passengerPhone}</td>
                    <td className="px-4 py-3">{item.routeName || "-"}</td>
                    <td className="px-4 py-3">{item.seatCount}</td>
                    <td className="px-4 py-3 font-bold text-orange-600">
                      {formatMoney(item.totalFare)}
                    </td>
                    <td className="px-4 py-3">{item.status || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}