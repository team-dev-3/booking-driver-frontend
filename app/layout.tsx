
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GoMove - Dịch Vụ Xe Ghép & Xe Tiện Chuyến",
  description: "Dịch vụ xe ghép, xe tiện chuyến GoMove",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${beVietnamPro.className} bg-white text-slate-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
