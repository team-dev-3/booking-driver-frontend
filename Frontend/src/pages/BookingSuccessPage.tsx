import MainLayout from '@/components/layout/MainLayout'

export default function BookingSuccessPage() {
  return (
    <MainLayout>
      <div className="container" style={{ paddingBlock: 'var(--space-12)', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>✅</div>
        <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-4)' }}>
          Đặt xe thành công!
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Chúng tôi đã nhận được yêu cầu của bạn. Tài xế sẽ liên hệ sớm nhất.
        </p>
      </div>
    </MainLayout>
  )
}

