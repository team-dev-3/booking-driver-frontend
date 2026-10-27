import { Link } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import Icon from '@/components/common/Icon/Icon'
import { pricingTables } from '@/data/pricing.mock'
import styles from './PricingPage.module.css'
import PricingPoster from './PricingPoster'

function PricingTable({ index, title }: { index: number; title: string }) {
  const [headers, ...rows] = pricingTables[index]
  return <div className={styles.tableScroll} role="region" aria-label={title} tabIndex={0}>
    <table><caption className={styles.srOnly}>{title}</caption><thead><tr>{headers.map(header => <th scope="col" key={header}>{header}</th>)}</tr></thead>
      <tbody>{rows.map(row => <tr key={row[0]}>{row.map((cell, column) => column === 0 ? <th scope="row" key={column}>{cell}</th> : <td key={column}>{cell === 'Liên hệ' ? <a href="tel:0816665599">Liên hệ</a> : cell}</td>)}</tr>)}</tbody>
    </table>
  </div>
}

export default function PricingPage() {
  return <MainLayout>
    <title>Bảng giá xe ghép GOMOVE | Hà Nội, Hải Phòng, Quảng Ninh</title>
    <meta name="description" content="Tham khảo bảng giá xe ghép, xe đi riêng và xe tiện chuyến GOMOVE tuyến Hải Phòng, Hà Nội, Hạ Long, Móng Cái. Liên hệ để xác nhận giá." />
    <div className={styles.page}>
      <nav aria-label="Đường dẫn" className={styles.breadcrumb}><ol><li><Link to="/">Trang chủ</Link></li><li aria-hidden="true"><Icon name="chevron" size={14} /></li><li><span aria-current="page">Bảng giá</span></li></ol></nav>
      <img className={styles.hero} src="/images/pricing/fleet.jpg" alt="Dàn xe du lịch màu trắng đỗ cạnh nhau ngoài trời" width="768" height="313" fetchPriority="high" />
      <article className={styles.article}>
        <h1>Bảng giá xe ghép GOMOVE</h1>
        <p>Bạn đang tìm kiếm phương tiện di chuyển từ Hải Phòng đi Hà Nội, Quảng Ninh hoặc Hạ Long?</p>
        <p>Tham khảo giá dịch vụ xe ghép, xe đi riêng và xe tiện chuyến dưới đây để lựa chọn hành trình phù hợp.</p>
        <p className={styles.notice}><strong>Giá tham khảo theo thiết kế.</strong> Giá và khả năng phục vụ cần được xác nhận qua hotline trước khi đặt chuyến.</p>
        <section aria-labelledby="shared-pricing">
          <h2 id="shared-pricing">Bảng giá xe ghép</h2>
          <PricingPoster />
          <PricingTable index={0} title="Giá xe ghép theo tuyến" />
        </section>
        <section aria-labelledby="private-pricing"><h2 id="private-pricing">Bảng giá xe đi riêng, xe tiện chuyến Hải Phòng – Hà Nội</h2><PricingTable index={1} title="Giá xe đi riêng theo tuyến và loại xe" /></section>
        <section aria-labelledby="district-pricing"><h2 id="district-pricing">Giá xe từ các khu vực Hải Phòng đi Hà Nội</h2><p>Bạn có thể tham khảo mức giá theo quãng đường và loại xe phù hợp với nhu cầu.</p><PricingTable index={2} title="Giá tham khảo theo khu vực đón" /></section>
        <section aria-labelledby="service-comparison"><h2 id="service-comparison">Phân biệt dịch vụ Xe ghép và Bao xe (Xe đi riêng)</h2><p>Cả hai hình thức đều phục vụ nhu cầu di chuyển liên tỉnh. Điểm đón trả và lịch trình được trao đổi khi tư vấn hành trình.</p><PricingTable index={3} title="So sánh xe ghép và bao xe" /><div className={styles.advice}><h3>Lựa chọn dịch vụ nào phù hợp?</h3><p><strong>Xe ghép:</strong> Phù hợp với cá nhân hoặc nhóm nhỏ muốn tối ưu chi phí và linh hoạt thời gian.</p><p><strong>Bao xe:</strong> Phù hợp với gia đình, nhóm bạn, người có nhiều hành lý hoặc cần lịch trình riêng.</p><Link to="/#booking-form" className={styles.cta}>Lên lịch hành trình →</Link></div></section>
      </article>
    </div>
  </MainLayout>
}
