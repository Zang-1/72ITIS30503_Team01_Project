import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import SearchContent from '@/components/SearchContent';

export const metadata: Metadata = {
  title: 'Tìm kiếm sản phẩm | SportStore',
  description: 'Tìm kiếm vợt cầu lông, tennis, pickleball và phụ kiện chính hãng tại SportStore.',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? '').trim();

  const products = query
    ? await prisma.product.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { description: { contains: query } },
            { specifications: { contains: query } },
          ],
        },
        include: { category: true },
        orderBy: { id: 'desc' },
        take: 60,
      })
    : [];

  return (
    <SearchContent
      query={query}
      products={products.map((p: (typeof products)[number]) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        imageUrl: p.imageUrl,
        slug: p.slug,
        categorySlug: p.category.slug,
      }))}
    />
  );
}
