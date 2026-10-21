
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import AuthLayout from "@/components/customer/auth/AuthLayout";
import { loginCustomer } from "@/lib/auth-api";

export default function LoginPage() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const phone = phoneNumber.trim();

    // Kiểm tra số điện thoại Việt Nam
    if (!/^(0\d{9}|\+84\d{9})$/.test(phone)) {
      setError("Vui lòng nhập số điện thoại hợp lệ.");
      return;
    }

    // Kiểm tra mật khẩu
    if (!password) {
      setError("Vui lòng nhập mật khẩu.");
      return;
    }

    setLoading(true);

    try {
      // Gọi API đăng nhập Customer
      const response = await loginCustomer({
        phoneNumber: phone,
        password,
      });

      // TODO: Thiết lập phiên đăng nhập an toàn
      // bằng cookie HttpOnly hoặc Next.js BFF.

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Đăng nhập thất bại. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100";

  return (
    <AuthLayout
      title="Đăng nhập"
      description="Chào mừng bạn quay trở lại! Đăng nhập để tiếp tục sử dụng dịch vụ GoMove."
    >
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Số điện thoại */}
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Số điện thoại
          </label>

          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="Nhập số điện thoại"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        {/* Mật khẩu */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Mật khẩu
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputClass} pr-16`}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-orange-600"
            >
              {showPassword ? "Ẩn" : "Hiện"}
            </button>
          </div>
        </div>

        {/* Hiển thị lỗi */}
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600"
          >
            {error}
          </div>
        )}

        {/* Nút đăng nhập */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-orange-500 py-4 text-sm font-extrabold text-white shadow-md transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Đang đăng nhập..." : "ĐĂNG NHẬP"}
        </button>

        {/* Liên kết đăng ký */}
        <div className="text-center text-sm text-slate-600">
          Chưa có tài khoản?{" "}
          <Link
            href="/register"
            className="font-bold text-orange-600 hover:underline"
          >
            Đăng ký ngay
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
