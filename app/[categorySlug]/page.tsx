import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryContent from '@/components/CategoryContent';
import { prisma } from '@/lib/prisma';

async function getCategoryData(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: { parent: true, children: true },
  });

  if (!category) return null;

  // A parent category shows the products of all of its children as well
  const childIds = category.children.map((c: (typeof category.children)[number]) => c.id);
  const products = await prisma.product.findMany({
    where: { categoryId: { in: [category.id, ...childIds] } },
    include: { category: true },
    orderBy: { id: 'desc' },
  });

  // Sibling list for the sidebar: children if this is a parent,
  // otherwise the other categories under the same parent.
  const siblings = category.parentId
    ? await prisma.category.findMany({ where: { parentId: category.parentId }, orderBy: { id: 'asc' } })
    : category.children;

  return { category, products, siblings };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
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

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const resolvedParams = await params;
  const data = await getCategoryData(resolvedParams.categorySlug);

  if (!data) {
    notFound();
  }

  const serializedProducts = data.products.map((p: (typeof data.products)[number]) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    imageUrl: p.imageUrl,
    slug: p.slug,
    categorySlug: p.category.slug,
  }));

  return (
    <CategoryContent
      categoryName={data.category.name}
      categorySlug={data.category.slug}
      products={serializedProducts}
      siblings={data.siblings.map((s: (typeof data.siblings)[number]) => ({ id: s.id, name: s.name, slug: s.slug }))}
      parentName={data.category.parent?.name ?? null}
      parentSlug={data.category.parent?.slug ?? null}
    />
  );
}
