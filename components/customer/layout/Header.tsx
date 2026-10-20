"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { name: "TRANG CHỦ", href: "/" },
  { name: "GIỚI THIỆU", href: "/#gioi-thieu" },
  { name: "DỊCH VỤ", href: "/#dich-vu" },
  { name: "TIN TỨC", href: "/#tin-tuc" },
  { name: "ĐẶT XE", href: "/#dat-xe" },
  { name: "LIÊN HỆ", href: "/#lien-he" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="rounded bg-slate-950 px-3 py-2 text-lg font-black text-white"
        >
          <span className="text-orange-400">GO</span>MOVE
        </Link>

        <div className="hidden items-center gap-3 sm:flex">
          <span className="text-2xl text-orange-500">☎</span>
          <div>
            <p className="text-[10px] text-gray-500">GỌI ĐẶT XE</p>
            <a
              href="tel:0866685999"
              className="text-sm font-extrabold text-sky-600"
            >
              086 668 5999
            </a>
          </div>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <span className="text-xl">📍</span>
          <div>
            <p className="text-[10px] text-gray-500">ĐỊA CHỈ</p>
            <p className="text-xs font-bold">QUẢNG NINH - HẢI PHÒNG - HÀ NỘI</p>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {/* Đăng nhập */}
          <Link
            href="/login"
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-900 transition hover:border-orange-500 hover:text-orange-600"
          >
            Đăng nhập
          </Link>

          {/* Đăng ký */}
          <Link
            href="/register"
            className="rounded-lg bg-orange-500 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-orange-600"
          >
            Đăng ký
          </Link>

          {/* Đặt xe */}
          <Link
            href="/#dat-xe"
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
          >
            🚕 ĐẶT XE
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Chuyển đổi menu"
          aria-expanded={open}
          className="rounded border px-3 py-2 md:hidden"
        >
          ☰
        </button>
      </div>

      <nav
        className={`border-t border-gray-100 ${open ? "block" : "hidden"} md:block`}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-4 py-3 md:flex-row md:items-center md:justify-center md:gap-7">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-xs font-extrabold text-slate-700 hover:text-orange-500"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
