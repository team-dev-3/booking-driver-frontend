import Icon from "@/components/common/Icon/Icon";

export default function HeroSection() {
  return (
    <>
      <section className="relative overflow-hidden" id="home-hero">
        {/* Nền thiết kế Cầu Hoàng Văn Thụ Hải Phòng về đêm */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Cầu Hoàng Văn Thụ Hải Phòng về đêm"
            className="w-full h-full object-cover"
            src="/images/stitch/asset-02.webp"
            width="1200"
            height="675"
            decoding="async"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-black/60 to-black/50 backdrop-blur-xs" />
        </div>

        <div className="relative z-10 mx-auto px-4 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl">
          {/* Cột trái: Tiêu đề và thông điệp chuẩn theo thiết kế Stitch */}
          <div className="lg:col-span-7 text-white">
            <div>
              <span className="inline-block px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs uppercase font-black rounded-full mb-4 tracking-wider shadow-md transition">
                <Icon
                  name="fa-car-side"
                  className="stitch-icon mr-1.5 text-xs"
                />
                XE GHÉP GOMOVE
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white hero-glow mb-6 flex flex-col gap-3 sm:gap-4 leading-tight drop-shadow-2xl">
                <span className="text-white drop-shadow-md">
                  DỊCH VỤ XE TIỆN CHUYẾN
                </span>
                <span className="text-yellow-400 drop-shadow-md tracking-wide">
                  GIÁ RẺ TIẾT KIỆM
                </span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg font-semibold text-slate-100 mb-8 leading-relaxed tracking-wide drop-shadow-sm">
                THUÊ XE RIÊNG 4 - 7 - 9 - 16 CHỖ •{" "}
                <span className="text-amber-300 font-bold">
                  ĐƯA ĐÓN TẬN NƠI GIÁ RẺ
                </span>
              </p>

              {/* Nút gọi hotline nổi bật */}
              <div className="mb-8">
                <a
                  className="inline-flex items-center gap-3 bg-amber-400 hover:bg-yellow-400 text-slate-950 font-black px-6 py-3.5 rounded-full text-base sm:text-lg shadow-2xl transition leading-normal border-2 border-amber-300 hover:scale-105 duration-300"
                  href="tel:0816665599"
                >
                  <Icon
                    name="fa-phone-volume"
                    className="stitch-icon text-brand-red animate-pulse text-xl"
                  />
                  <span className="tracking-tight">
                    GIÁ VÉ XE LIÊN HỆ: 081 666 5599
                  </span>
                </a>
              </div>

              {/* 3 nút Quick Action tuyến đường */}
              <div className="flex flex-wrap items-center gap-3 select-none">
                <a
                  className="bg-sky-600 hover:bg-sky-700 text-white font-black text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-full inline-flex items-center gap-2 shadow-2xl transition leading-normal border-2 border-sky-400 hover:scale-105 duration-300 whitespace-nowrap shrink-0 min-h-[44px]"
                  href="/#detailed-services"
                >
                  <Icon
                    name="fa-car-side"
                    className="stitch-icon text-yellow-300 text-base sm:text-lg"
                  />
                  <span>Xe Đi Hải Phòng</span>
                </a>
                <a
                  className="bg-[#ea7227] hover:bg-amber-600 text-white font-black text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-full inline-flex items-center gap-2 shadow-2xl transition leading-normal border-2 border-amber-300 hover:scale-105 duration-300 whitespace-nowrap shrink-0 min-h-[44px]"
                  href="/#detailed-services"
                >
                  <Icon
                    name="fa-car-side"
                    className="stitch-icon text-yellow-300 text-base sm:text-lg"
                  />
                  <span>Xe Đi Hà Nội</span>
                </a>
                <a
                  className="bg-sky-600 hover:bg-sky-700 text-white font-black text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-full inline-flex items-center gap-2 shadow-2xl transition leading-normal border-2 border-sky-400 hover:scale-105 duration-300 whitespace-nowrap shrink-0 min-h-[44px]"
                  href="/#detailed-services"
                >
                  <Icon
                    name="fa-car-side"
                    className="stitch-icon text-yellow-300 text-base sm:text-lg"
                  />
                  <span>Xe Đi Quảng Ninh</span>
                </a>
              </div>
            </div>
          </div>

          {/* Cột phải: Kết hợp với ô tô VinFast VF9 màu trắng sang trọng */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-md lg:max-w-none -mt-4 lg:-mt-8">
              <img
                alt="Xe điện VinFast VF9 màu trắng cao cấp đưa đón tận nơi"
                className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] transform lg:scale-105 hover:scale-110 transition duration-500"
                src="/images/brand/vinfast-vf9-white.png"
                width="885"
                height="430"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
