import { Link } from 'react-router-dom'
import styles from './Brand.module.css'

export default function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className={`${styles.brand} ${compact ? styles.compact : ''}`} aria-label="GOMOVE — Trang chủ">
      <picture>
        {!compact && <source media="(min-width: 640px)" srcSet="/images/brand/gomove-wordmark.png" />}
        <img src="/images/brand/gomove-symbol.png" width="438" height="470" alt="GOMOVE" />
      </picture>
    </Link>
  )
}
