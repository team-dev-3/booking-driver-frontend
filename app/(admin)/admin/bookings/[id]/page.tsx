"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { cancelBooking, getBookingDetail } from "@/lib/admin-api";
import type { BookingDetail } from "@/types/admin";

export default function AdminBookingDetailPage() {
  const params = useParams();
  const id = String(params.id);

  const [detail, setDetail] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cancelReason, setCancelReason] = useState("");
  const [isDriverFault, setIsDriverFault] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchDetail = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getBookingDetail(id);
      setDetail(response.data || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không tải được chi tiết.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchDetail();
  }, [id]);

  const handleCancel = async () => {
    setMessage("");
    setError("");

    if (!cancelReason.trim()) {
      setError("Vui lòng nhập lý do hủy đơn.");
      return;
    }

    setCancelLoading(true);

    try {
      const response = await cancelBooking(id, {
        cancelReason,
        isDriverFault,
      });

      setMessage(response.message || "Hủy đơn thành công.");
      await fetchDetail();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể hủy đơn.");
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <AdminShell>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              Chi tiết đơn đặt xe
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Kiểm tra thông tin và xử lý đơn
            </p>
          </div>

          <Link
            href="/admin/bookings"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold"
          >
            ← Quay lại danh sách
          </Link>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {message && (
          <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            {message}
          </div>
        )}

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          {loading ? (
            <div className="py-8 text-center text-sm text-slate-500">
              Đang tải dữ liệu...
            </div>
          ) : !detail ? (
            <div className="py-8 text-center text-sm text-slate-500">
              Không tìm thấy đơn đặt xe
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              <Info label="Mã đơn" value={detail.bookingCode} />
              <Info label="Khách hàng" value={detail.passengerName} />
              <Info label="Số điện thoại" value={detail.passengerPhone} />
              <Info label="Tuyến đường" value={detail.routeName || "-"} />
              <Info label="Điểm đón" value={detail.pickupAddress || "-"} />
              <Info label="Điểm trả" value={detail.dropoffAddress || "-"} />
              <Info label="Loại dịch vụ" value={detail.serviceType || "-"} />
              <Info label="Số ghế" value={String(detail.seatCount)} />
              <Info
                label="Tổng tiền"
                value={`${detail.totalFare?.toLocaleString("vi-VN")}đ`}
              />
              <Info label="Trạng thái" value={detail.status || "-"} />
              <Info label="Giờ khởi hành" value={detail.departureTime || "-"} />
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h3 className="text-lg font-black text-slate-900">Hủy đơn</h3>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Lý do hủy
              </label>

              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={5}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-500"
                placeholder="Nhập lý do hủy đơn..."
              />
            </div>

            <div className="flex flex-col justify-between rounded-xl border border-slate-200 p-4">
              <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={isDriverFault}
                  onChange={(e) => setIsDriverFault(e.target.checked)}
                />
                Tài xế là nguyên nhân gây hủy đơn
              </label>

              <button
                type="button"
                onClick={handleCancel}
                disabled={cancelLoading}
                className="mt-6 rounded-xl bg-red-500 px-5 py-3 text-sm font-extrabold text-white hover:bg-red-600 disabled:opacity-60"
              >
                {cancelLoading ? "Đang hủy..." : "HỦY ĐƠN"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}