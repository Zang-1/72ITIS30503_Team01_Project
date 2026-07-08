import React from 'react';
import Navbar from './Navbar';
import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';

export default async function HomePage() {
  // Lấy tất cả sản phẩm từ Database
  const products = await prisma.product.findMany({
    orderBy: { id: 'asc' },
  });
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto max-w-7xl w-full px-6 py-10">
        {/* Hero Section */}
        <section className="mb-12 rounded-2xl bg-radial from-amber-600/10 via-transparent to-transparent border border-zinc-800 p-8 md:p-12 text-center md:text-left md:flex md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
              Hệ Thống Bán Hàng <span className="text-amber-500">B2C - Nhóm 1</span>
            </h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
              Chào mừng bạn đến với Cửa hàng Dụng cụ Thể thao chính hãng. Chúng tôi chuyên cung cấp Vợt Cầu Lông Yonex và Vợt Tennis Wilson, Babolat chính hãng nhập khẩu chất lượng cao.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
                🏸 Đồ Cầu Lông
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
                🎾 Đồ Tennis
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
                💯 100% Chính Hãng
              </span>
            </div>
          </div>
        </section>

        {/* Product Grid Section */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-zinc-850 pb-4">
            <h2 className="text-xl font-bold tracking-wide text-zinc-100 uppercase">
              Sản phẩm nổi bật
            </h2>
            <span className="text-xs text-zinc-500">
              Có {products.length} sản phẩm có sẵn
            </span>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl">
              <p className="text-zinc-500 text-sm">Chưa có sản phẩm nào trong hệ thống.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
             {products.map((product: any) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  slug={product.slug}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}