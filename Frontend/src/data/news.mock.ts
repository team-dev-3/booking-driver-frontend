import { articles } from './home.mock'

/** Phân loại nội dung tham khảo; ngày khớp các bài đang hiển thị trên trang chủ. */
export const newsCategories = [
  { id: 'all', label: 'Tất cả bài viết' },
  { id: 'travel', label: 'Cẩm nang du lịch & đi lại' },
  { id: 'quangninh', label: 'Tuyến Quảng Ninh – Móng Cái' },
] as const
const metadata: Record<string, { category: 'travel' | 'quangninh'; date: string }> = {
  'hanoi-vinhlam': { category: 'travel', date: '2026-09-10' },
  'halong-mongcai': { category: 'quangninh', date: '2026-09-06' },
  'hanoi-mongcai': { category: 'quangninh', date: '2026-09-03' },
}
export const newsArticles = articles.map(article => ({ ...article, ...metadata[article.id] }))
