import Navbar from './Navbar';
import { prisma } from '../lib/prisma';

export default async function HomePage() {
  // Fetch Latest Arrivals
  const latestProducts = await prisma.product.findMany({
    orderBy: { id: 'desc' },
    take: 4,
    include: { category: true }
  });

  // Fetch Premium Products (Price > 500)
  const premiumProducts = await prisma.product.findMany({
    where: { price: { gt: 500 } },
    take: 4,
    include: { category: true }
  });

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-black py-20 px-8 text-center border-b border-gray-800">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 mb-6">
          Elevate Your Game
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Discover top-tier equipment for Badminton, Tennis, and PickleBall.
        </p>
        <button className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105">
          Shop Now
        </button>
      </section>

      <main className="p-10 max-w-6xl mx-auto flex-grow w-full">
        
        {/* Category Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-orange-500 pl-4">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Badminton', 'Tennis', 'PickleBall'].map(cat => (
              <div key={cat} className="bg-gray-900 p-8 rounded-xl text-center hover:bg-gray-800 transition cursor-pointer border border-gray-800">
                <h3 className="text-xl font-bold text-orange-400">{cat}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic Product Row 1: Latest Arrivals */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-orange-500 pl-4">Latest Arrivals</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {latestProducts.map(product => (
              <div key={product.id} className="bg-gray-900 p-6 rounded-lg border border-gray-800 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-2">{product.title}</h3>
                  <span className="text-sm text-gray-400">{product.category.name}</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-orange-500 font-bold">${product.price.toFixed(2)}</span>
                  <button className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic Product Row 2: Premium Selection */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-orange-500 pl-4">Premium Selection</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {premiumProducts.map(product => (
              <div key={product.id} className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg border border-yellow-700 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-yellow-500 font-bold mb-2 uppercase tracking-wider">Premium</div>
                  <h3 className="text-lg font-bold mb-2">{product.title}</h3>
                  <span className="text-sm text-gray-400">{product.category.name}</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-yellow-500 font-bold">${product.price.toFixed(2)}</span>
                  <button className="text-sm bg-yellow-600 hover:bg-yellow-500 text-black font-bold px-3 py-1 rounded">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Global Footer */}
      <footer className="bg-[#1a1a1a] text-center p-6 border-t border-gray-800">
        <p className="text-gray-500">© 2026 SportStore. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
          <a href="/contact" className="text-orange-500 hover:text-orange-400">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}