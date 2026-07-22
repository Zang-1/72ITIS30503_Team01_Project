import Navbar from './Navbar';
import { prisma } from '../lib/prisma';
import HomeContent from '../components/HomeContent';

export default async function HomePage() {
  // Fetch Latest Arrivals
  const latestProducts = await prisma.product.findMany({
    orderBy: { id: 'desc' },
    take: 4,
    include: { category: true }
  });

  // Fetch Premium Products (Sản phẩm đắt nhất)
  const premiumProducts = await prisma.product.findMany({
    orderBy: { price: 'desc' },
    take: 4,
    include: { category: true }
  });

  // Serialize products for the client component
  const serializeProducts = (products: typeof latestProducts) =>
    products.map(p => ({
      id: p.id,
      title: p.title,
      price: p.price,
      imageUrl: p.imageUrl,
      slug: p.slug,
      categorySlug: p.category?.slug || 'danh-muc-mac-dinh',
    }));

  return (
    <>
      <Navbar />
      <HomeContent
        latestProducts={serializeProducts(latestProducts)}
        premiumProducts={serializeProducts(premiumProducts)}
      />
    </>
  );
}