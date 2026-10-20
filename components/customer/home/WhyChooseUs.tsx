
const reasons = [
  "Đặt xe nhanh chóng, hỗ trợ tư vấn 24/7.",
  "Giá cả minh bạch, tiết kiệm chi phí di chuyển.",
  "Đội ngũ tài xế giàu kinh nghiệm, chuyên nghiệp.",
  "Xe đời mới, sạch sẽ, đầy đủ tiện nghi.",
  "Đưa đón tận nơi tại Hà Nội, Hải Phòng và Quảng Ninh.",
];

export default function WhyChooseUs() {
  return (
    <section
      id="gioi-thieu"
      className="scroll-mt-28 bg-slate-950 px-4 py-16 md:py-20"
    >
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl lg:grid-cols-2">
        {/* Nội dung bên trái */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">
          <span className="mb-4 inline-block w-fit rounded-full bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-orange-600">
            Vì sao chọn GoMove?
          </span>

          <h2 className="max-w-lg text-2xl font-extrabold leading-snug tracking-tight text-slate-900 md:text-[28px]">
            Lý do lựa chọn xe ghép tại
            <span className="text-orange-500"> GoMove.vn</span>
          </h2>

          <p className="mt-4 text-sm font-semibold text-slate-500">
            Uy tín · An toàn · Tiết kiệm
          </p>

          <div className="mt-8 space-y-5">
            {reasons.map((reason, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
                  ✓
                </span>

                <p className="text-[14px] font-medium leading-7 text-slate-700">
                  {reason}
                </p>
              </div>
            ))}
          </div>

          <a
            href="#dat-xe"
            className="mt-9 inline-flex w-fit items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            Đặt xe ngay
            <span>→</span>
          </a>
        </div>

        {/* Hình bên phải */}
        <div className="relative min-h-[300px] lg:min-h-[470px]">
          <img
            src="/images/banners/fleet.jpg"
            alt="Dịch vụ xe ghép GoMove"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
