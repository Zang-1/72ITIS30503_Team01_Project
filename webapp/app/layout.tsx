import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import CartDrawer from "@/components/CartDrawer";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SportStore - Nâng Tầm Đam Mê",
  description: "Cửa hàng bán dụng cụ thể thao hàng đầu Việt Nam. Cung cấp vợt cầu lông, tennis, giày thể thao và phụ kiện chính hãng.",
  keywords: "sport store, cầu lông, tennis, giày thể thao, vợt yonex, dụng cụ thể thao",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="vi" 
      suppressHydrationWarning 
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <CartProvider>
          <LanguageProvider>
            <div className="flex flex-col min-h-screen">
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
            <CartDrawer />
            <ChatWidget />
          </LanguageProvider>
        </CartProvider>
      </body>
    </html>
  );
}
