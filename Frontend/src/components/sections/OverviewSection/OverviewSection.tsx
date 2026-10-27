import styles from "./OverviewSection.module.css";
import Icon from "@/components/common/Icon/Icon";
import MapPreview from "@/components/common/MapPreview/MapPreview";

export default function OverviewSection() {
  return (
    <>
      {" "}
      <section className="py-14 bg-white" id="overview">
        <div className="mx-auto px-4 max-w-6xl">
          <div className={styles.headingRow}>
            <h2 className={styles.heading}>
              {" TỔNG QUAN VỀ DỊCH VỤ XE GHÉP GOMOVE "}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase leading-snug">
                {
                  " XE TIỆN CHUYẾN HÀ NỘI - HẢI PHÒNG - HẠ LONG - QUẢNG NINH - MÓNG CÁI GIÁ RẺ, ĐẶT XE GHÉP HÀ NỘI - HẢI PHÒNG - HẠ LONG - QUẢNG NINH - MÓNG CÁI 24/7 "
                }
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                {
                  " Nếu bạn đang tìm kiếm một giải pháp di chuyển tiết kiệm chi phí và thuận tiện từ tuyến Hà Nội - Hải Phòng - Quảng Ninh - Móng Cái, đừng bỏ qua dịch vụ xe ghép Hà Nội - Hải Phòng - Quảng Ninh giá rẻ, đặt xe tiện chuyến Hà Nội - Hải Phòng - Quảng Ninh 24/7 của chúng tôi. "
                }
                <strong>{"Xeghepgomove.vn"}</strong>
                {
                  " cung cấp dịch vụ xe ghép chất lượng cao với mức giá cạnh tranh, giúp bạn tiết kiệm tối đa chi phí đi lại. "
                }
              </p>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                {
                  " Đội ngũ tài xế chuyên nghiệp, giàu kinh nghiệm, luôn đặt sự an toàn và thoải mái của hành khách lên hàng đầu. Cam kết đúng giờ, đúng tuyến, không bắt khách dọc đường, đảm bảo sự riêng tư cho khách hàng. Hãy liên hệ ngay với chúng tôi để được tư vấn lộ trình, báo giá và đặt xe nhanh chóng, dễ dàng. "
                }
              </p>
              <div className="pt-2">
                <h4 className="text-xs sm:text-sm font-black uppercase text-slate-900 mb-2.5">
                  {
                    " Lịch trình, bảng giá xe tuyến Xe Hải Phòng - Hà Nội và ngược lại: "
                  }
                </h4>
                <div className="overflow-x-auto border border-slate-200">
                  <table className="w-full text-xs text-left border-collapse bg-white">
                    <tbody>
                      <tr className="border-b border-slate-200">
                        <td className="p-3 font-semibold text-slate-800">
                          {" Xe ghép "}
                          <Icon
                            name="fa-arrow-right"
                            className="stitch-icon text-[10px] text-slate-400 mx-1"
                          />
                          {" Hà Nội - Hải Phòng | "}
                          <Icon
                            name="fa-clock"
                            className="stitch-icon text-slate-400 mx-1"
                          />
                          {" Khởi hành: theo chuyến "}
                        </td>
                        <td className="p-3 font-black text-brand-red text-right whitespace-nowrap">
                          {"400k - 500k"}
                        </td>
                      </tr>
                      <tr className="border-b border-slate-200 bg-slate-50/60">
                        <td className="p-3 font-semibold text-slate-800">
                          {" Xe tiện chuyến 5 chỗ "}
                          <Icon
                            name="fa-arrow-right"
                            className="stitch-icon text-[10px] text-slate-400 mx-1"
                          />
                          {" Hà Nội - Hải Phòng | "}
                          <Icon
                            name="fa-clock"
                            className="stitch-icon text-slate-400 mx-1"
                          />
                          {" Khởi hành: 1 chuyến "}
                        </td>
                        <td className="p-3 font-black text-brand-red text-right whitespace-nowrap">
                          {"900k - 1.100k"}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-800">
                          {" Xe tiện chuyến 7 chỗ "}
                          <Icon
                            name="fa-arrow-right"
                            className="stitch-icon text-[10px] text-slate-400 mx-1"
                          />
                          {" Hà Nội - Hải Phòng | "}
                          <Icon
                            name="fa-clock"
                            className="stitch-icon text-slate-400 mx-1"
                          />
                          {" Khởi hành: 1 chuyến "}
                        </td>
                        <td className="p-3 font-black text-brand-red text-right whitespace-nowrap">
                          {"1.000k - 1.200k"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="text-[11px] text-slate-500 leading-relaxed pt-2">
                <strong className="text-slate-800">
                  {"Liên hệ đặt xe online:"}
                </strong>
                {
                  " xe ghép hà nội hải phòng, xe tiện chuyến, xe đi khám bệnh hải phòng - hà nội, xe đi du lịch hải phòng - hà nội, xe đi về quê hải phòng - hà nội, giá xe ghép, xe hà nội hải phòng, xe tiện chuyến hà nội hải phòng, xe ghép hà nội hải dương, xe ghép hải dương hải phòng, vé hà nội hải phòng, taxi, wifi, limousine 7 chỗ, xe 4 chỗ, xe 5 chỗ. "
                }
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="overflow-hidden border border-slate-200 shadow-md bg-white">
                <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-black text-slate-900">
                      {"Tòa Nhà Đông Phương"}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {"Số 4B Lô 26BC, Lê Hồng Phong, Đông Khê, Hải Phòng"}
                    </div>
                  </div>
                  <a
                    className="w-8 h-8 rounded-full bg-white border border-slate-200 text-sky-600 flex items-center justify-center text-xs shadow-xs hover:bg-sky-50 transition"
                    href="https://www.google.com/maps/search/?api=1&query=S%E1%BB%91%204B%20L%C3%B4%2026BC%20L%C3%AA%20H%E1%BB%93ng%20Phong%20%C4%90%C3%B4ng%20Kh%C3%AA%20H%E1%BA%A3i%20Ph%C3%B2ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Mở vị trí văn phòng trên Google Maps"
                  >
                    <Icon
                      name="fa-diamond-turn-right"
                      className="stitch-icon "
                    />
                  </a>
                </div>
                <div className="h-80 w-full relative">
                  <MapPreview src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.4682434553315!2d106.699313!3d20.853245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7af2767098e9%3A0xb30e38a2e58c734!2zTMOqIEjhu5NuZyBQaG9uZywgxJDDtG5nIEtow6osIE5nw7QgUXV54buBbiwgSOG6o2kgUGjDsm5n!5e0!3m2!1svi!2s!4v1700000000000"></MapPreview>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
    </>
  );
}
