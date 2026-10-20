import { useState, type FormEvent } from 'react'
import { ArrowRight, Eye, EyeOff, LockKeyhole, Phone } from 'lucide-react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { getErrorMessage } from '../../../utils/get-error-message'

interface LoginLocationState {
  from?: string
}

export function LoginPage() {
  const { token, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (token) {
    return <Navigate to="/dashboard" replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await signIn({ phoneNumber: phoneNumber.trim(), password })
      const state = location.state as LoginLocationState | null
      const destination =
        state?.from?.startsWith('/') && !state.from.startsWith('//')
          ? state.from
          : '/dashboard'
      navigate(destination, { replace: true })
    } catch (loginError) {
      setError(getErrorMessage(loginError, 'Đăng nhập không thành công.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-story" aria-label="Giới thiệu GoAnywhere">
        <a className="brand brand-light" href="/login" aria-label="GoAnywhere">
          <span className="brand-mark" aria-hidden="true">
            GA
          </span>
          <span>
            <strong>GoAnywhere</strong>
            <small>Điều hành thông minh</small>
          </span>
        </a>

        <div className="login-story-copy">
          <span className="eyebrow">CỔNG ĐIỀU HÀNH</span>
          <h1>Mọi chuyến đi, trong tầm kiểm soát.</h1>
          <p>
            Không gian làm việc dành cho quản trị viên và điều phối viên
            GoAnywhere.
          </p>
        </div>

        <div className="story-route" aria-hidden="true">
          <span className="route-dot" />
          <span className="route-line" />
          <span className="route-pin">↗</span>
          <span className="route-caption">Kết nối hành trình</span>
        </div>
        <span className="story-footer">GOANYWHERE · DI CHUYỂN CÙNG NHAU</span>
      </section>

      <section className="login-panel">
        <div className="login-card">
          <a className="brand brand-mobile" href="/login" aria-label="GoAnywhere">
            <span className="brand-mark" aria-hidden="true">
              GA
            </span>
            <span>
              <strong>GoAnywhere</strong>
              <small>Điều hành thông minh</small>
            </span>
          </a>
          <div className="login-heading">
            <span className="eyebrow">XIN CHÀO</span>
            <h2>Đăng nhập quản trị</h2>
            <p>Nhập thông tin tài khoản để tiếp tục.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="phoneNumber">Số điện thoại</label>
            <div className="input-wrap">
              <Phone size={18} aria-hidden="true" />
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                autoComplete="username"
                placeholder="Nhập số điện thoại"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                required
              />
            </div>

            <label htmlFor="password">Mật khẩu</label>
            <div className="input-wrap">
              <LockKeyhole size={18} aria-hidden="true" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                className="icon-button password-toggle"
                type="button"
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                onClick={() => setShowPassword((visible) => !visible)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <button className="primary-button login-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang xác thực…' : 'Đăng nhập'}
              {!isSubmitting && <ArrowRight size={18} aria-hidden="true" />}
            </button>
          </form>

          <p className="login-security">
            <LockKeyhole size={14} aria-hidden="true" />
            Phiên đăng nhập được bảo vệ
          </p>
        </div>
        <span className="login-copyright">© GoAnywhere · Nền tảng điều phối</span>
      </section>
    </main>
  )
}
