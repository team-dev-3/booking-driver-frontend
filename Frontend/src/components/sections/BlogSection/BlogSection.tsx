import { Link } from "react-router-dom";

export default function BlogSection() {
  return (
    <>
      {" "}
      <section className="py-14 bg-white" id="blog-section">
        <div className="mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900 tracking-tight">
              <span className="text-slate-900">{"BẢN TIN "}</span>
              <span className="text-[#ea7227]">{"BLOG & KINH NGHIỆM"}</span>
            </h2>
            <div className="w-12 h-1 bg-brand-red mx-auto mt-2 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <Link
                className="block relative rounded-lg overflow-hidden card-shadow h-[220px] sm:h-[240px] group cursor-pointer"
                to="/bai-viet/hanoi-vinhlam"
              >
                <img
                  alt="Xe ghép Hà Nội - Vịnh Lan Hạ"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  src="/images/stitch/asset-24.webp"
                  width="1200"
                  height="655"
                  decoding="async"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] text-slate-300 font-medium mb-1">
                    {"10-09-2026"}
                  </span>
                  <h3 className="text-sm sm:text-base font-black leading-snug hover:text-yellow-400 transition">
                    {
                      " Xe ghép Hà Nội – Vịnh Lan Hạ thuận tiện, tiết kiệm, đón trả linh hoạt "
                    }
                  </h3>
                </div>
              </Link>
              <Link
                className="block relative rounded-lg overflow-hidden card-shadow h-[220px] sm:h-[240px] group cursor-pointer"
                to="/bai-viet/halong-mongcai"
              >
                <img
                  alt="Xe ghép Hạ Long Móng Cái"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  src="/images/stitch/asset-25.webp"
                  width="1200"
                  height="655"
                  decoding="async"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] text-slate-300 font-medium mb-1">
                    {"06-09-2026"}
                  </span>
                  <h3 className="text-sm sm:text-base font-black leading-snug hover:text-yellow-400 transition">
                    {
                      " Xe ghép Hạ Long – Móng Cái: Chủ động hành trình, thuận tiện mỗi chuyến đi "
                    }
                  </h3>
                </div>
              </Link>
            </div>
            <div className="lg:col-span-7">
              <Link
                className="block relative rounded-lg overflow-hidden card-shadow h-full min-h-[380px] sm:min-h-[500px] group cursor-pointer"
                to="/bai-viet/hanoi-mongcai"
              >
                <img
                  alt="Cửa khẩu Móng Cái hành trình dài"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  src="/images/stitch/asset-26.webp"
                  width="1200"
                  height="655"
                  decoding="async"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                  <span className="text-xs text-slate-300 font-semibold mb-1">
                    {"03-09-2026"}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-black leading-snug hover:text-yellow-400 transition">
                    {
                      " Xe ghép Hà Nội – Móng Cái: Hành trình đường dài thuận tiện "
                    }
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>{" "}
    </>
  );
}
