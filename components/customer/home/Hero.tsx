
export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-slate-900 bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(90deg,rgba(0,0,0,.82),rgba(0,0,0,.3)),url('/images/banners/hero.jpg')",
      }}
    >
      <div className="mx-auto grid min-h-[430px] max-w-6xl items-center gap-8 px-5 py-14 md:grid-cols-2">
        <div>
          <span className="rounded-full bg-amber-400 px-4 py-2 text-[11px] font-extrabold text-black">
            🚕 XE GHÉP GOMOVE
          </span>

          <h1 className="mt-5 text-3xl font-black uppercase leading-tight md:text-5xl">
            DỊCH VỤ XE TIỆN CHUYẾN
            <span className="block text-yellow-400">
              GIÁ RẺ TIẾT KIỆM
            </span>
          </h1>

          <p className="mt-5 text-xs font-bold uppercase tracking-wide md:text-sm">
            THUÊ XE RIÊNG 4 - 7 - 9 - 16 CHỖ
          </p>

          <p className="mt-2 text-sm font-bold text-yellow-400">
            ĐƯA ĐÓN TẬN NHÀ - GIÁ RẺ
          </p>

          <a
            href="tel:0866685999"
            className="mt-6 inline-block rounded-full bg-orange-500 px-6 py-3 text-sm font-extrabold shadow-lg hover:bg-orange-600"
          >
            ☎ GỌI VÀ XE LIỀN: 086 668 5999
          </a>

          <div className="mt-6 flex flex-wrap gap-2">
            {["Hải Phòng", "Hà Nội", "Quảng Ninh"].map((place, index) => (
              <a
                href="#dich-vu"
                key={place}
                className={`rounded-full px-4 py-2 text-xs font-bold ${
                  index === 1 ? "bg-orange-500" : "bg-sky-500"
                }`}
              >
                🚙 Xe Đi {place}
              </a>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border-4 border-white/20 shadow-2xl">
          <img
            src="/images/banners/hero-car.jpg"
            alt="Dịch vụ đưa đón xe GoMove"
            className="h-60 w-full object-cover md:h-72"
          />
        </div>
      </div>
    </section>
  );
}
