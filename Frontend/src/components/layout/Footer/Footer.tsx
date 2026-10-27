import styles from "./FooterTheme.module.css";
import Brand from "@/components/common/Brand/Brand";
import Icon from "@/components/common/Icon/Icon";
import { useState } from "react";

export default function Footer() {
  const [notice, setNotice] = useState("");
  return (
    <>
      <footer className={styles.footer}>
        <div className="mx-auto px-4 py-12 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="mb-4">
                <Brand />
              </div>
              <p className="text-xs mb-4 leading-relaxed">
                Hệ thống đặt xe tiện chuyến, xe ghép giá rẻ số 1 miền Bắc. An toàn, đúng giờ và tiết kiệm hàng đầu.
              </p>
              <form
                className="flex gap-1.5"
                onSubmit={(event) => {
                  event.preventDefault();
                  setNotice(
                    "Đăng ký nhận tin chưa khả dụng. Email chưa được gửi đi.",
                  );
                }}
              >
                <label htmlFor="footer-newsletter" className="sr-only">
                  Email đăng ký nhận tin
                </label>
                <input
                  className={styles.email}
                  placeholder="Email của bạn..."
                  required={true}
                  type="email"
                  id="footer-newsletter"
                />
                <button
                  className={styles.signup}
                  type="submit"
                >
                  Đăng ký
                </button>
              </form>

              {/* Icon Facebook & YouTube tròn */}
              <div className="flex items-center gap-3 mt-5">
                <button
                  className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs hover:opacity-80 transition shadow-xs"
                  type="button"
                  aria-label="Facebook GOMOVE"
                  onClick={() =>
                    setNotice(
                      "Chưa có liên kết mạng xã hội chính thức.",
                    )
                  }
                >
                  <Icon name="fa-facebook-f" className="stitch-icon " />
                </button>
                <button
                  className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center text-xs hover:opacity-80 transition shadow-xs"
                  type="button"
                  aria-label="YouTube GOMOVE"
                  onClick={() =>
                    setNotice(
                      "Chưa có liên kết mạng xã hội chính thức.",
                    )
                  }
                >
                  <Icon name="fa-youtube" className="stitch-icon " />
                </button>
              </div>

              {/* Huy hiệu DMCA Protected bên dưới icon */}
              <div className="mt-3">
                <a
                  href="https://www.dmca.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="DMCA Protected"
                  className="inline-block hover:opacity-90 transition"
                >
                  <img
                    src="/images/brand/dmca-protected.png"
                    alt="DMCA Protected"
                    width="120"
                    height="28"
                    className="h-6 w-auto object-contain block"
                  />
                </a>
              </div>
            </div>
            <div>
              <h2 className="font-black text-sm uppercase mb-4">
                Liên kết hữu ích
              </h2>
              <ul className="text-xs space-y-2">
                <li>
                  <a
                    className="hover:text-amber-500 flex items-center gap-1.5 transition"
                    href="/#detailed-services"
                  >
                    <Icon
                      name="fa-angle-right"
                      className="stitch-icon text-[10px] text-amber-500"
                    />
                    Xe ghép GOMOVE Hải Phòng
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-500 flex items-center gap-1.5 transition"
                    href="/#detailed-services"
                  >
                    <Icon
                      name="fa-angle-right"
                      className="stitch-icon text-[10px] text-amber-500"
                    />
                    Dịch vụ Tour du lịch Cát Bà - Cô Tô
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-500 flex items-center gap-1.5 transition"
                    href="/#detailed-services"
                  >
                    <Icon
                      name="fa-angle-right"
                      className="stitch-icon text-[10px] text-amber-500"
                    />
                    Bảng giá xe tiện chuyến 4 - 7 chỗ
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-500 flex items-center gap-1.5 transition"
                    href="/#blog-section"
                  >
                    <Icon
                      name="fa-angle-right"
                      className="stitch-icon text-[10px] text-amber-500"
                    />
                    Tin tức & Cẩm nang di chuyển
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-500 flex items-center gap-1.5 transition"
                    href="/dieu-khoan-su-dung"
                  >
                    <Icon
                      name="fa-angle-right"
                      className="stitch-icon text-[10px] text-amber-500"
                    />
                    Điều khoản & Chính sách bảo mật
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-black text-sm uppercase mb-4">
                Fanpage GOMOVE
              </h2>
              <div className={styles.fanpage}>
                <div className="flex items-center gap-3">
                  <img
                    src="/images/brand/facebook-community.jpg"
                    alt="Cộng đồng cùng đi xe GOMOVE"
                    width="160"
                    height="160"
                    loading="lazy"
                    className={styles.avatar}
                  />
                  <div>
                    <button
                      className="text-xs font-bold hover:text-amber-500 block leading-tight transition"
                      type="button"
                      aria-label="Xe Ghép Nhanh GOMOVE"
                      onClick={() =>
                        setNotice(
                          "Chưa có liên kết mạng xã hội chính thức.",
                        )
                      }
                    >
                      Xe Ghép Nhanh GOMOVE
                    </button>
                    <span className="text-[10px] text-slate-500">
                      11K người theo dõi
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    className={styles.follow}
                    type="button"
                    aria-label="Theo dõi Trang"
                    onClick={() =>
                      setNotice(
                        "Chưa có liên kết mạng xã hội chính thức.",
                      )
                    }
                  >
                    <Icon
                      name="fa-facebook"
                      className="stitch-icon text-sky-600"
                    />
                    Theo dõi Trang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Khối nền xanh: Bắt đầu từ Văn Phòng Hải Phòng trở xuống */}
        <div className={styles.blueBottomWrapper}>
          <div
            className={`${styles.contact} py-6 text-xs`}
            id="footer-contact"
          >
            <div className="mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
              <div>
                <strong className="block mb-1">
                  Văn Phòng Hải Phòng:
                </strong>
                <span>
                  Số 4B lô 26 BC Lê Hồng Phong, Đông Khê, Ngô Quyền, Hải Phòng
                </span>
                <br />
                <strong className="block mt-2 mb-1">
                  Văn Phòng Hà Nội:
                </strong>
                <span>
                  Tòa nhà Eco Lake View, 32 Đại Từ, Hoàng Mai, Hà Nội
                </span>
              </div>
              <div>
                <strong className="block mb-1">
                  Email hỗ trợ:
                </strong>
                <span>hotro@xeghepgomove.vn</span>
                <br />
                <span className="block mt-1">dieuhanh@xeghepgomove.vn</span>
              </div>
              <div className="flex items-center md:justify-end gap-3.5">
                <div className="w-11 h-11 rounded-full bg-brand-red text-white flex items-center justify-center text-lg shadow-md">
                  <Icon name="fa-phone-volume" className="stitch-icon " />
                </div>
                <div>
                  <span className="text-[11px] block font-medium">
                    Hotline GOMOVE 24/7:
                  </span>
                  <a
                    className="text-xl font-black text-brand-red hover:text-red-700 transition"
                    href="tel:0816665599"
                  >
                    081 666 5599
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.copyright} py-4 text-center text-xs`}>
            © 2026 XE GHÉP GOMOVE (xeghepgomove.vn). All Rights Reserved.
          </div>
          {notice && (
            <p
              role="status"
              className="max-w-6xl mx-auto px-4 text-xs py-1 text-center"
            >
              {notice}
            </p>
          )}
          <p className={`${styles.footerLinks} text-center text-[10px] px-4 py-2`}>
            <a href="/chinh-sach-quyen-rieng-tu">Quyền riêng tư</a> ·{" "}
            <a href="/chinh-sach-huy-hoan-tien">Chính sách hủy</a>
          </p>
        </div>
      </footer>
    </>
  );
}
