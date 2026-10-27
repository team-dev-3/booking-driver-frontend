import Brand from "@/components/common/Brand/Brand";
import Icon from "@/components/common/Icon/Icon";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import LoginDialog from "@/components/common/LoginDialog/LoginDialog";
import QuickSearch from "@/components/common/QuickSearch/QuickSearch";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { pathname, hash } = useLocation();
  const items = [
    { label: "TRANG CHỦ", href: "/", active: pathname === "/" && !hash },
    { label: "BẢNG GIÁ", href: "/bang-gia", active: pathname.startsWith("/bang-gia") },
    { label: "DỊCH VỤ", href: "/dich-vu", active: pathname.startsWith("/dich-vu") },
    { label: "TIN TỨC", href: "/tin-tuc", active: pathname === "/tin-tuc" || pathname.startsWith("/bai-viet/") },
    { label: "GIỚI THIỆU", href: "/gioi-thieu", active: pathname === "/gioi-thieu" },
    { label: "LIÊN HỆ", href: "/lien-he", active: pathname === "/lien-he" },
  ];
  const [loginOpen, setLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {" "}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-xs backdrop-blur-md bg-white/95">
        <div className="border-b border-slate-200/70 bg-white py-3.5">
          <div className="mx-auto px-4 sm:px-6 max-w-6xl flex items-center justify-between gap-2">
            <Brand />
            <div className="hidden md:flex items-center gap-8 lg:gap-14">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 flex items-center justify-center text-amber-500 text-3xl shrink-0">
                  <Icon
                    name="fa-phone"
                    className="stitch-icon transform -rotate-12"
                  />
                </div>
                <div className="leading-tight">
                  <div className="text-xs text-slate-600 font-medium">
                    {"Gọi đặt xe:"}
                  </div>
                  <a
                    className="text-sky-600 hover:text-sky-700 font-extrabold text-base lg:text-lg tracking-tight transition block mt-0.5"
                    href="tel:0816665599"
                  >
                    {" 081 666 5599 "}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 flex items-center justify-center text-amber-500 text-3xl shrink-0">
                  <Icon name="fa-map-marked-alt" className="stitch-icon " />
                </div>
                <div className="leading-tight">
                  <div className="text-xs text-slate-600 font-medium">
                    {"Địa chỉ:"}
                  </div>
                  <div className="text-slate-900 font-extrabold text-xs lg:text-sm uppercase tracking-tight mt-0.5">
                    {" QUẢNG NINH – HẢI PHÒNG – HÀ NỘI "}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center shrink-0">
              <div className="flex items-center gap-3">
                <button
                  className="border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 px-4 py-2.5 rounded font-bold text-xs sm:text-sm tracking-wide inline-flex items-center gap-2 shadow-xs transition cursor-pointer"
                  type="button"
                  onClick={() => setLoginOpen(true)}
                  aria-label="Đăng nhập"
                >
                  <Icon
                    name="fa-user"
                    className="stitch-icon text-amber-500 text-sm"
                  />
                  <span className="hidden sm:inline">{"Đăng nhập"}</span>
                </button>
                <a
                  className="bg-[#2a2a2a] hover:bg-black text-white px-5 sm:px-7 py-3 rounded font-extrabold text-xs sm:text-sm tracking-wider uppercase inline-flex items-center gap-2 shadow-md transition"
                  href="/#booking-form"
                >
                  <Icon
                    name="fa-car"
                    className="stitch-icon text-sm sm:text-base"
                  />
                  <span className="">{"ĐẶT XE"}</span>
                </a>
                <button
                  type="button"
                  className="md:hidden min-w-11 min-h-11 rounded border border-slate-200"
                  aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
                  aria-expanded={menuOpen}
                  aria-controls="site-navigation"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {"☰"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`bg-white py-2.5 stitch-navigation ${menuOpen ? "is-open" : ""}`}
          id="site-navigation"
        >
          <div className={`mx-auto px-4 sm:px-6 max-w-6xl ${styles.menuRow}`}>
            <nav className={`flex-1 ${styles.navigation}`} aria-label="Điều hướng chính">
              <ul className={styles.menuList}>
                {items.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} aria-current={item.active ? (item.href.includes("#") ? "location" : "page") : undefined} onClick={() => setMenuOpen(false)}>
                      {item.label}
                      {(item.href === "/bang-gia" || item.href === "/dich-vu") && <Icon name="fa-chevron-down" className="stitch-icon" size={10} />}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className={`stitch-quick-search ${styles.quickSearch}`}>
              <QuickSearch></QuickSearch>
            </div>
          </div>
        </div>
      </header>{" "}
      {loginOpen && <LoginDialog onClose={() => setLoginOpen(false)} />}{" "}
    </>
  );
}
