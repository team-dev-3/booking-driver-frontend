import { http } from '../../../lib/http'
import type {
  AdminCredentials,
  AdminLoginResponse,
  ApiResponse,
  ApiResult,
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
