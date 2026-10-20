import axios from 'axios'

export function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError<{ message?: unknown }>(error)) {
    const message = error.response?.data?.message
    if (typeof message === 'string' && message.trim()) {
      return message
    }

    if (!error.response) {
      return 'Không thể kết nối máy chủ. Vui lòng kiểm tra kết nối và thử lại.'
    }
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}
