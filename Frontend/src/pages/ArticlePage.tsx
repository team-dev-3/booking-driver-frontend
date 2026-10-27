import { Link, useParams } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import NotFoundPage from './NotFoundPage'
import { articles } from '@/data/home.mock'
import styles from './ArticlePage.module.css'

export default function ArticlePage() {
  const { slug } = useParams()
  const article = articles.find((item) => item.id === slug)
  if (!article) return <NotFoundPage />
  return (
    <MainLayout>
      <title>{`${article.title} | GOMOVE`}</title>
      <meta name="description" content={article.body.slice(0, 150)} />
      <article className={`container ${styles.article}`}>
        <Link to="/tin-tuc" className={styles.mapLink}>
          ← Trở về bản tin
        </Link>
        <span className={styles.kicker}>
          KINH NGHIỆM DI CHUYỂN · NỘI DUNG THAM KHẢO
        </span>
        <h1>{article.title}</h1>
        <img
          src={`/images/${article.image}.webp`}
          width="800"
          height="460"
          alt="Hình ảnh hành trình từ thiết kế tham chiếu"
        />
        <p>{article.body}</p>
        <Link to="/#booking-form" className={styles.appCta}>
          Lên lịch hành trình →
        </Link>
      </article>
    </MainLayout>
  )
}
