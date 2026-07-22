import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/app/Navbar';
import ProductDetailContent from '@/components/ProductDetailContent';
import { prisma } from '@/lib/prisma';

// 1. Dữ liệu sản phẩm thật từ DB
async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true }
  });
  return product;
}

// 2. CODE TẠO THẺ META SEO
export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string, slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);
  
  if (!product) {
    return {
      title: 'Không tìm thấy sản phẩm | SportStore',
    };
  }

  return {
    title: `${product.title} | SportStore`,       
    description: product.description || `Mua ${product.title} chính hãng tại SportStore.`, 
  };
}

// 3. CODE GIAO DIỆN WEB
export default async function ProductDetailPage({ params }: { params: Promise<{ categorySlug: string, slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

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
        content={product.description || ''}
        specifications={product.specifications || ''}
      />
    </div>
  );
}