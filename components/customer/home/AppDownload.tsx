
export default function AppDownload() {
  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto grid max-w-5xl items-center gap-10 rounded-2xl bg-[#eefaf7] px-6 py-12 shadow-md md:grid-cols-2 md:px-14">
        <div>
          <p className="text-sm font-bold text-emerald-600">
            XE GHÉP GOMOVE
          </p>

          <h2 className="mt-3 text-2xl font-black leading-tight text-slate-900 md:text-3xl">
            Tải ứng dụng xe ghép GOMOVE
            <span className="mt-2 block text-emerald-600">
              Đặt xe dễ dàng – Đi xe tiện lợi
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-gray-600">
            Theo dõi thông tin chuyến đi, tìm kiếm tuyến xe và đặt
            xe thuận tiện ngay trên điện thoại của bạn.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <div className="rounded-lg bg-white p-2 shadow-sm">
              <img
                src="/images/banners/qr.png"
                alt="Mã QR tải ứng dụng GoMove"
                className="h-24 w-24 object-contain"
              />
            </div>

            <div className="flex flex-col gap-3">
              <span className="rounded-lg bg-black px-5 py-3 text-center text-xs font-bold text-white">
                ▶ Google Play
              </span>

              <span className="rounded-lg bg-black px-5 py-3 text-center text-xs font-bold text-white">
                ● App Store
              </span>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Các nút tải ứng dụng sẽ được kích hoạt khi có đường dẫn
            ứng dụng chính thức.
          </p>
        </div>

        <div className="flex justify-center">
          <img
            src="/images/banners/app-phone.jpg"
            alt="Giao diện ứng dụng GoMove trên điện thoại"
            className="max-h-[400px] w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
