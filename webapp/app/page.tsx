import { prisma } from '../lib/prisma';
import HomeContent from '../components/HomeContent';
import { getCategoryTree } from '@/lib/categories';

export default async function HomePage() {
  const latestProducts = await prisma.product.findMany({
    orderBy: { id: 'desc' },
    take: 8,
    include: { category: true },
  });

  const premiumProducts = await prisma.product.findMany({
    orderBy: { price: 'desc' },
    take: 8,
    include: { category: true },
  });

  const sportGroups = await getCategoryTree();

  const serializeProducts = (products: typeof latestProducts) =>
    products.map((p: (typeof latestProducts)[number]) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      imageUrl: p.imageUrl,
      slug: p.slug,
      categorySlug: p.category.slug,
    }));

  return (
    <HomeContent
      latestProducts={serializeProducts(latestProducts)}
      premiumProducts={serializeProducts(premiumProducts)}
      sportGroups={sportGroups}
    />
  );
}
