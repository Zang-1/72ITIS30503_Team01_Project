import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '../Navbar';
import CategoryContent from '@/components/CategoryContent';
import { prisma } from '@/lib/prisma';

async function getCategoryData(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
  });
  
  if (!category) return null;

  const products = await prisma.product.findMany({
    where: { categoryId: category.id },
    include: { category: true },
  });

  return { category, products };
}

// SEO Metadata
export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await getCategoryData(resolvedParams.categorySlug);
  
  if (!data) {
    return { title: 'Không tìm thấy danh mục | SportStore' };
  }

  return {
    title: `${data.category.name} | SportStore`,
    description: `Mua ${data.category.name} chính hãng tại SportStore. Đa dạng sản phẩm, giá tốt nhất.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.categorySlug;
  const data = await getCategoryData(slug);

  if (!data) {
    notFound();
  }

  // Serialize data cho client component
  const serializedProducts = data.products.map(p => ({
    id: p.id,
    title: p.title,
    price: p.price,
    imageUrl: p.imageUrl,
    slug: p.slug,
    categorySlug: data.category.slug,
  }));

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <CategoryContent 
        categoryName={data.category.name}
        categorySlug={data.category.slug}
        products={serializedProducts} 
      />
    </div>
  );
}
