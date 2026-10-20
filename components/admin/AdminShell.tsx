
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const menus = [
  { label: "Tổng quan", href: "/admin" },
  { label: "Danh sách đơn", href: "/admin/bookings" },
  { label: "Đặt hộ xe", href: "/admin/bookings/create" },
];

export default function AdminShell({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      {/* Sidebar */}
      <aside className="w-full bg-slate-950 text-white lg:min-h-screen lg:w-64 lg:shrink-0">
        <div className="border-b border-slate-800 px-6 py-5">
          <Link href="/admin" className="text-2xl font-black">
            <span className="text-orange-500">GO</span>MOVE
          </Link>
          <p className="mt-2 text-sm text-slate-400">
            Admin Dashboard
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 p-4">
          {menus.map((menu) => {
            const active =
              menu.href === "/admin"
                ? pathname === "/admin"
                : menu.href === "/admin/bookings"
                  ? pathname === "/admin/bookings" ||
                    (pathname.startsWith("/admin/bookings/") &&
                      pathname !== "/admin/bookings/create")
                  : pathname === menu.href;

            return (
              <Link
                key={menu.href}
                href={menu.href}
                className={`block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-orange-500 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {menu.label}
              </Link>
            );
          })}
        </nav>

        {/* Quay về Customer */}
        <div className="p-4">
          <Link
            href="/"
            className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-800"
          >
            ← Về trang chủ
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="min-w-0 flex-1">
        <header className="border-b bg-white px-6 py-4">
          <h1 className="text-xl font-extrabold text-slate-900">
            Quản trị GoMove
          </h1>
          <p className="text-sm text-slate-500">
            Quản lý đơn đặt xe và thao tác nhanh
          </p>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
