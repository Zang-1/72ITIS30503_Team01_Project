import Navbar from './Navbar';
import { prisma } from '../lib/prisma';
import ProductCard from '../components/ProductCard';

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

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-black py-20 px-8 text-center border-b border-gray-800">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 mb-6">
          Nâng Tầm Đam Mê Thể Thao
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Khám phá ngay các dụng cụ cao cấp dành cho Cầu Lông, Tennis và Pickleball.
        </p>
        <button className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105">
          Mua Ngay
        </button>
      </section>

      <main className="p-10 max-w-6xl mx-auto flex-grow w-full">
        
        {/* Category Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-orange-500 pl-4">Danh Mục Sản Phẩm</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Cầu Lông', 'Tennis', 'Pickleball'].map(cat => (
              <div key={cat} className="bg-gray-900 p-8 rounded-xl text-center hover:bg-gray-800 transition cursor-pointer border border-gray-800">
                <h3 className="text-xl font-bold text-orange-400">{cat}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic Product Row 1: Latest Arrivals */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-orange-500 pl-4">Sản Phẩm Mới Nhất</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {latestProducts.map(product => (
              <ProductCard 
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                imageUrl={product.imageUrl}
                slug={product.slug}
              />
            ))}
          </div>
        </section>

        {/* Dynamic Product Row 2: Premium Selection */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-yellow-500 pl-4">Sản Phẩm Cao Cấp</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {premiumProducts.map(product => (
              <div key={product.id} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl blur-sm opacity-30 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative h-full">
                  <ProductCard 
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    slug={product.slug}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Global Footer */}
      <footer className="bg-[#1a1a1a] text-center p-6 border-t border-gray-800">
        <p className="text-gray-500">© 2026 SportStore. Đã đăng ký bản quyền.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">Chính Sách Bảo Mật</a>
          <a href="#" className="text-gray-400 hover:text-white">Điều Khoản Dịch Vụ</a>
          <a href="/contact" className="text-orange-500 hover:text-orange-400">Liên Hệ</a>
        </div>
      </footer>
    </div>
  );
}