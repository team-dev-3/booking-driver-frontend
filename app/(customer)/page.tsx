
import Header from "@/components/customer/layout/Header";
import Hero from "@/components/customer/home/Hero";
import CarList from "@/components/customer/cars/CarList";
import WhyChooseUs from "@/components/customer/home/WhyChooseUs";
import Promotion from "@/components/customer/home/Promotion";
import ServiceInfo from "@/components/customer/home/ServiceInfo";
import BlogSection from "@/components/customer/home/BlogSection";
import BookingForm from "@/components/customer/booking/BookingForm";
import AppDownload from "@/components/customer/home/AppDownload";
import Footer from "@/components/customer/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <CarList />
        <WhyChooseUs />
        <Promotion />
        <ServiceInfo />
        <BlogSection />
        <BookingForm />
        <AppDownload />
      </main>

      <Footer />
    </>
  );
}

