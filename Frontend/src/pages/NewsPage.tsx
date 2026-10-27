import { Link, useSearchParams } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import Icon from '@/components/common/Icon/Icon'
import { newsArticles, newsCategories } from '@/data/news.mock'
import styles from './NewsPage.module.css'

function ArticleCard({ article, featured = false }: { article: typeof newsArticles[number]; featured?: boolean }) {
  const category = newsCategories.find(item => item.id === article.category)
  return <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
    <Link to={`/bai-viet/${article.id}`} className={styles.imageLink} aria-label={article.title}><img src={`/images/${article.image}.webp`} width="1200" height="655" alt={article.title} loading={featured ? 'eager' : 'lazy'} decoding="async" />{featured && <span className={styles.featureTag}>Bài viết tiêu điểm</span>}</Link>
    <div className={styles.cardBody}><div className={styles.meta}><span>{category?.label}</span><time dateTime={article.date}><Icon name="calendar" size={14} />{article.date.split('-').reverse().join('-')}</time></div><h2><Link to={`/bai-viet/${article.id}`}>{article.title}</Link></h2><p>{article.body}</p><Link className={styles.readMore} to={`/bai-viet/${article.id}`}>{featured ? 'Đọc bài viết đầy đủ' : 'Xem chi tiết'}<Icon name="chevron" size={14} /></Link></div>
  </article>
}

export default function NewsPage() {
  const [params] = useSearchParams()
  const requestedCategory = params.get('category') ?? 'all'
  const category = newsCategories.some(item => item.id === requestedCategory) ? requestedCategory : 'all'
  const filtered = newsArticles.filter(article => (category === 'all' || article.category === category))
  const showFeatured = category === 'all'
  const featured = newsArticles.find(article => article.id === 'hanoi-mongcai')
  const feed = showFeatured ? filtered.filter(article => article.id !== featured?.id) : filtered
  function categoryLink(id: string) {
    const next = new URLSearchParams(params)
    if (id === 'all') next.delete('category')
    else next.set('category', id)
    return '/tin-tuc' + (next.size ? '?' + next.toString() : '')
  }
  return <MainLayout>
    <title>Tin tức & cẩm nang di chuyển | GOMOVE</title>
    <meta name="description" content="Bản tin và kinh nghiệm di chuyển cùng GOMOVE: hành trình Hà Nội, Vịnh Lan Hạ, Hạ Long và Móng Cái. Khám phá các bài viết và cẩm nang đi lại." />
    <header className={styles.pageHeading}><h1>TIN TỨC</h1></header>
    <div className={`${styles.container} ${styles.layout}`}>
      <section className={styles.feed} aria-label="Danh sách bài viết">
        {showFeatured && featured && <ArticleCard article={featured} featured />}
        <div className={styles.feedHeading}><h2>{showFeatured ? 'BÀI VIẾT MỚI NHẤT' : 'BÀI VIẾT THEO DANH MỤC'}</h2><span role="status">{filtered.length} bài viết</span></div>
        {feed.length ? <div className={styles.articleGrid}>{feed.map(article => <ArticleCard article={article} key={article.id} />)}</div> : <div className={styles.empty}><Icon name="search" size={36} /><h2>Chưa tìm thấy bài viết phù hợp</h2><p>Chọn danh mục khác hoặc xem tất cả bài viết.</p><Link to="/tin-tuc">Xem tất cả bài viết</Link></div>}
      </section>
      <aside className={styles.sidebar} aria-label="Chuyên mục và bài viết gợi ý">
        <div className={styles.widget}><h2>Danh mục tin tức</h2><nav aria-label="Danh mục bài viết"><ul className={styles.categories}>{newsCategories.map(item => <li key={item.id}><Link to={categoryLink(item.id)} aria-current={category === item.id ? 'true' : undefined}><span>{item.label}</span><span className={styles.count}>{item.id === 'all' ? newsArticles.length : newsArticles.filter(article => article.category === item.id).length}</span></Link></li>)}</ul></nav></div>
        <div className={styles.widget}><h2>Bài viết gợi ý</h2><div className={styles.suggestions}>{newsArticles.map(article => <Link to={`/bai-viet/${article.id}`} key={article.id}><img src={`/images/${article.image}.webp`} width="72" height="72" alt="" loading="lazy" /><span><strong>{article.title}</strong><time dateTime={article.date}>{article.date.split('-').reverse().join('-')}</time></span></Link>)}</div></div>
      </aside>
    </div>
  </MainLayout>
}
