import { useState } from 'react'
import { isValidPhone } from '@/utils/validation'

interface ContactFields { fullName: string; phone: string; email: string; message: string }
type ContactErrors = Partial<Record<keyof ContactFields, string>>

export function useContactPreview() {
  const [fields, setFields] = useState<ContactFields>({ fullName: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState<ContactErrors>({})
  const [preview, setPreview] = useState(false)
  function updateField(key: keyof ContactFields, value: string) {
    setFields(previous => ({ ...previous, [key]: value }))
    setErrors(previous => ({ ...previous, [key]: undefined }))
    setPreview(false)
  }
  function previewRequest() {
    const next: ContactErrors = {}
    if (fields.fullName.trim().length < 2) next.fullName = 'Vui lòng nhập họ tên từ 2 ký tự.'
    if (!isValidPhone(fields.phone)) next.phone = 'Vui lòng nhập số điện thoại Việt Nam hợp lệ gồm 10 số.'
    if (fields.message.trim().length < 10) next.message = 'Vui lòng mô tả nhu cầu ít nhất 10 ký tự.'
    setErrors(next)
    setPreview(Object.keys(next).length === 0)
  }
  return { fields, errors, preview, updateField, previewRequest }
}
