import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import FloatingActions from './FloatingActions/FloatingActions'
import styles from './MainLayout.module.css'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
      else window.scrollTo(0, 0)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [pathname, hash])
  return (
    <div id="stitch-page" className={styles.layout}>
      <a className="stitch-skip" href="#main-content">Bỏ qua đến nội dung chính</a>
      <Navbar />
      <main className={styles.main} id="main-content">
        {children}
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
