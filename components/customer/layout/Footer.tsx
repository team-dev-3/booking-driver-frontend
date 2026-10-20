
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="lien-he" className="scroll-mt-28 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-3">
        <div>
          <Link href="/" className="text-xl font-black text-slate-900">
            <span className="text-orange-500">GO</span>MOVE
          </Link>

          <h3 className="mt-3 text-sm font-extrabold">
            XE GHÉP GOMOVE
          </h3>

          <p className="mt-4 text-sm leading-7 text-gray-500">
            Dịch vụ xe ghép, xe tiện chuyến và thuê xe riêng
            tại Hà Nội, Hải Phòng, Quảng Ninh.
          </p>

          <a
            href="tel:0866685999"
            className="mt-5 inline-block font-bold text-orange-600"
          >
            ☎ 086 668 5999
          </a>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase">
            LIÊN KẾT HỮU ÍCH
          </h3>

          <ul className="mt-5 space-y-3 text-sm text-gray-600">
            <li><Link href="/">Trang chủ</Link></li>
            <li><Link href="/#gioi-thieu">Giới thiệu GoMove</Link></li>
            <li><Link href="/#dich-vu">Dịch vụ xe</Link></li>
            <li><Link href="/#tin-tuc">Blog & kinh nghiệm</Link></li>
            <li><Link href="/#dat-xe">Đặt xe trực tuyến</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase">
            LIÊN HỆ GOMOVE
          </h3>

          <div className="mt-5 space-y-3 rounded-xl border bg-slate-50 p-5 text-sm">
            <p>📍 Hà Nội - Hải Phòng - Quảng Ninh</p>
            <p>☎ Hotline: 086 668 5999</p>
            <p>🕒 Tư vấn đặt xe 24/7</p>
            <p className="text-xs text-gray-500">
              Cập nhật địa chỉ và thông tin doanh nghiệp chính thức
              trước khi đưa website vào hoạt động.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-sky-600 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-extrabold">XE GHÉP GOMOVE</h3>
            <p className="mt-2 text-xs text-white/80">
              Đưa đón tận nơi - Tiết kiệm - An toàn - Tiện lợi
            </p>
          </div>

          <a href="tel:0866685999" className="text-lg font-black">
            ☎ 086 668 5999
          </a>
        </div>
      </div>

      
<div className="bg-slate-100 px-4 py-4 text-center text-xs text-gray-500">
  © 2026 GoMove. All rights reserved.
</div>


      <a
        href="tel:0866685999"
        aria-label="Gọi GoMove"
        className="fixed bottom-5 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-xl text-white shadow-lg"
      >
        ☎
      </a>
    </footer>
  );
}
