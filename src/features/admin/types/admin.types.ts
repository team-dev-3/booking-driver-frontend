export interface AdminCredentials {
  phoneNumber: string
  password: string
}

export type AdminLoginResponse =
  | {
      success: true
      message: string
      token: string
    }
  | {
      success: false
      message: string
    }

export type ApiResult =
  | {
      success: true
      message: string
    }
  | {
      success: false
      message: string
    }

export type ApiResponse<T> =
  | {
      success: true
      message?: string
      data: T
    }
  | {
      success: false
      message: string
    }

export interface DashboardOverview {
  tripsToday: number
  vehiclesInUse: number
  driversOnline: number
  revenueTodayVnd: number
}

export type BookingStatus =
  | 'PENDING_PAYMENT'
  | 'FINDING_DRIVER'
  | 'DRIVER_ASSIGNED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW'

export type BookingPaymentMethod = 'APP_ONLINE' | 'CASH' | 'DRIVER_TRANSFER'

export type BookingPaymentStatus =
  | 'PENDING'
  | 'SUCCESS'
  | 'FAILED'
  | 'REFUNDED'
  | 'PARTIALLY_REFUNDED'

export interface BookingListItem {
  id: number
  bookingCode: string
  passengerName: string
  passengerPhone: string
  routeName: string
  departureTime: string
  seatCount: number
  totalFare: number
  status: BookingStatus
  createdByAdmin: boolean
}

export interface BookingListQuery {
  page: number
  limit: number
  status?: BookingStatus
  bookingCode?: string
  phone?: string
  routeName?: string
  departureDate?: string
  departureTime?: string
}

export interface BookingListResult {
  items: BookingListItem[]
  total: number
  totalPages: number
}

export interface BookingDriver {
  id: number
  fullName: string
  phone: string
  licensePlate: string
}

export interface BookingDetail {
  id: number
  passengerName: string
  passengerPhone: string
  pickupAddress: string
  dropoffAddress: string
  serviceType: string
  seatCount: number
  baseFare: number
  fee7Seater: number
  feeHighway: number
  feeCoastal: number
  totalFare: number
  roomPoints: number
  paymentMethod: BookingPaymentMethod
  paymentStatus: BookingPaymentStatus
  status: BookingStatus
  driver: BookingDriver | null
}

export interface CancelBookingRequest {
  cancelReason: string
  isDriverFault: boolean
}

export interface CancelBookingResult {
  id: number
  status: 'CANCELLED'
  cancellationFee: number
}
