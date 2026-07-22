import React from 'react';
import { Metadata } from 'next';
import Navbar from '../../Navbar';
import ProductDetailContent from '@/components/ProductDetailContent';

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
      <ProductDetailContent
        name={product.name}
        price={product.price}
        imageFile={product.imageFile}
        content={product.content}
      />
    </div>
  );
}