import React from 'react';
import { Metadata } from 'next';
import Navbar from '../../Navbar';

// 1. Dữ liệu sản phẩm (Có đầy đủ thông tin chuẩn SEO)
async function getProductBySlug() {
  return {
    title: 'Vợt Cầu Lông Yonex Astrox 88D Chính Hãng - Ultimate Offensive Masterpiece', 
    description: 'Buy authentic Vợt Cầu Lông Yonex Astrox 88D at the best price. A highly powerful offensive racket, supporting strong smashes, nationwide delivery available.', 
    name: 'Vợt Cầu Lông Yonex Astrox 88D Chính Hãng',
    price: '4.250.000đ',
    imageFile: 'vot-cau-long-yonex.jpg', 
    content: 'Vợt Cầu Lông Yonex Astrox 88D is the top choice for an offensive playstyle.'
  };
}

interface Props { params: { slug: string }; }

// 2. CODE TẠO THẺ META SEO (Không hiển thị ra web, chỉ để máy tìm kiếm đọc)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductBySlug();
  return {
    title: product.title,       
    description: product.description, 
  };
}

// 3. CODE GIAO DIỆN WEB (Hiển thị cho người dùng xem)
export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProductBySlug();

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <article className="p-10 max-w-4xl">
        {/* Luật của thầy: Duy nhất 1 thẻ H1 trên trang */}
        <h1 className="text-3xl font-bold text-[#fd7e14] mb-4">
          {product.name}
        </h1>
        
        <p className="text-xl font-bold text-[#28a745] mb-6">
          Price: {product.price}
        </p>

        {/* Luật của thầy: Thẻ ảnh lấy đúng tên file và có alt chứa từ khóa */}
        <img 
          src={`/${product.imageFile}`} 
          alt="Vợt cầu lông Yonex Astrox 88D chính hãng" 
          className="max-w-md w-full mb-8 rounded border border-gray-700" 
        />

        {/* Phân cấp nhỏ hơn phải dùng H2, rồi tới H3 */}
        <h2 className="text-2xl font-bold text-[#ffc107] mb-3">
          Key Features
        </h2>
        <p className="text-gray-300 mb-8 leading-relaxed">
          {product.content}
        </p>

        <h3 className="text-xl font-bold text-[#17a2b8] mb-3">
          Specifications
        </h3>
        <ul className="list-disc ml-6 text-gray-300 space-y-2">
          <li>Stiffness: Stiff</li>
          <li>Weight: 4U</li>
        </ul>
      </article>
    </div>
  );
}