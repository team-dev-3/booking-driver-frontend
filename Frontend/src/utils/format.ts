import { format, parseISO } from 'date-fns'
import { vi } from 'date-fns/locale'

/**
 * Định dạng tiền Việt Nam Đồng
 * VD: 1500000 → "1.500.000 ₫"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(amount)
}

/**
 * Định dạng ngày giờ chuẩn (Asia/Ho_Chi_Minh)
 * VD: "2024-01-15" → "15 tháng 1, 2024"
 */
export function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), 'd MMMM, yyyy', { locale: vi })
  } catch {
    return dateStr
  }
}

/**
 * Định dạng ngày giờ đầy đủ
 */
export function formatDateTime(dateStr: string, timeStr: string): string {
  return `${formatDate(dateStr)} lúc ${timeStr}`
}

