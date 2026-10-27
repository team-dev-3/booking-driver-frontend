import { Link } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import Icon from '@/components/common/Icon/Icon'
import { servicePreviews, serviceFares } from '@/data/stitch.mock'
import { formatCurrency } from '@/utils/format'
import styles from './ServicesPage.module.css'

export default function ServicesPage() {
  return <MainLayout>
    <title>Dịch vụ xe ghép & xe tiện chuyến | GOMOVE</title>
    <meta name="description" content="Khám phá các dịch vụ xe ghép GOMOVE: Hà Nội, Hải Phòng, Hạ Long, Quảng Ninh, Thái Bình, Móng Cái, Thanh Hóa và taxi Nội Bài. Xem giá tham khảo và liên hệ đặt xe." />
    <div className={styles.breadcrumbBar}><nav className={styles.container} aria-label="Đường dẫn"><ol><li><Link to="/">Trang chủ</Link></li><li aria-hidden="true"><Icon name="chevron" size={14} /></li><li><span aria-current="page">Dịch vụ</span></li></ol></nav></div>
    <div className={`${styles.container} ${styles.page}`}>
      <header className={styles.intro}>
        <h1>BẢNG GIÁ DỊCH VỤ XE GHÉP LIÊN TỈNH</h1>
        <p>Chọn dịch vụ phù hợp cho hành trình của bạn cùng GOMOVE.</p>
      </header>
      <section className={styles.grid} aria-label="Danh sách dịch vụ xe ghép">
        {servicePreviews.map((service, index) => {
          const fares = serviceFares[service.title]
          const lowestPrice = fares?.length ? Math.min(...fares.map(fare => fare.price)) : undefined
          return <article className={styles.card} key={service.title}>
            <div className={styles.imageWrap}>
              <img src={service.image.src} alt={service.image.alt} width={service.image.width} height={service.image.height} loading={index < 4 ? 'eager' : 'lazy'} decoding="async" />
              <div className={styles.badges}>{service.badges.map(badge => <span key={badge.label}>{badge.label}</span>)}</div>
              <span className={styles.priceTag}>{lowestPrice !== undefined ? 'Từ ' + formatCurrency(lowestPrice) : 'Liên hệ báo giá'}</span>
            </div>
            <div className={styles.content}>
              <h2>{service.title}</h2>
              <ul className={styles.features}>{service.features.map(feature => <li key={feature}><Icon name="check" size={16} /><span>{feature.replace(/^•\s*/, '')}</span></li>)}</ul>
              <a href="tel:0816665599" className={styles.booking}><Icon name="phone" size={16} /><span>Đặt xe: 081 666 5599</span></a>
            </div>
          </article>
        })}
      </section>
      <p className={styles.more}>Cần xem giá xe ghép và bao xe theo từng tuyến? <Link to="/bang-gia">Xem bảng giá chi tiết</Link></p>
    </div>
  </MainLayout>
}
