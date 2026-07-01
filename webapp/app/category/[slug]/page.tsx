import React from 'react';
import Navbar from '../../Navbar';
import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  // Tìm danh mục theo slug, kèm theo danh mục con nếu có
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      children: true,
    },
  });

  if (!category) {
    notFound();
  }

  // Lấy ID của chính danh mục này và các danh mục con của nó
  const categoryIds = [category.id, ...category.children.map((child) => child.id)];

  // Lấy danh sách sản phẩm thuộc các danh mục trên
  const products = await prisma.product.findMany({
    where: {
      categoryId: {
        in: categoryIds,
      },
    },
    orderBy: { id: 'asc' },
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-6 py-10">
        {/* Category Header */}
        <div className="mb-8 border-b border-zinc-850 pb-4 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
              Danh mục: <span className="text-amber-500">{category.name}</span>
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Hiển thị dụng cụ thể thao thuộc dòng {category.name}
            </p>
          </div>
          <span className="text-xs text-zinc-400 font-medium">
            Có {products.length} sản phẩm
          </span>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl">
            <p className="text-zinc-500 text-sm">Chưa có sản phẩm nào thuộc danh mục này.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
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
      </main>
    </div>
  );
}