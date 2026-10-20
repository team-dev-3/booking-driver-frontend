import Link from "next/link";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  description,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link
            href="/"
            className="rounded-lg bg-slate-950 px-5 py-3 text-xl font-black text-white"
          >
            <span className="text-orange-500">GO</span>MOVE
          </Link>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-82px)] items-center justify-center px-4 py-12">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
          {/* Cột giới thiệu */}
          <div className="relative hidden min-h-[570px] overflow-hidden bg-slate-950 p-10 text-white md:flex md:flex-col md:justify-between">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25"
              style={{
                backgroundImage: "url('/images/banners/hero.jpg')",
              }}
            />

            <div className="relative z-10">
              <span className="rounded-full bg-orange-500 px-4 py-2 text-xs font-bold">
                XE GHÉP GOMOVE
              </span>

              <h2 className="mt-12 text-4xl font-black leading-tight">
                Hành trình
                <span className="block text-orange-400">thuận tiện hơn</span>
                cùng GoMove
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-slate-200">
                Đặt xe ghép, xe tiện chuyến và xe riêng nhanh chóng trên các
                tuyến Hà Nội, Hải Phòng và Quảng Ninh.
              </p>
            </div>

            <div className="relative z-10">
              <div className="grid gap-4 text-sm">
                <div>✓ Đặt xe nhanh chóng, dễ dàng</div>
                <div>✓ Đưa đón tận nơi, lịch trình linh hoạt</div>
                <div>✓ Hỗ trợ khách hàng 24/7</div>
              </div>

              <Link
                href="/"
                className="group mt-8 inline-flex items-center gap-3 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-orange-400 hover:bg-orange-500"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>
                Về trang chủ
              </Link>
            </div>
          </div>

          {/* Cột form */}
          <div className="flex flex-col justify-center px-6 py-12 sm:px-10 md:px-12">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
                TÀI KHOẢN KHÁCH HÀNG
              </span>

              <h1 className="mt-3 text-3xl font-extrabold text-slate-900">
                {title}
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {description}
              </p>
            </div>

            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
