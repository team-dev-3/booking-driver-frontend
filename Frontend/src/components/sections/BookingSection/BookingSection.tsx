import BookingForm from "./BookingForm";
import styles from "./BookingSection.module.css";

export default function BookingSection() {
  return (
    <section id="booking-form" aria-labelledby="booking-heading" className={styles.section}>
      <div className={styles.container}>
        <h2 id="booking-heading" className={styles.heading}>ĐẶT XE NHANH THEO LỊCH TRÌNH</h2>
        <div className={styles.panel}>
          <div className={styles.formArea}><BookingForm /></div>
          <div className={styles.artwork}>
            <img src="/images/brand/booking-car.png" width="1920" height="1080" loading="lazy" decoding="async" alt="Xe Toyota trắng cùng không gian nội thất ghế da đỏ" />
          </div>
        </div>
      </div>
    </section>
  );
}
