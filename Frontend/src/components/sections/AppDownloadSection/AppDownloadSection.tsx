import { useState } from "react";
import Icon from "@/components/common/Icon/Icon";
import styles from "./AppDownloadSection.module.css";

export default function AppDownloadSection() {
  const [notice, setNotice] = useState('');
  function showAvailability(store: string) {
    setNotice(`Liên kết GOMOVE trên ${store} chưa được cung cấp. Bạn có thể đặt lịch trên website hoặc liên hệ 081 666 5599.`);
  }
  return <section id="download-app" className={styles.section} aria-labelledby="app-download-heading">
    <div className={styles.panel}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>TẢI ỨNG DỤNG</p>
        <h2 id="app-download-heading">Tải ứng dụng<span>GOMOVE</span></h2>
        <p className={styles.tagline}>Đặt xe dễ dàng<br />Đi xa tiện lợi</p>
        <div className={styles.downloads}>
          <div className={styles.appIdentity}><img src="/images/brand/gomove-symbol.png" width="438" height="470" alt="Biểu tượng GOMOVE" /><span>GOMOVE</span></div>
          <div className={styles.stores}>
            <button type="button" className={styles.store} onClick={() => showAvailability('Google Play')} aria-label="Tải GOMOVE trên Google Play"><svg viewBox="0 0 28 30" width="28" height="30" aria-hidden="true"><path d="M2 2 17 15 2 28Z" fill="#39d68b"/><path d="m2 2 19 10-4 3Z" fill="#46b6ff"/><path d="m2 28 19-10-4-3Z" fill="#ff5965"/><path d="m17 15 4-3 5 3-5 3Z" fill="#ffcf47"/></svg><span><small>GET IT ON</small><strong>Google Play</strong></span></button>
            <button type="button" className={styles.store} onClick={() => showAvailability('App Store')} aria-label="Tải GOMOVE trên App Store"><Icon name="fa-apple" size={32} /><span><small>Download on the</small><strong>App Store</strong></span></button>
          </div>
        </div>
        <p className={styles.notice} role="status">{notice}</p>
      </div>
      <div className={styles.visual}>
        <img className={styles.appPreview} src="/images/brand/gomove-app-preview.png" width="320" height="697" alt="Ứng dụng đặt xe: minh họa chọn hành trình và xác nhận chuyến đi trên điện thoại" loading="lazy" decoding="async" />
      </div>
    </div>
  </section>;
}
