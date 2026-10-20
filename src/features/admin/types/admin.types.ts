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
      message: string
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
