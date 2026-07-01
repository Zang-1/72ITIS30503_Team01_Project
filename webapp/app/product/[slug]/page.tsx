import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Navbar from '@/app/Navbar';
import ProductActions from '@/components/ProductActions';

interface Props {
  params: Promise<{ slug: string }>;
}

// 1. HÀM TẠO THẺ META SEO (Hệ thống tự gọi khi Bot Google quét qua)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) return { title: 'Không tìm thấy sản phẩm' };

  // Tối ưu Title: Đảm bảo độ dài từ 65 - 69 ký tự (Thêm hậu tố nếu thiếu)
  let seoTitle = `${product.title} | Chính Hãng, Giá Tốt Nhất`;
  if (seoTitle.length < 65) {
    seoTitle = seoTitle.padEnd(65, ' ');
  } else if (seoTitle.length > 69) {
    seoTitle = seoTitle.substring(0, 66) + '...';
  }

  // Tối ưu Description: Cắt ngắn dưới 165 ký tự để tránh bị dấu "..." trên Google
  const rawDesc = product.description || 'Mua ngay sản phẩm thể thao chất lượng cao chính hãng.';
  const seoDescription = rawDesc.length > 160 
    ? rawDesc.substring(0, 157) + '...' 
    : rawDesc;

  return {
    title: seoTitle.trim(),
    description: seoDescription,
  };
}

// 2. GIAO DIỆN TRANG CHI TIẾT SẢN PHẨM
export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });

  if (!product) {
    notFound();
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-6 py-10">
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-zinc-900/20 border border-zinc-850 rounded-3xl p-6 md:p-10">
          
          {/* Left Column: Product Image */}
          <div className="flex items-center justify-center bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-850 aspect-square max-h-[500px]">
            <img 
              src={product.imageUrl || '/vot-cau-long-yonex.jpg'} 
              alt={`${product.title} chính hãng chất lượng cao`} 
              className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
            />
          </div>
          
          {/* Right Column: Details & Purchase */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category tag */}
              <div className="mb-4">
                <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] uppercase font-bold text-amber-500 tracking-wider">
                  {product.category.name}
                </span>
              </div>

              {/* DUY NHẤT MỘT THẺ H1 CHO TÊN SẢN PHẨM CHUẨN SEO */}
              <h1 className="text-2xl md:text-4xl font-black text-white leading-tight mb-4">
                {product.title}
              </h1>

              {/* Price */}
              <div className="text-2xl md:text-3xl font-black text-amber-500 mb-6">
                {formatCurrency(product.price)}
              </div>

              {/* Specifications (H2 & H3 for hierarchy) */}
              <div className="border-t border-zinc-850 pt-6">
                <h2 className="text-base font-bold text-white uppercase tracking-wider mb-3">
                  Thông số kỹ thuật
                </h2>
                <div className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line bg-zinc-900/50 p-4 rounded-xl border border-zinc-850">
                  {product.specifications || 'Thông số kỹ thuật đang được cập nhật.'}
                </div>
              </div>
            </div>

            {/* Interactive Client Section (Quantity selector and add button) */}
            <ProductActions 
              id={product.id}
              title={product.title}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          </div>
        </article>

        {/* Product Description Section */}
        <section className="mt-12 bg-zinc-900/20 border border-zinc-850 rounded-3xl p-6 md:p-10">
          <h2 className="text-xl font-bold text-white mb-4 border-b border-zinc-850 pb-2">
            Mô tả chi tiết sản phẩm
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed whitespace-pre-line">
            {product.description || 'Mô tả chi tiết sản phẩm đang được cập nhật.'}
          </p>

          <h3 className="text-sm font-semibold text-zinc-400 mt-6 mb-2">Chính sách bảo hành</h3>
          <p className="text-zinc-500 text-xs">
            Sản phẩm được bảo hành chính hãng 12 tháng kể từ ngày mua. Hỗ trợ đổi mới trong vòng 7 ngày nếu xuất hiện lỗi từ nhà sản xuất.
          </p>
        </section>
      </main>
    </div>
  );
}