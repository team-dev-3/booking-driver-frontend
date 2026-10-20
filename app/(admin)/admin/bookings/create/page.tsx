"use client";

import { useState, type FormEvent } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { createBooking } from "@/lib/admin-api";

export default function AdminCreateBookingPage() {
  const [fixedScheduleId, setFixedScheduleId] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [seatCount, setSeatCount] = useState("1");
  const [serviceType, setServiceType] = useState("SHARED");
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [isHighway, setIsHighway] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [customerNote, setCustomerNote] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inputClass =
    "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-500";

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!fixedScheduleId) {
      setError("Vui lòng nhập fixedScheduleId.");
      return;
    }

    setLoading(true);

    try {
      const response = await createBooking({
        fixedScheduleId: Number(fixedScheduleId),
        passengerName,
        passengerPhone,
        seatCount: Number(seatCount),
        serviceType,
        pickupAddress,
        dropoffAddress,
        isHighway,
        paymentMethod,
        customerNote,
      });

      setSuccess(
        `${response.message} - Mã đơn: ${response.data?.bookingCode || ""}`
      );

      setFixedScheduleId("");
      setPassengerName("");
      setPassengerPhone("");
      setSeatCount("1");
      setServiceType("SHARED");
      setPickupAddress("");
      setDropoffAddress("");
      setIsHighway(false);
      setPaymentMethod("CASH");
      setCustomerNote("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tạo booking thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminShell>
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900">Admin đặt hộ xe</h2>
        <p className="mt-1 text-sm text-slate-500">
          Tạo booking mới cho khách hàng
        </p>

        <form onSubmit={submit} className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold">fixedScheduleId</label>
            <input
              value={fixedScheduleId}
              onChange={(e) => setFixedScheduleId(e.target.value)}
              className={inputClass}
              placeholder="Ví dụ: 1"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Tên khách hàng</label>
            <input
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              className={inputClass}
              placeholder="Nguyễn Văn A"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Số điện thoại</label>
            <input
              value={passengerPhone}
              onChange={(e) => setPassengerPhone(e.target.value)}
              className={inputClass}
              placeholder="0912345678"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Số ghế</label>
            <input
              type="number"
              min={1}
              value={seatCount}
              onChange={(e) => setSeatCount(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Loại dịch vụ</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className={inputClass}
            >
              <option value="SHARED">SHARED</option>
              <option value="PRIVATE">PRIVATE</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Phương thức thanh toán</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className={inputClass}
            >
              <option value="CASH">CASH</option>
              <option value="BANK_TRANSFER">BANK_TRANSFER</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Điểm đón</label>
            <input
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              className={inputClass}
              placeholder="Địa chỉ đón"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Điểm trả</label>
            <input
              value={dropoffAddress}
              onChange={(e) => setDropoffAddress(e.target.value)}
              className={inputClass}
              placeholder="Địa chỉ trả"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold">Ghi chú</label>
            <textarea
              rows={4}
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              className={inputClass}
              placeholder="Ghi chú cho chuyến đi..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-3 text-sm font-semibold">
              <input
                type="checkbox"
                checked={isHighway}
                onChange={(e) => setIsHighway(e.target.checked)}
              />
              Đi đường cao tốc
            </label>
          </div>

          {error && (
            <div className="md:col-span-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="md:col-span-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              {success}
            </div>
          )}

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-extrabold text-white hover:bg-orange-600 disabled:opacity-60"
            >
              {loading ? "Đang tạo booking..." : "TẠO BOOKING"}
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}