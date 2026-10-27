import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import PricingPage from '@/pages/PricingPage'
import ServicesPage from '@/pages/ServicesPage'
import AboutPage from '@/pages/AboutPage'
import NewsPage from '@/pages/NewsPage'
import SearchResultsPage from '@/pages/SearchResultsPage'
import VehicleDetailPage from '@/pages/VehicleDetailPage'
import BookingPage from '@/pages/BookingPage'
import BookingConfirmPage from '@/pages/BookingConfirmPage'
import BookingSuccessPage from '@/pages/BookingSuccessPage'
import AccountPage from '@/pages/AccountPage'
import TermsPage from '@/pages/legal/TermsPage'
import PrivacyPage from '@/pages/legal/PrivacyPage'
import CancellationPolicyPage from '@/pages/legal/CancellationPolicyPage'
import ContactPage from '@/pages/ContactPage'
import NotFoundPage from '@/pages/NotFoundPage'
import ArticlePage from '@/pages/ArticlePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang chủ */}
        <Route path="/" element={<HomePage />} />
        <Route path="/bang-gia" element={<PricingPage />} />
        <Route path="/dich-vu" element={<ServicesPage />} />
        <Route path="/gioi-thieu" element={<AboutPage />} />
        <Route path="/tin-tuc" element={<NewsPage />} />
        <Route path="/bai-viet/:slug" element={<ArticlePage />} />

        {/* Tìm xe & kết quả */}
        <Route path="/tim-xe" element={<SearchResultsPage />} />
        <Route path="/xe/:id" element={<VehicleDetailPage />} />

        {/* Luồng đặt xe */}
        <Route path="/dat-xe/:vehicleId" element={<BookingPage />} />
        <Route path="/xac-nhan/:bookingId" element={<BookingConfirmPage />} />
        <Route
          path="/dat-xe-thanh-cong/:bookingId"
          element={<BookingSuccessPage />}
        />

        {/* Tài khoản */}
        <Route path="/tai-khoan/*" element={<AccountPage />} />

        {/* Trang pháp lý */}
        <Route path="/dieu-khoan-su-dung" element={<TermsPage />} />
        <Route path="/chinh-sach-quyen-rieng-tu" element={<PrivacyPage />} />
        <Route
          path="/chinh-sach-huy-hoan-tien"
          element={<CancellationPolicyPage />}
        />
        <Route path="/lien-he" element={<ContactPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
