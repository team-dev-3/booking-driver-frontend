import { useEffect, useState, type FormEvent } from 'react'
import {
  ArrowLeft,
  MapPin,
  Phone,
  UserRound,
  WalletCards,
} from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AdminLayout } from '../components/AdminLayout'
import { cancelBooking, getBookingDetail } from '../api/admin.api'
import type {
  BookingDetail,
  BookingPaymentMethod,
  BookingPaymentStatus,
  BookingStatus,
} from '../types/admin.types'
import { useAuth } from '../../../context/AuthContext'
import { getErrorMessage } from '../../../utils/get-error-message'

type DetailState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: BookingDetail }

const statusLabels: Record<BookingStatus, string> = {
  PENDING_PAYMENT: 'Chờ thanh toán',
  FINDING_DRIVER: 'Đang tìm tài xế',
  DRIVER_ASSIGNED: 'Đã có tài xế',
  IN_PROGRESS: 'Đang thực hiện',
  COMPLETED: 'Hoàn thành',
  CANCELLED: 'Đã hủy',
  NO_SHOW: 'Khách vắng mặt',
}

const paymentStatusLabels: Record<BookingPaymentStatus, string> = {
  PENDING: 'Chờ thanh toán',
  SUCCESS: 'Đã thanh toán',
  FAILED: 'Thanh toán thất bại',
  REFUNDED: 'Đã hoàn tiền',
  PARTIALLY_REFUNDED: 'Đã hoàn một phần',
}

const paymentMethodLabels: Record<BookingPaymentMethod, string> = {
  APP_ONLINE: 'Thanh toán trực tuyến',
  CASH: 'Tiền mặt',
  DRIVER_TRANSFER: 'Chuyển khoản tài xế',
}

const serviceLabels: Record<string, string> = {
  SHARED_RIDE: 'Đi ghép',
  CHARTER_ONE_WAY: 'Bao xe một chiều',
  CHARTER_ROUND_TRIP: 'Bao xe hai chiều',
  CHARTER_TIME_8H: 'Bao xe theo giờ (8 giờ)',
  CHARTER_TIME_12H: 'Bao xe theo giờ (12 giờ)',
  PARCEL: 'Gửi hàng',
}

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
})

function isTerminalStatus(status: BookingStatus): boolean {
  return status === 'COMPLETED' || status === 'CANCELLED' || status === 'NO_SHOW'
}

function getStatusClass(status: BookingStatus): string {
  if (status === 'COMPLETED') {
    return 'status-completed'
  }
  if (status === 'CANCELLED' || status === 'NO_SHOW') {
    return 'status-cancelled'
  }
  if (status === 'IN_PROGRESS') {
    return 'status-progress'
  }
  if (status === 'PENDING_PAYMENT') {
    return 'status-pending'
  }
  return 'status-active'
}

export function BookingDetailPage() {
  const { id: idParam } = useParams()
  const id = Number(idParam)
  const { token } = useAuth()
  const navigate = useNavigate()
  const [detailState, setDetailState] = useState<DetailState>({
    status: 'loading',
  })
  const [showCancelForm, setShowCancelForm] = useState(false)
  const [cancelReason, setCancelReason] = useState('')
  const [isDriverFault, setIsDriverFault] = useState('')
  const [isCancelling, setIsCancelling] = useState(false)
  const [cancelError, setCancelError] = useState('')

  useEffect(() => {
    if (!token) {
      return
    }

    if (!Number.isSafeInteger(id) || id <= 0) {
      setDetailState({
        status: 'error',
        message: 'Mã đơn đặt xe không hợp lệ.',
      })
      return
    }

    let isCurrent = true
    setDetailState({ status: 'loading' })

    getBookingDetail(token, id)
      .then((data) => {
        if (isCurrent) {
          setDetailState({ status: 'success', data })
        }
      })
      .catch((error: unknown) => {
        if (isCurrent) {
          setDetailState({
            status: 'error',
            message: getErrorMessage(error, 'Không thể tải chi tiết đơn đặt xe.'),
          })
        }
      })

    return () => {
      isCurrent = false
    }
  }, [token, id])

  async function handleCancel(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!token) {
      return
    }

    if (!cancelReason.trim()) {
      setCancelError('Vui lòng nhập lý do hủy đơn.')
      return
    }
    if (isDriverFault === '') {
      setCancelError('Vui lòng xác nhận đơn có phải lỗi của tài xế hay không.')
      return
    }

    setIsCancelling(true)
    setCancelError('')
    try {
      const result = await cancelBooking(token, id, {
        cancelReason: cancelReason.trim(),
        isDriverFault: isDriverFault === 'yes',
      })
      navigate('/bookings', {
        replace: true,
        state: {
          notice: `Đã hủy đơn. Phí hủy: ${currencyFormatter.format(result.cancellationFee)}.`,
        },
      })
    } catch (error: unknown) {
      setCancelError(getErrorMessage(error, 'Không thể hủy đơn đặt xe.'))
    } finally {
      setIsCancelling(false)
    }
  }

  return (
    <AdminLayout pageTitle="Chi tiết đơn đặt xe">
      <section className="dashboard-content booking-content">
        <Link className="back-link" to="/bookings">
          <ArrowLeft size={16} aria-hidden="true" />
          Quay lại danh sách
        </Link>

        {detailState.status === 'loading' ? (
          <div className="booking-state-card detail-loading" role="status">
            <span className="booking-loading-indicator" />
            Đang tải chi tiết đơn đặt xe…
          </div>
        ) : detailState.status === 'error' ? (
          <div className="booking-state-card booking-state-error" role="alert">
            <div>
              <h2>Không thể tải chi tiết đơn</h2>
              <p>{detailState.message}</p>
            </div>
            <button
              className="secondary-button"
              type="button"
              onClick={() => navigate('/bookings')}
            >
              Về danh sách
            </button>
          </div>
        ) : (
          <BookingDetails
            detail={detailState.data}
            showCancelForm={showCancelForm}
            cancelReason={cancelReason}
            isDriverFault={isDriverFault}
            isCancelling={isCancelling}
            cancelError={cancelError}
            onToggleCancel={() => {
              setShowCancelForm((showing) => !showing)
              setCancelError('')
            }}
            onCancelReasonChange={setCancelReason}
            onDriverFaultChange={setIsDriverFault}
            onCancel={handleCancel}
          />
        )}
      </section>
    </AdminLayout>
  )
}

interface BookingDetailsProps {
  detail: BookingDetail
  showCancelForm: boolean
  cancelReason: string
  isDriverFault: string
  isCancelling: boolean
  cancelError: string
  onToggleCancel: () => void
  onCancelReasonChange: (reason: string) => void
  onDriverFaultChange: (value: string) => void
  onCancel: (event: FormEvent<HTMLFormElement>) => void
}

function BookingDetails({
  detail,
  showCancelForm,
  cancelReason,
  isDriverFault,
  isCancelling,
  cancelError,
  onToggleCancel,
  onCancelReasonChange,
  onDriverFaultChange,
  onCancel,
}: BookingDetailsProps) {
  const canCancel = !isTerminalStatus(detail.status)

  return (
    <>
      <div className="page-heading booking-detail-heading">
        <div>
          <span className="eyebrow">QUẢN LÝ ĐẶT XE</span>
          <h1>Chi tiết đơn #{detail.id}</h1>
          <p>Xem thông tin hành khách, lộ trình và thanh toán.</p>
        </div>
        <span className={`status-badge detail-status ${getStatusClass(detail.status)}`}>
          {statusLabels[detail.status]}
        </span>
      </div>

      <div className="booking-detail-grid">
        <section className="booking-panel passenger-panel">
          <div className="booking-panel-heading">
            <span className="booking-panel-icon">
              <UserRound size={18} aria-hidden="true" />
            </span>
            <div>
              <h2>Thông tin hành khách</h2>
              <p>Thông tin người đi trên đơn này</p>
            </div>
          </div>
          <dl className="booking-info-list">
            <div>
              <dt>Họ và tên</dt>
              <dd>{detail.passengerName}</dd>
            </div>
            <div>
              <dt>Số điện thoại</dt>
              <dd className="booking-contact">
                <Phone size={14} aria-hidden="true" />
                <a href={`tel:${detail.passengerPhone}`}>{detail.passengerPhone}</a>
              </dd>
            </div>
            <div>
              <dt>Loại dịch vụ</dt>
              <dd>{serviceLabels[detail.serviceType] ?? detail.serviceType}</dd>
            </div>
            <div>
              <dt>Số ghế</dt>
              <dd>{detail.seatCount}</dd>
            </div>
          </dl>
        </section>

        <section className="booking-panel journey-panel">
          <div className="booking-panel-heading">
            <span className="booking-panel-icon">
              <MapPin size={18} aria-hidden="true" />
            </span>
            <div>
              <h2>Thông tin hành trình</h2>
              <p>Điểm đón và điểm trả theo đơn đặt xe</p>
            </div>
          </div>
          <div className="journey-address">
            <span className="journey-marker pickup-marker" aria-hidden="true" />
            <div>
              <span>ĐIỂM ĐÓN</span>
              <strong>{detail.pickupAddress}</strong>
            </div>
          </div>
          <div className="journey-connector" aria-hidden="true" />
          <div className="journey-address">
            <span className="journey-marker dropoff-marker" aria-hidden="true" />
            <div>
              <span>ĐIỂM TRẢ</span>
              <strong>{detail.dropoffAddress}</strong>
            </div>
          </div>
        </section>

        <section className="booking-panel payment-panel">
          <div className="booking-panel-heading">
            <span className="booking-panel-icon">
              <WalletCards size={18} aria-hidden="true" />
            </span>
            <div>
              <h2>Thanh toán</h2>
              <p>Chi tiết giá và trạng thái thanh toán</p>
            </div>
          </div>
          <dl className="booking-info-list">
            <div>
              <dt>Phương thức</dt>
              <dd>{paymentMethodLabels[detail.paymentMethod]}</dd>
            </div>
            <div>
              <dt>Trạng thái</dt>
              <dd>{paymentStatusLabels[detail.paymentStatus]}</dd>
            </div>
            <div>
              <dt>Giá cơ bản</dt>
              <dd>{currencyFormatter.format(detail.baseFare)}</dd>
            </div>
            <div>
              <dt>Phụ thu xe 7 chỗ</dt>
              <dd>{currencyFormatter.format(detail.fee7Seater)}</dd>
            </div>
            <div>
              <dt>Phụ thu cao tốc</dt>
              <dd>{currencyFormatter.format(detail.feeHighway)}</dd>
            </div>
            <div>
              <dt>Phụ thu ven biển</dt>
              <dd>{currencyFormatter.format(detail.feeCoastal)}</dd>
            </div>
            <div className="booking-total-row">
              <dt>Tổng cộng</dt>
              <dd>{currencyFormatter.format(detail.totalFare)}</dd>
            </div>
            <div>
              <dt>Điểm sàn</dt>
              <dd>{detail.roomPoints.toLocaleString('vi-VN')}</dd>
            </div>
          </dl>
        </section>

        <section className="booking-panel driver-panel">
          <div className="booking-panel-heading">
            <span className="booking-panel-icon">
              <UserRound size={18} aria-hidden="true" />
            </span>
            <div>
              <h2>Tài xế phụ trách</h2>
              <p>Thông tin tài xế được gán cho đơn</p>
            </div>
          </div>
          {detail.driver ? (
            <dl className="booking-info-list">
              <div>
                <dt>Họ và tên</dt>
                <dd>{detail.driver.fullName}</dd>
              </div>
              <div>
                <dt>Số điện thoại</dt>
                <dd>
                  <a href={`tel:${detail.driver.phone}`}>{detail.driver.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Biển số xe</dt>
                <dd>{detail.driver.licensePlate}</dd>
              </div>
            </dl>
          ) : (
            <p className="booking-no-driver">Chưa có tài xế được gán.</p>
          )}
        </section>
      </div>

      {canCancel ? (
        <section className="booking-action-panel">
          <div>
            <h2>Thao tác đơn đặt xe</h2>
            <p>Hủy đơn sẽ được xác nhận và tính phí bởi máy chủ.</p>
          </div>
          {!showCancelForm ? (
            <button
              className="danger-button"
              type="button"
              onClick={onToggleCancel}
            >
              Hủy đơn đặt xe
            </button>
          ) : (
            <form className="cancel-booking-form" onSubmit={onCancel}>
              <div className="filter-field">
                <label htmlFor="cancelReason">Lý do hủy</label>
                <textarea
                  id="cancelReason"
                  value={cancelReason}
                  onChange={(event) => onCancelReasonChange(event.target.value)}
                  maxLength={500}
                  required
                  rows={3}
                  placeholder="Nhập lý do hủy đơn"
                />
              </div>
              <div className="filter-field">
                <label htmlFor="driverFault">Có phải lỗi của tài xế?</label>
                <select
                  id="driverFault"
                  value={isDriverFault}
                  onChange={(event) => onDriverFaultChange(event.target.value)}
                  required
                >
                  <option value="">Chọn câu trả lời</option>
                  <option value="no">Không</option>
                  <option value="yes">Có</option>
                </select>
              </div>
              {cancelError && (
                <p className="form-error cancel-form-error" role="alert">
                  {cancelError}
                </p>
              )}
              <div className="filter-actions">
                <button className="danger-button" type="submit" disabled={isCancelling}>
                  {isCancelling ? 'Đang hủy…' : 'Xác nhận hủy đơn'}
                </button>
                <button
                  className="secondary-button"
                  type="button"
                  onClick={onToggleCancel}
                  disabled={isCancelling}
                >
                  Giữ đơn
                </button>
              </div>
            </form>
          )}
        </section>
      ) : (
        <p className="booking-terminal-note">
          Đơn đã kết thúc; không thể thực hiện thao tác hủy.
        </p>
      )}
    </>
  )
}
