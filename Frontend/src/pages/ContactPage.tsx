import { Link } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import Icon from '@/components/common/Icon/Icon'
import MapPreview from '@/components/common/MapPreview/MapPreview'
import { useContactPreview } from '@/features/contact/useContactPreview'
import styles from './ContactPage.module.css'

export default function ContactPage() {
  const { fields, errors, preview, updateField, previewRequest } = useContactPreview()
  return <MainLayout>
    <title>Liên hệ & tư vấn đặt xe | GOMOVE</title>
    <meta name="description" content="Liên hệ GOMOVE qua hotline 081 666 5599 hoặc email. Thông tin văn phòng Hải Phòng, Hà Nội và bản đồ chỉ đường." />
    <div className={styles.breadcrumbBar}><nav className={styles.container} aria-label="Đường dẫn"><ol><li><Link to="/">Trang chủ</Link></li><li aria-hidden="true"><Icon name="chevron" size={14} /></li><li><span aria-current="page">Liên hệ</span></li></ol></nav></div>
    <div className={`${styles.container} ${styles.page}`}>
      <header className={styles.pageHeading}><h1>LIÊN HỆ GOMOVE</h1></header>
      <div className={styles.layout}>
        <div className={styles.details}>
          <section className={styles.panel} aria-labelledby="contact-details"><h2 id="contact-details">Thông tin liên hệ</h2><address className={styles.address}>
            <div><h3>Văn phòng Hải Phòng</h3><p>Số 4B lô 26 BC Lê Hồng Phong, Đông Khê, Ngô Quyền, Hải Phòng</p></div>
            <div><h3>Văn phòng Hà Nội</h3><p>Tòa nhà Eco Lake View, 32 Đại Từ, Hoàng Mai, Hà Nội</p></div>
            <div><h3>Hotline</h3><a className={styles.phone} href="tel:0816665599">081 666 5599</a></div>
            <div><h3>Email</h3><a href="mailto:hotro@xeghepgomove.vn">hotro@xeghepgomove.vn</a></div>
          </address></section>
          <section className={styles.mapPanel} aria-labelledby="contact-map"><h2 id="contact-map">Vị trí văn phòng Hải Phòng</h2><div className={styles.map}><MapPreview src="https://maps.google.com/maps?q=T%C3%B2a%20Nh%C3%A0%20%C4%90%C3%B4ng%20Ph%C6%B0%C6%A1ng,%20L%C3%AA%20H%E1%BB%93ng%20Phong,%20H%E1%BA%A3i%20Ph%C3%B2ng&amp;z=16&amp;output=embed" /></div><div className={styles.mapCaption}><span>Tòa Nhà Đông Phương · Lê Hồng Phong, Hải Phòng</span><a href="https://www.google.com/maps/search/?api=1&query=S%E1%BB%91%204B%20L%C3%B4%2026BC%20L%C3%AA%20H%E1%BB%93ng%20Phong%20H%E1%BA%A3i%20Ph%C3%B2ng" target="_blank" rel="noopener noreferrer">Mở bản đồ</a></div></section>
        </div>
        <section className={styles.messagePanel} aria-labelledby="contact-form-title" id="contact-form">
          <h2 id="contact-form-title">Để lại lời nhắn cho chúng tôi:</h2>
          <form className={styles.form} onSubmit={event => { event.preventDefault(); previewRequest() }}>
            <div className={styles.field}><label htmlFor="contact-name">Họ tên (bắt buộc)</label><input type="text" autoComplete="name" id="contact-name" value={fields.fullName} onChange={event => updateField('fullName', event.target.value)} required maxLength={100} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'contact-name-error' : undefined} placeholder="Họ tên" />{errors.fullName && <p id="contact-name-error" className={styles.error}>{errors.fullName}</p>}</div>
            <div className={styles.field}><label htmlFor="contact-email">Email</label><input type="email" autoComplete="email" id="contact-email" value={fields.email} onChange={event => updateField('email', event.target.value)} maxLength={254} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} placeholder="Email" />{errors.email && <p id="contact-email-error" className={styles.error}>{errors.email}</p>}</div>
            <div className={styles.field}><label htmlFor="contact-phone">Số điện thoại (bắt buộc)</label><input type="tel" autoComplete="tel" id="contact-phone" value={fields.phone} onChange={event => updateField('phone', event.target.value)} required maxLength={20} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'contact-phone-error' : undefined} placeholder="Số điện thoại" />{errors.phone && <p id="contact-phone-error" className={styles.error}>{errors.phone}</p>}</div>
            <div className={styles.field}><label htmlFor="contact-message">Nội dung (bắt buộc)</label><textarea rows={6} id="contact-message" value={fields.message} onChange={event => updateField('message', event.target.value)} required maxLength={2000} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} placeholder="Nội dung" />{errors.message && <p id="contact-message-error" className={styles.error}>{errors.message}</p>}</div>
            {Object.values(errors).some(Boolean) && <p role="alert" className={styles.error}>Vui lòng kiểm tra các trường được đánh dấu phía trên.</p>}
            <button className={styles.submit} type="submit">Gửi</button>
          </form>
          {preview && <div className={styles.preview} role="status"><h3>Lời nhắn chưa được gửi</h3><p>Hiện chưa có hệ thống nhận tin nhắn từ form. Bạn có thể gửi email hoặc gọi hotline để liên hệ.</p><dl><div><dt>Họ tên</dt><dd>{fields.fullName}</dd></div><div><dt>Điện thoại</dt><dd>{fields.phone}</dd></div>{fields.email && <div><dt>Email</dt><dd>{fields.email}</dd></div>}<div><dt>Nội dung</dt><dd>{fields.message}</dd></div></dl><div className={styles.actions}><a href="tel:0816665599">Gọi 081 666 5599</a><a href="mailto:hotro@xeghepgomove.vn">Gửi email</a></div></div>}
        </section>
      </div>
    </div>
  </MainLayout>
}
