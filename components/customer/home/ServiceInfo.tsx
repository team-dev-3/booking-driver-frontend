
const routes = [
  { name: "Hà Nội - Hải Phòng", price: "350.000đ - 400.000đ" },
  { name: "Hải Phòng - Hạ Long", price: "250.000đ - 350.000đ" },
  { name: "Hà Nội - Hạ Long", price: "400.000đ - 450.000đ" },
  { name: "Hải Phòng - Móng Cái", price: "500.000đ - 600.000đ" },
];

export default function ServiceInfo() {
  return (
    <section className="bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-lg bg-sky-500 px-5 py-3 text-center text-sm font-extrabold text-white">
          TỔNG QUAN VỀ DỊCH VỤ XE GHÉP GOMOVE
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-black uppercase leading-relaxed text-slate-900">
              XE TIỆN CHUYẾN HÀ NỘI - HẢI PHÒNG - HẠ LONG - QUẢNG NINH
              - MÓNG CÁI GIÁ RẺ, ĐƯA ĐÓN TẬN NƠI
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-600">
              GoMove cung cấp dịch vụ xe ghép, xe tiện chuyến và thuê
              xe riêng phục vụ nhu cầu di chuyển giữa Hà Nội, Hải
              Phòng, Hạ Long và Quảng Ninh.
            </p>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              Khách hàng có thể lựa chọn các dòng xe 4 chỗ, 7 chỗ
              hoặc xe lớn tùy theo nhu cầu. Dịch vụ hỗ trợ đón trả
              tận nơi, đặt lịch linh hoạt và tư vấn nhanh chóng.
            </p>

            <h3 className="mt-7 text-sm font-black uppercase">
              LIÊN TỈNH, BẢNG GIÁ XE TIỆN CHUYẾN THAM KHẢO
            </h3>

            <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
              {routes.map((route, index) => (
                <div
                  key={route.name}
                  className={`flex items-center justify-between gap-3 p-4 text-xs ${
                    index !== routes.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  <span className="font-semibold">{route.name}</span>
                  <strong className="text-right text-red-600">
                    {route.price}
                  </strong>
                </div>
              ))}
            </div>

            <p className="mt-3 text-xs italic text-gray-500">
              Giá mang tính minh họa và có thể thay đổi tùy thời điểm.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black uppercase text-slate-900">
              Khu vực phục vụ
            </h3>

            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <iframe
                title="Bản đồ khu vực Hải Phòng"
                src="https://maps.google.com/maps?q=Hai%20Phong%20Vietnam&t=&z=10&ie=UTF8&iwloc=&output=embed"
                className="h-80 w-full border-0 md:h-96"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-5 rounded-lg bg-sky-50 p-5 text-sm text-slate-700">
              <p className="font-bold text-sky-700">
                Phục vụ nhiều tuyến đường
              </p>
              <p className="mt-2">
                Hà Nội - Hải Phòng - Quảng Ninh - Hạ Long - Móng Cái
                và các tuyến theo yêu cầu.
              </p>
              <a
                href="#dat-xe"
                className="mt-4 inline-block font-bold text-orange-600"
              >
                Đặt xe ngay →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
