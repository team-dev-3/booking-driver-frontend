import { useEffect, useState } from 'react'
import {
  Activity,
  CarFront,
  CircleDollarSign,
  LogOut,
  RefreshCw,
  Route,
  UsersRound,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getDashboardOverview } from '../api/admin.api'
import type { DashboardOverview } from '../types/admin.types'
import { useAuth } from '../../../context/AuthContext'
import { getErrorMessage } from '../../../utils/get-error-message'

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: DashboardOverview }

const dateFormatter = new Intl.DateTimeFormat('vi-VN', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Ho_Chi_Minh',
})

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
})

export function DashboardPage() {
  const { token, signOut } = useAuth()
  const navigate = useNavigate()
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' })
  const [reloadKey, setReloadKey] = useState(0)
  const [logoutError, setLogoutError] = useState('')
  const [isSigningOut, setIsSigningOut] = useState(false)

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

  async function handleSignOut() {
    setLogoutError('')
    setIsSigningOut(true)
    try {
      await signOut()
      navigate('/login', { replace: true })
    } catch (error: unknown) {
      setLogoutError(getErrorMessage(error, 'Không thể đăng xuất. Vui lòng thử lại.'))
    } finally {
      setIsSigningOut(false)
    }
  }

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
    <div className="dashboard-layout">
      <aside className="sidebar">
        <a className="brand sidebar-brand" href="/dashboard">
          <span className="brand-mark" aria-hidden="true">
            GA
          </span>
          <span>
            <strong>GoAnywhere</strong>
            <small>ADMIN PORTAL</small>
          </span>
        </a>

        <div className="sidebar-label">KHÔNG GIAN LÀM VIỆC</div>
        <nav aria-label="Điều hướng quản trị">
          <a className="sidebar-link active" href="/dashboard" aria-current="page">
            <Activity size={19} aria-hidden="true" />
            <span>Tổng quan</span>
          </a>
        </nav>

        <div className="sidebar-bottom">
          <span className="sidebar-status-dot" />
          <span>Điều hành GoAnywhere</span>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Quản trị</span>
            <span className="breadcrumb-separator">/</span>
            <strong>Tổng quan</strong>
          </div>
          <div className="topbar-actions">
            <span className="topbar-date">{dateFormatter.format(new Date())}</span>
            <span className="admin-avatar" aria-hidden="true">
              GA
            </span>
            <button
              className="icon-button signout-button"
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              aria-label="Đăng xuất"
              title="Đăng xuất"
            >
              <LogOut size={18} aria-hidden="true" />
            </button>
          </div>
        </header>

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

          {logoutError && (
            <div className="inline-alert" role="alert">
              {logoutError}
            </div>
          )}

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
      </main>
    </div>
  )
}
