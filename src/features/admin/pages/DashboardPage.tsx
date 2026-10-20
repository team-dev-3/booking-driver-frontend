import { useEffect, useState } from 'react'
import {
  Activity,
  CarFront,
  CircleDollarSign,
  RefreshCw,
  Route,
  UsersRound,
} from 'lucide-react'
import { AdminLayout } from '../components/AdminLayout'
import { getDashboardOverview } from '../api/admin.api'
import type { DashboardOverview } from '../types/admin.types'
import { useAuth } from '../../../context/AuthContext'
import { getErrorMessage } from '../../../utils/get-error-message'

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: DashboardOverview }

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
})

export function DashboardPage() {
  const { token } = useAuth()
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' })
//   const [loadState, setLoadState] = useState<LoadState>({
//   status: 'success',
//   data: {
//     tripsToday: 0,
//     vehiclesInUse: 0,
//     driversOnline: 0,
//     revenueTodayVnd: 0,
//   },
// })
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (!token) {
      return
    }

    let isCurrent = true
    setLoadState({ status: 'loading' })

    getDashboardOverview(token)
      .then((data) => {
        if (isCurrent) {
          setLoadState({ status: 'success', data })
        }
      })
      .catch((error: unknown) => {
        if (isCurrent) {
          setLoadState({
            status: 'error',
            message: getErrorMessage(error, 'Không thể tải dữ liệu tổng quan.'),
          })
        }
      })

    return () => {
      isCurrent = false
    }
  }, [token, reloadKey])

  const metrics =
    loadState.status === 'success'
      ? [
          {
            label: 'Chuyến trong ngày',
            value: loadState.data.tripsToday.toLocaleString('vi-VN'),
            detail: 'Tổng số chuyến hôm nay',
            icon: Route,
            tone: 'mint',
          },
          {
            label: 'Xe đang chạy',
            value: loadState.data.vehiclesInUse.toLocaleString('vi-VN'),
            detail: 'Phương tiện đang hoạt động',
            icon: CarFront,
            tone: 'blue',
          },
          {
            label: 'Tài xế online',
            value: loadState.data.driversOnline.toLocaleString('vi-VN'),
            detail: 'Tài xế đang sẵn sàng',
            icon: UsersRound,
            tone: 'amber',
          },
          {
            label: 'Doanh thu trong ngày',
            value: currencyFormatter.format(loadState.data.revenueTodayVnd),
            detail: 'Doanh thu ghi nhận hôm nay',
            icon: CircleDollarSign,
            tone: 'violet',
          },
        ]
      : []

  return (
    <AdminLayout pageTitle="Tổng quan">
        <section className="dashboard-content">
          <div className="page-heading">
            <div>
              <span className="eyebrow">BẢNG ĐIỀU KHIỂN</span>
              <h1>Tổng quan vận hành</h1>
              <p>Theo dõi nhanh hoạt động GoAnywhere trong ngày.</p>
            </div>
            <button
              className="secondary-button"
              type="button"
              onClick={() => setReloadKey((key) => key + 1)}
              disabled={loadState.status === 'loading'}
            >
              <RefreshCw
                size={16}
                className={loadState.status === 'loading' ? 'spin' : ''}
                aria-hidden="true"
              />
              Làm mới
            </button>
          </div>

          <div className="section-heading">
            <div>
              <h2>Chỉ số hôm nay</h2>
              <p>Dữ liệu được cập nhật từ hệ thống.</p>
            </div>
            <span className="live-indicator">
              <span />
              Tổng quan
            </span>
          </div>

          {loadState.status === 'error' ? (
            <div className="dashboard-error" role="alert">
              <span className="error-icon">
                <Activity size={21} aria-hidden="true" />
              </span>
              <div>
                <h3>Chưa thể tải dữ liệu tổng quan</h3>
                <p>{loadState.message}</p>
              </div>
              <button
                className="secondary-button retry-button"
                type="button"
                onClick={() => setReloadKey((key) => key + 1)}
              >
                Thử lại
              </button>
            </div>
          ) : (
            <div className="metric-grid" aria-live="polite" aria-busy={loadState.status === 'loading'}>
              {loadState.status === 'loading'
                ? Array.from({ length: 4 }, (_, index) => (
                    <div className="metric-card metric-skeleton" key={index}>
                      <span className="skeleton skeleton-title" />
                      <span className="skeleton skeleton-value" />
                      <span className="skeleton skeleton-detail" />
                    </div>
                  ))
                : metrics.map((metric) => {
                    const Icon = metric.icon
                    return (
                      <article className="metric-card" key={metric.label}>
                        <div className="metric-topline">
                          <span className="metric-label">{metric.label}</span>
                          <span className={`metric-icon ${metric.tone}`}>
                            <Icon size={20} aria-hidden="true" />
                          </span>
                        </div>
                        <strong className="metric-value">{metric.value}</strong>
                        <span className="metric-detail">{metric.detail}</span>
                      </article>
                    )
                  })}
            </div>
          )}

          <div className="dashboard-note">
            <span className="note-icon">
              <Activity size={18} aria-hidden="true" />
            </span>
            <p>
              Số liệu hiển thị theo ngày hiện tại và thời gian Việt Nam
              (UTC+07:00).
            </p>
          </div>
        </section>
    </AdminLayout>
  )
}
