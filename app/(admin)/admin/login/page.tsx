"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/lib/admin-api";

export default function AdminLoginPage() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-500 focus:bg-white";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!phoneNumber.trim()) {
      setError("Vui lòng nhập số điện thoại.");
      return;
    }

    if (!password.trim()) {
      setError("Vui lòng nhập mật khẩu.");
      return;
    }

    setLoading(true);

    try {
      const response = await adminLogin(phoneNumber.trim(), password);

      router.replace("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
        <div
          className="hidden bg-slate-950 p-10 text-white md:block"
          style={{
            backgroundImage:
              "linear-gradient(rgba(2,6,23,.82), rgba(2,6,23,.82)), url('/images/banners/hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span className="rounded-full bg-orange-500 px-4 py-2 text-xs font-bold">
            ADMIN GOMOVE
          </span>

          <h2 className="mt-10 text-4xl font-black leading-tight">
            Quản lý đơn đặt xe
            <span className="block text-orange-400">nhanh chóng và dễ dàng</span>
          </h2>

          <p className="mt-6 max-w-sm text-sm leading-7 text-slate-200">
            Theo dõi đơn hàng, tạo đơn hộ khách, xem chi tiết và xử lý hủy đơn
            trong một giao diện thống nhất.
          </p>
        </div>

        <div className="p-8 sm:p-10 md:p-12">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
              HỆ THỐNG QUẢN TRỊ
            </span>

            <h1 className="mt-3 text-3xl font-black text-slate-900">
              Đăng nhập admin
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Sử dụng tài khoản quản trị để truy cập hệ thống.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Số điện thoại
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Nhập số điện thoại"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Mật khẩu
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className={inputClass}
                required
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-500 py-4 text-sm font-extrabold text-white transition hover:bg-orange-600 disabled:opacity-60"
            >
              {loading ? "Đang đăng nhập..." : "ĐĂNG NHẬP"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}