import Link from 'next/link';
import { Metadata } from 'next';
import { getCategoryTree } from '@/lib/categories';
import { prisma } from '@/lib/prisma';
import ShopContent from '@/components/ShopContent';

export const metadata: Metadata = {
  title: 'Cửa hàng | SportStore',
  description: 'Toàn bộ danh mục dụng cụ cầu lông, tennis và pickleball chính hãng tại SportStore.',
};

export default async function ShopPage() {
  const groups = await getCategoryTree();
  const counts = await prisma.product.groupBy({
    by: ['categoryId'],
    _count: { _all: true },
  });

  const countMap: Record<number, number> = {};
  counts.forEach((c: (typeof counts)[number]) => {
    countMap[c.categoryId] = c._count._all;
  });

  return <ShopContent groups={groups} counts={countMap} />;
}
