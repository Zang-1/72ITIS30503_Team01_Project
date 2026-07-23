import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailContent from '@/components/ProductDetailContent';
import { prisma } from '@/lib/prisma';

async function getProductData(categorySlug: string, productSlug: string) {
  const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
  if (!category) return null;

  const product = await prisma.product.findUnique({
    where: { slug: productSlug },
    include: { category: true },
  });

  if (!product || product.categoryId !== category.id) return null;

  return product;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string; productSlug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductData(resolvedParams.categorySlug, resolvedParams.productSlug);

  if (!product) {
    return { title: 'Không tìm thấy sản phẩm | SportStore' };
  }

  const description = (product.description ?? '').substring(0, 160);

  return {
    title: `${product.title} | SportStore`,
    description,
    openGraph: {
      title: `${product.title} | SportStore`,
      description,
      images: product.imageUrl ? [product.imageUrl] : undefined,
      type: 'website',
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ categorySlug: string; productSlug: string }>;
}) {
  const resolvedParams = await params;
  const product = await getProductData(resolvedParams.categorySlug, resolvedParams.productSlug);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetailContent
      id={product.id}
      name={product.title}
      price={product.price}
      imageFile={product.imageUrl || '/vot-cau-long-yonex.jpg'}
      content={product.description ?? ''}
      specifications={product.specifications || ''}
      slug={product.slug}
      categoryName={product.category.name}
      categorySlug={product.category.slug}
      sku={product.sku}
      stockQty={product.stockQty}
    />
  );
}
