import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '../../Navbar';
import ProductDetailContent from '@/components/ProductDetailContent';
import { prisma } from '@/lib/prisma';

async function getProductData(categorySlug: string, productSlug: string) {
  const category = await prisma.category.findUnique({
    where: { slug: categorySlug }
  });

  if (!category) return null;

  const product = await prisma.product.findUnique({
    where: { slug: productSlug },
    include: { category: true }
  });
  
  if (!product || product.categoryId !== category.id) return null;
  
  return product;
}

export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string, productSlug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductData(resolvedParams.categorySlug, resolvedParams.productSlug);
  
  if (!product) {
    return { title: 'Không tìm thấy sản phẩm | SportStore' };
  }

  return {
    title: `${product.title} | SportStore`,
    description: product.description.substring(0, 160),
  };
}

export default async function ProductPage({ params }: { params: Promise<{ categorySlug: string, productSlug: string }> }) {
  const resolvedParams = await params;
  const product = await getProductData(resolvedParams.categorySlug, resolvedParams.productSlug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <ProductDetailContent 
        id={product.id}
        name={product.title}
        price={product.price}
        imageFile={product.imageUrl || '/vot-cau-long-yonex.jpg'}
        content={product.description}
        specifications={product.specifications || ''}
      />
    </div>
  );
}
