import { Link, useSearchParams } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import BookingWidget from '@/components/sections/BookingWidget/BookingWidget'
import Icon from '@/components/common/Icon/Icon'
import { routePreviews } from '@/data/home.mock'
import { formatCurrency } from '@/utils/format'
import styles from './SearchResultsPage.module.css'

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export default function SearchResultsPage() {
  const [params] = useSearchParams()
  const from = params.get('from') ?? ''
  const to = params.get('to') ?? ''
  const hasSearch = Boolean(from && to)
  const matches = hasSearch
    ? routePreviews.filter((route) => {
        if (params.get('service') === 'private')
          return route.category === 'private'
        if (route.category === 'private') return false
        const direct =
          normalize(from).includes(normalize(route.from)) &&
          normalize(to).includes(normalize(route.to))
        const reverse =
          normalize(to).includes(normalize(route.from)) &&
          normalize(from).includes(normalize(route.to))
        return direct || reverse
      })
    : []
  return (
    <MainLayout>
      <title>Tìm chuyến xe | GOMOVE</title>
      <meta name="robots" content="noindex, nofollow" />
      <div className={`container ${styles.page}`}>
        <Link to="/" className={styles.back}>
          ← Trở về trang chủ
        </Link>
        <h1>{hasSearch ? 'Hành trình của bạn' : 'Tìm chuyến xe phù hợp'}</h1>
        <p className={styles.notice}>
          Các tuyến và giá dưới đây là thông tin tham khảo. Vui lòng liên hệ tổng đài để nhận báo giá chi tiết.
        </p>
        <div className={styles.layout}>
          <BookingWidget key={params.toString()} />
          <div aria-live="polite">
            {hasSearch ? (
              <>
                <h2>
                  {from} → {to}
                </h2>
                <p className={styles.summary}>
                  {params.get('date')} · {params.get('time')} ·{' '}
                  {params.get('seats') ?? '1'} hành khách
                </p>
                {matches.length ? (
                  matches.map((route) => (
                    <article key={route.id} className={styles.card}>
                      <img
                        src={`/images/${route.image}.webp`}
                        width="244"
                        height="155"
                        alt={`Xe minh họa ${route.title}`}
                      />
                      <div>
                        <span className={styles.tag}>TUYẾN THAM KHẢO</span>
                        <h3>{route.title}</h3>
                        <p>{route.seats}</p>
                        <strong>
                          {route.price
                            ? formatCurrency(route.price)
                            : route.priceLabel}
                        </strong>
                        <a href="tel:0816665599">
                          <Icon name="phone" size={17} />
                          Liên hệ xác nhận giá & xe
                        </a>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className={styles.empty}>
                    <Icon name="search" size={40} />
                    <h3>Chưa có tuyến tham khảo phù hợp</h3>
                    <p>
                      Bạn có thể đổi điểm đón, điểm đến hoặc liên hệ để được tư
                      vấn hành trình.
                    </p>
                    <a href="tel:0816665599">Gọi 081 666 5599</a>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.empty}>
                <Icon name="car" size={48} />
                <h2>Bắt đầu chuyến đi của bạn</h2>
                <p>
                  Nhập điểm đón, điểm đến và thời gian vào form bên cạnh để xem
                  tuyến tham khảo.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
