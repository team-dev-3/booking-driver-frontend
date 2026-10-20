import { useEffect, useState, type FormEvent } from 'react'
import { ArrowLeft, ArrowRight, Eye, Filter, Search } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { AdminLayout } from '../components/AdminLayout'
import { getBookings } from '../api/admin.api'
import type {
  BookingListItem,
  BookingListQuery,
  BookingListResult,
  BookingStatus,
} from '../types/admin.types'
import { useAuth } from '../../../context/AuthContext'
import { getErrorMessage } from '../../../utils/get-error-message'

interface BookingFilters {
  bookingCode: string
  phone: string
  status: BookingStatus | ''
  routeName: string
  departureDate: string
  departureTime: string
}

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: BookingListResult }

const emptyFilters: BookingFilters = {
  bookingCode: '',
  phone: '',
  status: '',
  routeName: '',
  departureDate: '',
  departureTime: '',
}

const statusLabels: Record<BookingStatus, string> = {
  PENDING_PAYMENT: 'Chờ thanh toán',
  FINDING_DRIVER: 'Đang tìm tài xế',
  DRIVER_ASSIGNED: 'Đã có tài xế',
  IN_PROGRESS: 'Đang thực hiện',
  COMPLETED: 'Hoàn thành',
  CANCELLED: 'Đã hủy',
  NO_SHOW: 'Khách vắng mặt',
}

const dateFormatter = new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Asia/Ho_Chi_Minh',
})

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
})

function formatDepartureTime(value: string): string {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'Chưa có thời gian' : dateFormatter.format(date)
}

function getStatusClass(status: BookingStatus): string {
  switch (status) {
    case 'COMPLETED':
      return 'status-completed'
    case 'CANCELLED':
    case 'NO_SHOW':
      return 'status-cancelled'
    case 'IN_PROGRESS':
      return 'status-progress'
    case 'PENDING_PAYMENT':
      return 'status-pending'
    default:
      return 'status-active'
  }
}

function BookingTable({ items }: { items: BookingListItem[] }) {
  return (
    <div className="booking-table-wrap">
      <table className="booking-table">
        <thead>
          <tr>
            <th scope="col">Mã đơn</th>
            <th scope="col">Khách hàng</th>
            <th scope="col">Tuyến / giờ khởi hành</th>
            <th scope="col">Số ghế</th>
            <th scope="col">Tổng tiền</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">
              <span className="visually-hidden">Chi tiết</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((booking) => (
            <tr key={booking.id}>
              <td>
                <Link className="booking-code" to={`/bookings/${booking.id}`}>
                  {booking.bookingCode}
                </Link>
                {booking.createdByAdmin && (
                  <span className="booking-origin">Admin đặt hộ</span>
                )}
              </td>
              <td>
                <span className="booking-passenger">{booking.passengerName}</span>
                <span className="booking-phone">{booking.passengerPhone}</span>
              </td>
              <td>
                <span className="booking-route">{booking.routeName}</span>
                <span className="booking-time">
                  {formatDepartureTime(booking.departureTime)}
                </span>
              </td>
              <td>{booking.seatCount}</td>
              <td className="booking-fare">
                {currencyFormatter.format(booking.totalFare)}
              </td>
              <td>
                <span className={`status-badge ${getStatusClass(booking.status)}`}>
                  {statusLabels[booking.status]}
                </span>
              </td>
              <td>
                <Link
                  className="booking-view-link"
                  to={`/bookings/${booking.id}`}
                  aria-label={`Xem đơn ${booking.bookingCode}`}
                  title="Xem chi tiết"
                >
                  <Eye size={17} aria-hidden="true" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function BookingListPage() {
  const { token } = useAuth()
  const location = useLocation()
  const [filters, setFilters] = useState<BookingFilters>(emptyFilters)
  const [appliedFilters, setAppliedFilters] =
    useState<BookingFilters>(emptyFilters)
  const [page, setPage] = useState(1)
  const [reloadKey, setReloadKey] = useState(0)
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    if (!token) {
      return
    }

    let isCurrent = true
    setLoadState({ status: 'loading' })

    const query: BookingListQuery = {
      page,
      limit: 10,
      ...(appliedFilters.bookingCode.trim()
        ? { bookingCode: appliedFilters.bookingCode.trim() }
        : {}),
      ...(appliedFilters.phone.trim()
        ? { phone: appliedFilters.phone.trim() }
        : {}),
      ...(appliedFilters.status ? { status: appliedFilters.status } : {}),
      ...(appliedFilters.routeName.trim()
        ? { routeName: appliedFilters.routeName.trim() }
        : {}),
      ...(appliedFilters.departureDate
        ? { departureDate: appliedFilters.departureDate }
        : {}),
      ...(appliedFilters.departureTime
        ? { departureTime: appliedFilters.departureTime }
        : {}),
    }

    getBookings(token, query)
      .then((data) => {
        if (isCurrent) {
          setLoadState({ status: 'success', data })
        }
      })
      .catch((error: unknown) => {
        if (isCurrent) {
          setLoadState({
            status: 'error',
            message: getErrorMessage(error, 'Không thể tải danh sách đơn đặt xe.'),
          })
        }
      })

    return () => {
      isCurrent = false
    }
  }, [token, appliedFilters, page, reloadKey])

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPage(1)
    setAppliedFilters(filters)
  }

  function handleReset() {
    setFilters(emptyFilters)
    setAppliedFilters(emptyFilters)
    setPage(1)
  }

  const notice =
    (location.state as { notice?: unknown } | null)?.notice

  return (
    <AdminLayout pageTitle="Đơn đặt xe">
      <section className="dashboard-content booking-content">
        <div className="page-heading booking-page-heading">
          <div>
            <span className="eyebrow">QUẢN LÝ ĐẶT XE</span>
            <h1>Danh sách đơn đặt xe</h1>
            <p>Tra cứu và theo dõi các đơn đặt chỗ trong hệ thống.</p>
          </div>
          <button
            className="secondary-button"
            type="button"
            onClick={() => setReloadKey((key) => key + 1)}
            disabled={loadState.status === 'loading'}
          >
            <Filter size={16} aria-hidden="true" />
            Làm mới
          </button>
        </div>

        {typeof notice === 'string' && (
          <div className="booking-success" role="status">
            {notice}
          </div>
        )}

        <form className="booking-filters" onSubmit={handleSearch}>
          <div className="filter-field">
            <label htmlFor="bookingCode">Mã đơn đặt xe</label>
            <input
              id="bookingCode"
              value={filters.bookingCode}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  bookingCode: event.target.value,
                }))
              }
              placeholder="Ví dụ: GA000123"
            />
          </div>
          <div className="filter-field">
            <label htmlFor="bookingPhone">Số điện thoại khách</label>
            <input
              id="bookingPhone"
              inputMode="tel"
              value={filters.phone}
              onChange={(event) =>
                setFilters((current) => ({ ...current, phone: event.target.value }))
              }
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div className="filter-field">
            <label htmlFor="bookingStatus">Trạng thái</label>
            <select
              id="bookingStatus"
              value={filters.status}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  status: event.target.value as BookingStatus | '',
                }))
              }
            >
              <option value="">Tất cả trạng thái</option>
              {Object.entries(statusLabels).map(([status, label]) => (
                <option key={status} value={status}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-field">
            <label htmlFor="bookingRoute">Tuyến xe</label>
            <input
              id="bookingRoute"
              value={filters.routeName}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  routeName: event.target.value,
                }))
              }
              placeholder="Nhập tên tuyến"
            />
          </div>
          <div className="filter-field">
            <label htmlFor="departureDate">Ngày khởi hành</label>
            <input
              id="departureDate"
              type="date"
              value={filters.departureDate}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  departureDate: event.target.value,
                }))
              }
            />
          </div>
          <div className="filter-field">
            <label htmlFor="departureTime">Giờ khởi hành</label>
            <input
              id="departureTime"
              type="time"
              value={filters.departureTime}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  departureTime: event.target.value,
                }))
              }
            />
          </div>
          <div className="filter-actions">
            <button className="primary-button filter-submit" type="submit">
              <Search size={16} aria-hidden="true" />
              Tìm kiếm
            </button>
            <button
              className="secondary-button"
              type="button"
              onClick={handleReset}
            >
              Xóa lọc
            </button>
          </div>
        </form>

        <div className="booking-results-heading">
          <div>
            <h2>Kết quả đặt xe</h2>
            {loadState.status === 'success' && (
              <p>
                {loadState.data.total.toLocaleString('vi-VN')} đơn đặt xe
              </p>
            )}
          </div>
        </div>

        {loadState.status === 'loading' ? (
          <div className="booking-state-card" role="status" aria-live="polite">
            <span className="booking-loading-indicator" />
            Đang tải danh sách đơn đặt xe…
          </div>
        ) : loadState.status === 'error' ? (
          <div className="booking-state-card booking-state-error" role="alert">
            <div>
              <h3>Không thể tải danh sách đơn</h3>
              <p>{loadState.message}</p>
            </div>
            <button
              className="secondary-button"
              type="button"
              onClick={() => setReloadKey((key) => key + 1)}
            >
              Thử lại
            </button>
          </div>
        ) : loadState.data.items.length === 0 ? (
          <div className="booking-state-card booking-empty">
            <span className="booking-empty-icon">
              <Search size={21} aria-hidden="true" />
            </span>
            <h3>Không tìm thấy đơn đặt xe</h3>
            <p>Thử thay đổi bộ lọc để tìm đơn phù hợp.</p>
          </div>
        ) : (
          <>
            <BookingTable items={loadState.data.items} />
            <div className="booking-pagination">
              <span>
                Trang {page} / {Math.max(1, loadState.data.totalPages)}
              </span>
              <div>
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page <= 1}
                >
                  <ArrowLeft size={15} aria-hidden="true" />
                  Trước
                </button>
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => setPage((current) => current + 1)}
                  disabled={page >= loadState.data.totalPages}
                >
                  Sau
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </AdminLayout>
  )
}
