import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/sections/HeroSection/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection/ServicesSection";
import FeatureHighlightSection from "@/components/sections/FeatureHighlightSection/FeatureHighlightSection";
import PromotionsSection from "@/components/sections/PromotionsSection/PromotionsSection";
import OverviewSection from "@/components/sections/OverviewSection/OverviewSection";
import BlogSection from "@/components/sections/BlogSection/BlogSection";
import BookingSection from "@/components/sections/BookingSection/BookingSection";
import AppDownloadSection from "@/components/sections/AppDownloadSection/AppDownloadSection";

export default function HomePage() {
  return (
    <MainLayout>
      <title>Dịch Vụ Xe Ghép GOMOVE | Hà Nội - Hải Phòng - Quảng Ninh</title>
      <meta
        name="description"
        content="Giao diện xe ghép GOMOVE: bảng giá tham khảo, dịch vụ xe tiện chuyến và lên lịch hành trình Hà Nội, Hải Phòng, Quảng Ninh."
      />
      <HeroSection />
      <ServicesSection />
      <FeatureHighlightSection />
      <PromotionsSection />
      <OverviewSection />
      <BlogSection />
      <BookingSection />
      <AppDownloadSection />
    </MainLayout>
  );
}
