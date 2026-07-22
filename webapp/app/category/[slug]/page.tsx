import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '../../Navbar';
import CategoryContent from '@/components/CategoryContent';
import { prisma } from '@/lib/prisma';

async function getCategoryData(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
  });
  
  if (!category) return null;

  const products = await prisma.product.findMany({
    where: { categoryId: category.id },
  });

  return { category, products };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
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
    slug: p.slug
  }));

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <CategoryContent 
        categoryName={data.category.name} 
        products={serializedProducts} 
      />
    </div>
  );
}