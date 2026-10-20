import { http } from '../../../lib/http'
import type {
  AdminCredentials,
  AdminLoginResponse,
  ApiResponse,
  ApiResult,
  BookingDetail,
  BookingListItem,
  BookingListQuery,
  BookingListResult,
  CancelBookingRequest,
  CancelBookingResult,
  DashboardOverview,
} from '../types/admin.types'

export async function loginAdmin(
  credentials: AdminCredentials,
): Promise<string> {
  const { data } = await http.post<AdminLoginResponse>(
    '/admin/account/login',
    credentials,
  )

  if (!data.success) {
    throw new Error(data.message)
  }

  if (typeof data.token !== 'string' || !data.token.trim()) {
    throw new Error('Máy chủ không trả về token đăng nhập.')
  }

  return data.token
}

export async function logoutAdmin(token: string): Promise<void> {
  const { data } = await http.post<ApiResult>(
    '/auth/logout',
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  )

  if (!data.success) {
    throw new Error(data.message)
  }
}

export async function getDashboardOverview(
  token: string,
): Promise<DashboardOverview> {
  const { data } = await http.get<ApiResponse<DashboardOverview>>(
    '/admin/dashboard/overview',
    { headers: { Authorization: `Bearer ${token}` } },
  )

  if (!data.success) {
    throw new Error(data.message)
  }

  if (!data.data || typeof data.data !== 'object') {
    throw new Error('Dữ liệu tổng quan từ máy chủ không hợp lệ.')
  }

  const metrics = [
    data.data.tripsToday,
    data.data.vehiclesInUse,
    data.data.driversOnline,
    data.data.revenueTodayVnd,
  ]
  if (
    metrics.some(
      (value) => typeof value !== 'number' || !Number.isFinite(value) || value < 0,
    )
  ) {
    throw new Error('Dữ liệu tổng quan từ máy chủ không hợp lệ.')
  }

  return data.data
}

function isBookingStatus(value: unknown): value is BookingListItem['status'] {
  return (
    typeof value === 'string' &&
    [
      'PENDING_PAYMENT',
      'FINDING_DRIVER',
      'DRIVER_ASSIGNED',
      'IN_PROGRESS',
      'COMPLETED',
      'CANCELLED',
      'NO_SHOW',
    ].includes(value)
  )
}

function isBookingListItem(value: unknown): value is BookingListItem {
  if (!value || typeof value !== 'object') {
    return false
  }

  const item = value as Record<string, unknown>
  return (
    typeof item.id === 'number' &&
    Number.isSafeInteger(item.id) &&
    typeof item.bookingCode === 'string' &&
    typeof item.passengerName === 'string' &&
    typeof item.passengerPhone === 'string' &&
    typeof item.routeName === 'string' &&
    typeof item.departureTime === 'string' &&
    typeof item.seatCount === 'number' &&
    Number.isFinite(item.seatCount) &&
    typeof item.totalFare === 'number' &&
    Number.isFinite(item.totalFare) &&
    isBookingStatus(item.status) &&
    typeof item.createdByAdmin === 'boolean'
  )
}

function isPaymentMethod(
  value: unknown,
): value is BookingDetail['paymentMethod'] {
  return (
    value === 'APP_ONLINE' ||
    value === 'CASH' ||
    value === 'DRIVER_TRANSFER'
  )
}

function isPaymentStatus(
  value: unknown,
): value is BookingDetail['paymentStatus'] {
  return (
    value === 'PENDING' ||
    value === 'SUCCESS' ||
    value === 'FAILED' ||
    value === 'REFUNDED' ||
    value === 'PARTIALLY_REFUNDED'
  )
}

export async function getBookings(
  token: string,
  query: BookingListQuery,
): Promise<BookingListResult> {
  const { data } = await http.get<ApiResponse<BookingListResult>>(
    '/admin/booking/list',
    {
      params: query,
      headers: { Authorization: `Bearer ${token}` },
    },
  )

  if (!data.success) {
    throw new Error(data.message)
  }

  const result = data.data
  if (
    !result ||
    !Array.isArray(result.items) ||
    !result.items.every(isBookingListItem) ||
    !Number.isInteger(result.total) ||
    result.total < 0 ||
    !Number.isInteger(result.totalPages) ||
    result.totalPages < 0
  ) {
    throw new Error('Danh sách đơn đặt xe từ máy chủ không hợp lệ.')
  }

  return result
}

export async function getBookingDetail(
  token: string,
  id: number,
): Promise<BookingDetail> {
  const { data } = await http.get<ApiResponse<BookingDetail>>(
    `/admin/booking/detail/${id}`,
    { headers: { Authorization: `Bearer ${token}` } },
  )

  if (!data.success) {
    throw new Error(data.message)
  }

  const detail = data.data
  if (
    !detail ||
    detail.id !== id ||
    !Number.isSafeInteger(detail.id) ||
    typeof detail.passengerName !== 'string' ||
    typeof detail.passengerPhone !== 'string' ||
    typeof detail.pickupAddress !== 'string' ||
    typeof detail.dropoffAddress !== 'string' ||
    typeof detail.serviceType !== 'string' ||
    [
      detail.seatCount,
      detail.baseFare,
      detail.fee7Seater,
      detail.feeHighway,
      detail.feeCoastal,
      detail.totalFare,
      detail.roomPoints,
    ].some(
      (value) =>
        typeof value !== 'number' || !Number.isFinite(value) || value < 0,
    ) ||
    !Number.isInteger(detail.seatCount) ||
    detail.seatCount < 1 ||
    !isPaymentMethod(detail.paymentMethod) ||
    !isPaymentStatus(detail.paymentStatus) ||
    !isBookingStatus(detail.status) ||
    (detail.driver !== null &&
      (!detail.driver ||
        typeof detail.driver !== 'object' ||
        !Number.isSafeInteger(detail.driver.id) ||
        typeof detail.driver.fullName !== 'string' ||
        typeof detail.driver.phone !== 'string' ||
        typeof detail.driver.licensePlate !== 'string'))
  ) {
    throw new Error('Chi tiết đơn đặt xe từ máy chủ không hợp lệ.')
  }

  return detail
}

export async function cancelBooking(
  token: string,
  id: number,
  request: CancelBookingRequest,
): Promise<CancelBookingResult> {
  const { data } = await http.patch<ApiResponse<CancelBookingResult>>(
    `/admin/booking/cancel/${id}`,
    request,
    { headers: { Authorization: `Bearer ${token}` } },
  )

  if (!data.success) {
    throw new Error(data.message)
  }

  if (
    !data.data ||
    data.data.id !== id ||
    data.data.status !== 'CANCELLED' ||
    typeof data.data.cancellationFee !== 'number' ||
    !Number.isFinite(data.data.cancellationFee) ||
    data.data.cancellationFee < 0
  ) {
    throw new Error('Kết quả hủy đơn từ máy chủ không hợp lệ.')
  }

  return data.data
}
