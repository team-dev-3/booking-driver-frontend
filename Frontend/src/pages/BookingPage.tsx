import MainLayout from '@/components/layout/MainLayout'

export default function BookingPage() {
  return (
    <MainLayout>
      <div className="container" style={{ paddingBlock: 'var(--space-12)' }}>
        <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)' }}>
          Nhập thông tin hành khách
        </h1>
      </div>
    </MainLayout>
  )
}

