import { useState, type ReactNode } from 'react'
import { LayoutDashboard, LogOut, Ticket } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { getErrorMessage } from '../../../utils/get-error-message'

interface AdminLayoutProps {
  pageTitle: string
  children: ReactNode
}

const dateFormatter = new Intl.DateTimeFormat('vi-VN', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Ho_Chi_Minh',
})

export function AdminLayout({ pageTitle, children }: AdminLayoutProps) {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const [logoutError, setLogoutError] = useState('')
  const [isSigningOut, setIsSigningOut] = useState(false)

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

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <NavLink className="brand sidebar-brand" to="/dashboard">
          <span className="brand-mark" aria-hidden="true">
            GA
          </span>
          <span>
            <strong>GoAnywhere</strong>
            <small>ADMIN PORTAL</small>
          </span>
        </NavLink>

        <div className="sidebar-label">KHÔNG GIAN LÀM VIỆC</div>
        <nav className="admin-navigation" aria-label="Điều hướng quản trị">
          <NavLink
            className={({ isActive }) =>
              `sidebar-link${isActive ? ' active' : ''}`
            }
            to="/dashboard"
          >
            <LayoutDashboard size={19} aria-hidden="true" />
            <span>Tổng quan</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `sidebar-link${isActive ? ' active' : ''}`
            }
            to="/bookings"
          >
            <Ticket size={19} aria-hidden="true" />
            <span>Đơn đặt xe</span>
          </NavLink>
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
            <strong>{pageTitle}</strong>
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

        {logoutError && (
          <div className="inline-alert layout-alert" role="alert">
            {logoutError}
          </div>
        )}

        {children}
      </main>
    </div>
  )
}
