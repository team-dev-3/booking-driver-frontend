import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { validateSearchForm } from '@/utils/validation'

export interface TripSearchOptions {
  initialFrom?: string
  initialTo?: string
  initialService?: 'shared' | 'private'
}

export function useTripSearch({
  initialFrom,
  initialTo,
  initialService = 'shared',
}: TripSearchOptions) {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [form, setForm] = useState(() => ({
    from: initialFrom ?? params.get('from') ?? '',
    to: initialTo ?? params.get('to') ?? '',
    date: params.get('date') ?? '',
    time: params.get('time') ?? '',
    service: params.get('service') === 'private' ? 'private' : initialService,
    seats: params.get('seats') ?? '1',
    vehicle: params.get('vehicle') ?? '4',
    direction: params.get('direction') === 'roundtrip' ? 'roundtrip' : 'oneway',
    returnDate: params.get('returnDate') ?? '',
    vat: params.get('vat') === 'yes' ? 'yes' : 'no',
  }))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function change(field: keyof typeof form, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
      ...(field === 'vehicle' && Number(previous.seats) >= Number(value)
        ? { seats: '1' }
        : {}),
    }))
    setErrors((previous) => ({
      ...previous,
      [field]: '',
      ...(field === 'date' ? { time: '' } : {}),
    }))
  }

  function clearError(field: string) {
    setErrors((previous) => ({ ...previous, [field]: '' }))
  }

  function submit(
    event: FormEvent<HTMLFormElement>,
    additionalErrors: Record<string, string> = {},
  ) {
    event.preventDefault()
    if (isSubmitting) return
    const nextErrors: Record<string, string> = { ...additionalErrors }
    for (const [field, result] of Object.entries(validateSearchForm(form))) {
      if (!result.valid && result.message) nextErrors[field] = result.message
    }
    if (
      form.direction === 'roundtrip' &&
      (!form.returnDate || form.returnDate < form.date)
    ) {
      nextErrors.returnDate = 'Ngày về phải từ ngày đi trở đi'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      const targetForm = event.currentTarget
      requestAnimationFrame(() =>
        targetForm.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      )
      return
    }
    setIsSubmitting(true)
    const query = new URLSearchParams({
      ...form,
      from: form.from.trim(),
      to: form.to.trim(),
    }).toString()
    // Lưu hành trình vào mục lịch sử hiện tại để nút Quay lại giữ form.
    navigate(
      { search: `?${query}`, hash: window.location.hash },
      { replace: true },
    )
    navigate(`/tim-xe?${query}`)
  }
  return { form, errors, isSubmitting, change, clearError, submit }
}
