export function getTodayVN(): string {
  return new Date().toLocaleDateString('sv-SE', {
    timeZone: 'Asia/Ho_Chi_Minh',
  })
}

export function isValidTravelDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00+07:00`)
  return (
    !Number.isNaN(date.getTime()) &&
    date.toLocaleDateString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }) ===
      value &&
    value >= getTodayVN()
  )
}
