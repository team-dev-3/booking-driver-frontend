
"use client";

import { useEffect, useState, type FormEvent } from "react";

type Booking = {
  service: "ghep" | "rieng";
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: string;
  name: string;
  phone: string;
};

const initialBooking: Booking = {
  service: "ghep",
  pickup: "",
  destination: "",
  date: "",
  time: "08:00",
  passengers: "1",
  name: "",
  phone: "",
};

export default function BookingForm() {
  const [booking, setBooking] = useState(initialBooking);
  const [message, setMessage] = useState("");

  
const [today, setToday] = useState("");

useEffect(() => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  setToday(`${year}-${month}-${day}`);
}, []);


  useEffect(() => {
    const handleSelectCar = (event: Event) => {
      const selected = (event as CustomEvent<{ route: string }>).detail;

      if (!selected?.route) return;

      const parts = selected.route.split(" - ");

      setBooking((current) => ({
        ...current,
        pickup: parts.length === 2 ? parts[0] : current.pickup,
        destination: parts.length === 2 ? parts[1] : current.destination,
      }));
    };

    window.addEventListener("gomove:select-car", handleSelectCar);

    return () => {
      window.removeEventListener("gomove:select-car", handleSelectCar);
    };
  }, []);

  const update = (field: keyof Booking, value: string) => {
    setBooking((current) => ({ ...current, [field]: value }));
    setMessage("");
  };

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const phone = booking.phone.replace(/\s/g, "");

    if (!/^(0|\+84)\d{9}$/.test(phone)) {
      setMessage("Vui lòng nhập số điện thoại Việt Nam hợp lệ.");
      return;
    }

    if (new Date(`${booking.date}T${booking.time}`).getTime() < Date.now()) {
      setMessage("Vui lòng chọn thời gian khởi hành trong tương lai.");
      return;
    }

    setMessage(
      `Đã kiểm tra thông tin đặt xe cho ${booking.name}: ` +
      `${booking.pickup} → ${booking.destination}, ngày ${booking.date}. ` +
      "Đây là bản demo, yêu cầu chưa được gửi đến nhà xe."
    );
  };

  const inputClass =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-orange-500";

  return (
    <section id="dat-xe" className="scroll-mt-28 bg-slate-50 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-xl font-black uppercase text-slate-900 md:text-2xl">
          ĐẶT XE NHANH <span className="text-orange-600">THEO LỊCH TRÌNH</span>
        </h2>

        <div className="grid items-center gap-8 overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-lg md:grid-cols-[390px_1fr] md:p-8">
          <form
            onSubmit={submitBooking}
            className="rounded-xl bg-[#242424] p-5 text-white shadow-xl"
          >
            <div className="mb-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => update("service", "ghep")}
                className={`rounded py-3 text-xs font-extrabold ${
                  booking.service === "ghep"
                    ? "bg-orange-500"
                    : "bg-gray-600"
                }`}
              >
                🚕 Xe ghép
              </button>

              <button
                type="button"
                onClick={() => update("service", "rieng")}
                className={`rounded py-3 text-xs font-extrabold ${
                  booking.service === "rieng"
                    ? "bg-orange-500"
                    : "bg-gray-600"
                }`}
              >
                🚘 Xe riêng
              </button>
            </div>

            <div className="mb-4 flex gap-4 text-xs">
              <span>🟠 1 chiều</span>
              <span>📍 Đưa đón tận nơi</span>
            </div>

            <div className="space-y-3">
              <input
                className={inputClass}
                placeholder="Điểm đón (VD: Hải Phòng)"
                value={booking.pickup}
                onChange={(e) => update("pickup", e.target.value)}
                required
              />

              <input
                className={inputClass}
                placeholder="Điểm đến (VD: Hà Nội)"
                value={booking.destination}
                onChange={(e) => update("destination", e.target.value)}
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  className={inputClass}
                  aria-label="Ngày đi"
                  min={new Date().toLocaleDateString("en-CA")}
                  value={booking.date}
                  onChange={(e) => update("date", e.target.value)}
                  required
                />

                <input
                  type="time"
                  className={inputClass}
                  aria-label="Giờ đi"
                  value={booking.time}
                  onChange={(e) => update("time", e.target.value)}
                  required
                />
              </div>

              <select
                className={inputClass}
                aria-label="Số hành khách"
                value={booking.passengers}
                onChange={(e) => update("passengers", e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((number) => (
                  <option key={number} value={number}>
                    {number} hành khách
                  </option>
                ))}
              </select>

              <input
                className={inputClass}
                placeholder="Họ và tên"
                value={booking.name}
                onChange={(e) => update("name", e.target.value)}
                required
              />

              <input
                type="tel"
                className={inputClass}
                placeholder="Số điện thoại"
                value={booking.phone}
                onChange={(e) => update("phone", e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="mt-5 w-full rounded-md bg-orange-500 py-3 text-sm font-extrabold hover:bg-orange-600"
            >
              ĐẶT XE NGAY
            </button>

            {message && (
              <div role="status" className="mt-4 rounded-md bg-white p-3 text-xs leading-6 text-slate-900">
                {message}
              </div>
            )}
          </form>

          <div className="flex flex-col items-center justify-center">
            <img
              src="/images/banners/booking-car.png"
              alt="Xe dịch vụ GoMove"
              className="max-h-96 w-full object-contain"
            />

            <div className="mt-5 flex flex-wrap justify-center gap-6 text-xs font-bold text-gray-600">
              <span>🟢 Đưa đón tận nơi</span>
              <span>🟠 Phục vụ 24/7</span>
              <span>🔵 Đặt xe nhanh chóng</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
