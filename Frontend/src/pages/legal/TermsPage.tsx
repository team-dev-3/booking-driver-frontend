import MainLayout from '@/components/layout/MainLayout'

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="container" style={{ paddingBlock: 'var(--space-12)', maxWidth: '800px' }}>
        <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-2)' }}>
          Điều khoản sử dụng
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-8)' }}>
          Cập nhật lần cuối: 15/10/2026
        </p>
        <div style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
          <p>
            Nội dung điều khoản sử dụng chính thức đang được soạn thảo và sẽ được xác nhận
            bởi bộ phận pháp lý trước khi công bố.
          </p>
        </div>
      </div>
    </MainLayout>
  )
}

