import Navbar from '../../Navbar';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <div className="p-10 max-w-5xl">
        <h1 className="text-3xl font-bold text-[#fd7e14] mb-2">
          Category Page
        </h1>
        <p className="text-gray-400 mb-10">
          Category: {slug}
        </p>

        {/* Danh sách sản phẩm của Danh mục */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {slug === 'vot-cau-long' ? (
            <a href="/product/yonex-astrox-88d" className="block bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden flex flex-col hover:border-gray-600 transition-colors cursor-pointer">
              <img 
                src="/vot-cau-long-yonex.jpg" 
                alt="Vợt Cầu Lông Yonex Astrox 88D" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white mb-2">
                  Vợt Cầu Lông Yonex Astrox 88D Chính Hãng
                </h3>
                <p className="text-[#28a745] font-bold mb-4">4.250.000đ</p>
                <div className="mt-auto bg-[#fd7e14] text-white text-center py-2 rounded font-bold">
                  View details
                </div>
              </div>
            </a>
          ) : (
            <div className="col-span-full text-gray-500">
              No products found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}