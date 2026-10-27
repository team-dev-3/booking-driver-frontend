import { sharedPosterPrices, privatePosterPrices } from '@/data/pricingPoster.mock'
import styles from './PricingPoster.module.css'

export default function PricingPoster() {
  return <div className={styles.poster}>
    <header className={styles.heading}>
      <h3>DỊCH VỤ XE GHÉP UY TÍN GIÁ RẺ</h3>
      <p>HÀ NỘI ↔ HẢI PHÒNG ↔ QUẢNG NINH</p>
      <a className={styles.hotline} href="tel:0816665599"><span>HOTLINE: 081 666 5599</span><span>ZALO: 081 666 5599</span></a>
      <div className={styles.identity}><div className={styles.logo}><img src="/images/brand/gomove-wordmark.png" width="600" height="200" alt="GOMOVE" loading="lazy" /></div><div className={styles.qr}><svg viewBox="137 10 380 380" width="80" height="80" role="img" aria-label="Mã QR Zalo từ ảnh được cung cấp"><image href="/images/pricing/zalo-qr-source.jpg" width="651" height="471" /></svg></div></div>
    </header>
    <div className={styles.rates}>
      <h4 className={styles.ratesTitle}>● Bảng Giá Các Tuyến ●</h4>
      <div className={styles.cards}>
        <div className={styles.card}>
          <h4>GIÁ GHÉP ĐI CHUNG</h4>
          <dl>{sharedPosterPrices.map(row => <div key={row.label}><dt>{row.label}</dt><dd>{row.price}</dd></div>)}</dl>
        </div>
        {privatePosterPrices.map(route => <div className={styles.card} key={route.route}>
          <h4>{route.route}</h4>
          <dl>{route.prices.map((price, index) => <div key={price}><dt>{['Xe 5 chỗ', 'Xe 7 chỗ', 'Xe 7 chỗ VIP'][index]}:</dt><dd>{price}</dd></div>)}</dl>
        </div>)}
      </div>
    </div>
    <aside className={styles.media} aria-label="Liên hệ và hình ảnh dịch vụ">
      <div className={styles.photos}>
      <img className={styles.photo} src="/images/pricing/avanza.jpg" width="640" height="472" alt="Xe Toyota Avanza màu bạc nhìn từ phía trước" loading="lazy" decoding="async" />
      <img className={styles.photo} src="/images/pricing/seven-seat-interior.jpg" width="1024" height="681" alt="Khoang nội thất xe Kia 7 chỗ với ghế da và cửa sổ trời" loading="lazy" decoding="async" />
      </div>
    </aside>
  </div>
}
