import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import CartDrawer from "@/components/CartDrawer";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getCategoryTree } from "@/lib/categories";

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
  description:
    "Cửa hàng bán dụng cụ thể thao hàng đầu Việt Nam. Cung cấp vợt cầu lông, tennis, giày thể thao và phụ kiện chính hãng.",
  keywords:
    "sport store, cầu lông, tennis, giày thể thao, vợt yonex, dụng cụ thể thao",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Navigation is built from the real Category hierarchy in the database
  const categories = await getCategoryTree();

  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <CartProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <Header categories={categories} />
              <main className="flex-grow">{children}</main>
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
