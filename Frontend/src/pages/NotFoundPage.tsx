import MainLayout from '@/components/layout/MainLayout'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <MainLayout>
      <div className="container" style={{ paddingBlock: 'var(--space-24)', textAlign: 'center' }}>
        <p style={{ fontSize: '6rem', marginBottom: 'var(--space-4)' }}>🚗</p>
        <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-4)' }}>
          404 — Không tìm thấy trang
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)', fontSize: 'var(--font-size-lg)' }}>
          Trang bạn tìm không tồn tại hoặc đã bị di chuyển.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: 'var(--touch-target)',
            padding: 'var(--space-3) var(--space-8)',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-text-inverse)',
            borderRadius: 'var(--radius-full)',
            fontWeight: 'var(--font-weight-semibold)',
          }}
        >
          Về trang chủ
        </Link>
      </div>
    </MainLayout>
  )
}

