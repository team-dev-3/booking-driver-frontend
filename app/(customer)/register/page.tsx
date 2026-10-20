
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import AuthLayout from "@/components/customer/auth/AuthLayout";
import { registerCustomer } from "@/lib/auth-api";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const name = fullName.trim();
    const phone = phoneNumber.trim();

    // Kiểm tra họ tên
    if (name.length < 2) {
      setError("Vui lòng nhập họ tên hợp lệ.");
      return;
    }

    // Kiểm tra số điện thoại Việt Nam
    if (!/^(0\d{9}|\+84\d{9})$/.test(phone)) {
      setError("Số điện thoại không hợp lệ.");
      return;
    }

    // Kiểm tra mật khẩu
    if (password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }

    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setLoading(true);

    try {
      // Gửi dữ liệu đến Backend
      const response = await registerCustomer({
        fullName: name,
        phoneNumber: phone,
        password,
      });

      setSuccess(response.message || "Đăng ký thành công!");

      // Chuyển đến trang đăng nhập sau khi đăng ký
      router.push("/login");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Đăng ký thất bại. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100";

  return (
    <AuthLayout
      title="Tạo tài khoản"
      description="Đăng ký tài khoản khách hàng để trải nghiệm dịch vụ xe ghép GoMove."
    >
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Họ và tên */}
        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Họ và tên
          </label>

          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Nguyễn Văn A"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        {/* Số điện thoại */}
        <div>
          <label
            htmlFor="registerPhone"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Số điện thoại
          </label>

          <input
            id="registerPhone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0912345678"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        {/* Mật khẩu */}
        <div>
          <label
            htmlFor="registerPassword"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Mật khẩu
          </label>

          <div className="relative">
            <input
              id="registerPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Nhập ít nhất 8 ký tự"
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

        {/* Xác nhận mật khẩu */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Xác nhận mật khẩu
          </label>

          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        {/* Thông báo lỗi */}
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600"
          >
            {error}
          </div>
        )}

        {/* Thông báo thành công */}
        {success && (
          <div
            role="status"
            className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700"
          >
            {success}
          </div>
        )}

        {/* Nút đăng ký */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-orange-500 py-4 text-sm font-extrabold text-white shadow-md transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Đang đăng ký..." : "ĐĂNG KÝ TÀI KHOẢN"}
        </button>

        {/* Chuyển trang đăng nhập */}
        <p className="text-center text-sm text-slate-600">
          Đã có tài khoản?{" "}
          <Link
            href="/login"
            className="font-bold text-orange-600 hover:underline"
          >
            Đăng nhập
          </Link>
        </p>

      </form>
    </AuthLayout>
  );
}
