import Icon from "@/components/common/Icon/Icon";
import styles from "./FeatureHighlightSection.module.css";

export default function FeatureHighlightSection() {
  return (
    <section id="why-choose-us" aria-labelledby="why-choose-heading" className={`parallax-bg ${styles.section}`}>
      <div className={styles.overlay} />
      <div className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.copy}>
            <h2 id="why-choose-heading" className={styles.heading}>Vì sao chọn xe ghép GOMOVE?</h2>
            <a className={styles.hotline} href="tel:0816665599">Tổng đài đặt xe: 081 666 5599</a>
            <p className={styles.intro}>Tư vấn, báo giá và hỗ trợ đặt xe theo hành trình.</p>
                <ul className={styles.benefits}>
                  <li className="flex items-start gap-3">
                    <Icon
                      name="fa-circle-check"
                      className="stitch-icon text-amber-500 mt-0.5 text-base"
                    />
                    <span className="">
                      <strong>{"Sở hữu 100+ Xe"}</strong>
                      {" đưa đón tận nơi đời mới, cao cấp."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon
                      name="fa-circle-check"
                      className="stitch-icon text-amber-500 mt-0.5 text-base"
                    />
                    <span className="">
                      <strong>{"Miễn phí đợi chờ"}</strong>
                      {", đặt lịch online nhanh gọn chỉ 30 giây."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon
                      name="fa-circle-check"
                      className="stitch-icon text-amber-500 mt-0.5 text-base"
                    />
                    <span className="">
                      <strong>{"Giảm đến 100,000đ"}</strong>
                      {" xe tiện chuyến về trong ngày."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon
                      name="fa-circle-check"
                      className="stitch-icon text-amber-500 mt-0.5 text-base"
                    />
                    <span className="">
                      {"Đặt xe Ghép Hà Nội Hải Phòng Rẻ, Nhanh, Tiết Kiệm "}
                      <strong>{"400k"}</strong>
                      {"."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon
                      name="fa-circle-check"
                      className="stitch-icon text-amber-500 mt-0.5 text-base"
                    />
                    <span className="">
                      {"Xe Ghép, Tiện Chuyến Hải Phòng – Quảng Ninh – Hạ Long "}
                      <strong>{"250k"}</strong>
                      {"."}
                    </span>
                  </li>
                </ul>
          </div>
          <div className={styles.photo}>
            <img src="/images/stitch/asset-12.webp" alt="Bãi đỗ đội xe du lịch và xe ghép GOMOVE" width="720" height="393" decoding="async" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
