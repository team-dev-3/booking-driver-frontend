/**
 * Validation utilities — BookingCar
 * FE validation phục vụ trải nghiệm người dùng.
 * Backend PHẢI xác thực lại tất cả dữ liệu.
 */

import { isValidTravelDate } from './date'

export function isValidPhone(phone: string): boolean {
  // Số điện thoại Việt Nam: 10 chữ số, bắt đầu bằng 0
  return /^0[3-9]\d{8}$/.test(phone.replace(/\s/g, ''))
}

export function isValidDate(dateStr: string): boolean {
  return isValidTravelDate(dateStr)
}

export function isValidTime(timeStr: string): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(timeStr)
}

export type ValidationResult = {
  valid: boolean
  message?: string
}

export function validateSearchForm(data: {
  from: string
  to: string
  date: string
  time: string
}): Record<string, ValidationResult> {
  return {
    from: {
      valid: data.from.trim().length >= 2,
      message:
        data.from.trim().length < 2 ? 'Vui lòng nhập điểm đón' : undefined,
    },
    to: {
      valid:
        data.to.trim().length >= 2 &&
        data.to.trim().toLocaleLowerCase('vi') !==
          data.from.trim().toLocaleLowerCase('vi'),
      message:
        data.to.trim().length < 2
          ? 'Vui lòng nhập điểm đến'
          : data.to.trim().toLocaleLowerCase('vi') ===
              data.from.trim().toLocaleLowerCase('vi')
            ? 'Điểm đến phải khác điểm đón'
            : undefined,
    },
    date: {
      valid: isValidDate(data.date),
      message: !isValidDate(data.date)
        ? 'Ngày đi phải từ hôm nay trở đi'
        : undefined,
    },
    time: {
      valid:
        isValidTime(data.time) &&
        new Date(`${data.date}T${data.time}:00+07:00`).getTime() > Date.now(),
      message: !isValidTime(data.time)
        ? 'Vui lòng chọn giờ đi'
        : new Date(`${data.date}T${data.time}:00+07:00`).getTime() <= Date.now()
          ? 'Giờ khởi hành phải ở tương lai'
          : undefined,
    },
  }
}

