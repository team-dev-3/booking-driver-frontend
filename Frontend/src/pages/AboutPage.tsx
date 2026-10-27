import { Link } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import Icon from '@/components/common/Icon/Icon'
import PricingPoster from './PricingPoster'
import styles from './AboutPage.module.css'

const benefitPaths = {
  network: 'M12 9V5M5 15v-3h14v3M12 12V9M9 2h6v6H9zM2 16h6v6H2zM9 16h6v6H9zM16 16h6v6h-6z',
  flexible: 'M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4',
  luggage: 'M9 6V3h6v3M5 7h14v13H5zM8 10v7M16 10v7M8 20v2M16 20v2',
  support: 'M4 13v-2a8 8 0 0 1 16 0v2M3 11h4v7H3zM17 11h4v7h-4zM19 18v1a2 2 0 0 1-2 2h-5M10 20h4v2h-4z',
  receipt: 'M6 3h12v19l-3-2-3 2-3-2-3 2V3ZM9 7h6M9 11h6M9 15h2m3 0h1',
} as const

function BenefitIcon({ name }: { name: keyof typeof benefitPaths }) {
  return <span className={styles.benefitIcon} aria-hidden="true"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={benefitPaths[name]} /></svg></span>
}

const highlights: { icon: keyof typeof benefitPaths; title: string; description: string }[] = [
  { icon: 'network', title: 'Kết nối liên tỉnh', description: 'Hà Nội, Hải Phòng, Hạ Long và Móng Cái.' },
  { icon: 'flexible', title: 'Lựa chọn linh hoạt', description: 'Xe ghép, xe đi riêng và xe tiện chuyến.' },
  { icon: 'luggage', title: 'Xe theo nhu cầu', description: 'Trao đổi loại xe, số ghế và hành lý trước chuyến đi.' },
  { icon: 'support', title: 'Tư vấn hành trình', description: 'Liên hệ để kiểm tra lịch trình và điểm đón trả.' },
  { icon: 'receipt', title: 'Tham khảo giá rõ ràng', description: 'Xem giá theo tuyến và xác nhận chi phí trước khi đặt.' },
]

export default function AboutPage() {
  return <MainLayout>
    <title>Giới thiệu GOMOVE | Xe ghép & xe tiện chuyến</title>
    <meta name="description" content="Giới thiệu dịch vụ xe ghép, xe đi riêng và xe tiện chuyến GOMOVE kết nối Hà Nội, Hải Phòng, Quảng Ninh. Tham khảo bảng giá theo tuyến và liên hệ tư vấn." />
    <div className={styles.breadcrumb}><nav className={styles.container} aria-label="Đường dẫn"><ol><li><Link to="/">Trang chủ</Link></li><li aria-hidden="true"><Icon name="chevron" size={14} /></li><li><span aria-current="page">Giới thiệu</span></li></ol></nav></div>
    <section className={styles.story} aria-labelledby="about-title"><div className={`${styles.container} ${styles.storyGrid}`}>
      <div className={styles.copy}><span className={styles.eyebrow}>VỀ CHÚNG TÔI</span><h1 id="about-title">Hệ thống xe ghép &amp; xe tiện chuyến GOMOVE</h1>
        <p>Bạn đang tìm kiếm phương tiện di chuyển từ Hà Nội đến Hải Phòng, Quảng Ninh? <strong>GOMOVE</strong> mang đến các lựa chọn xe ghép, xe tiện chuyến và xe đi riêng phù hợp với nhu cầu hành trình.</p>
        <p>Từ chuyến công tác, về quê đến đưa đón sân bay và du lịch, bạn có thể trao đổi trước về thời gian, điểm đón trả, loại xe và chi phí qua tổng đài <a href="tel:0816665599">081 666 5599</a>.</p>
        <div className={styles.missions}><div><h2><Icon name="route" />Định hướng kết nối</h2><p>Giúp hành khách tìm lựa chọn di chuyển phù hợp giữa Hà Nội, Hải Phòng và Quảng Ninh.</p></div><div><h2><Icon name="check" />Sứ mệnh phục vụ</h2><p>Hướng tới hành trình thuận tiện, thông tin rõ ràng và tư vấn theo nhu cầu của từng khách hàng.</p></div></div>
      </div>
      <figure className={styles.city}><img src="/images/about/haiphong.jpg" width="1200" height="773" alt="Khung cảnh thành phố Hải Phòng" fetchPriority="high" /><figcaption><span>TRỌNG TÂM KẾT NỐI</span><strong>Thành phố Cảng Hải Phòng</strong></figcaption></figure>
    </div></section>
    <section className={styles.fleet} aria-labelledby="fleet-title"><div className={styles.container}><header className={styles.sectionHeading}><span className={styles.eyebrow}>ĐỒNG HÀNH TRÊN MỖI CHUYẾN ĐI</span><h2 id="fleet-title">Lựa chọn xe phù hợp cho hành trình của bạn</h2><p>Xe ghép cho nhu cầu đi chung, xe đi riêng cho gia đình và nhóm khách cần lịch trình riêng.</p></header><img className={styles.fleetImage} src="/images/about/fleet.png" width="768" height="313" alt="Dàn xe du lịch màu trắng đỗ cạnh nhau ngoài trời" loading="lazy" decoding="async" /></div></section>
    <section className={styles.benefits} aria-labelledby="benefits-title"><div className={styles.container}><header className={styles.sectionHeading}><h2 id="benefits-title">LỢI THẾ KHI LỰA CHỌN GOMOVE</h2><p>Thông tin và lựa chọn để bạn chủ động chuẩn bị chuyến đi.</p></header><div className={styles.highlights}>{highlights.map(item => <div key={item.title} className={styles.highlight}><BenefitIcon name={item.icon} /><h3>{item.title}</h3><p>{item.description}</p></div>)}</div></div></section>
    <section className={styles.pricing} aria-labelledby="about-pricing-title"><div className={styles.container}><header className={styles.sectionHeading}><span className={styles.eyebrow}>BẢNG GIÁ THAM KHẢO</span><h2 id="about-pricing-title">BẢNG GIÁ XE GHÉP &amp; XE TIỆN CHUYẾN</h2><p>Giá dùng chung với trang Bảng giá xe ghép. Liên hệ để xác nhận chi phí và lịch trình trước khi đặt.</p></header>
      <PricingPoster />
      <div className={styles.actions}><Link to="/bang-gia">Xem bảng giá chi tiết</Link><a href="tel:0816665599"><Icon name="phone" size={18} />Gọi 081 666 5599</a></div>
    </div></section>
  </MainLayout>
}
