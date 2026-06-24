import React from 'react';
import { Metadata } from 'next';
import ProductOptions from './ProductOptions';
import Navbar from '../../Navbar';
import Link from 'next/link';

// 1. Dữ liệu sản phẩm (Có đầy đủ thông tin chuẩn SEO)
async function getProductBySlug(slug: string) {
  const products: Record<string, any> = {
    'vot-cau-long-yonex-astrox-88d': {
      title: 'Vợt Cầu Lông Yonex Astrox 88D Chính Hãng - Siêu Phẩm Tấn Công Đỉnh Cao',
      description: 'Mua ngay Vợt Cầu Lông Yonex Astrox 88D chính hãng giá tốt nhất. Cây vợt thiên công cực kỳ mạnh mẽ, hỗ trợ đập cầu uy lực, giao hàng toàn quốc tại cửa hàng.',
      name: 'Vợt Cầu Lông Yonex Astrox 88D Chính Hãng',
      price: '4.250.000đ',
      imageFile: 'vot-cau-long-yonex.jpg',
      content: 'Vợt cầu lông Yonex Astrox 88D là lựa chọn hàng đầu cho lối chơi tấn công mạnh mẽ. Được thiết kế với công nghệ hiện đại giúp tối ưu lực đập và tốc độ vung vợt.'
    },
    'vot-cau-long-victor-thruster-fc': {
      title: 'Vợt Cầu Lông Victor Thruster F C (Mã JP) - Kiểm Soát Cầu Toàn Diện',
      description: 'Mua ngay Vợt Cầu Lông Victor Thruster F C (Mã JP) chính hãng giá cực tốt. Dòng vợt công thủ toàn diện cực đỉnh, kiểm soát cầu sắc nét.',
      name: 'Vợt Cầu Lông Victor Thruster F C (Mã JP)',
      price: '3.500.000đ',
      imageFile: 'vot-cau-long-victor-thruster.jpg',
      content: 'Vợt cầu lông Victor Thruster F C nổi tiếng với khả năng phản tạt nhanh và điều cầu có độ chính xác cực cao, rất được các vợt thủ chuyên nghiệp yêu thích.'
    },
    'vot-cau-long-lining-aeronaut-9000c': {
      title: 'Vợt Cầu Lông Lining Aeronaut 9000C - Sức Mạnh Tấn Công Nhanh',
      description: 'Mua ngay Vợt Cầu Lông Lining Aeronaut 9000C chính hãng. Vợt sở hữu công nghệ hàng không giúp giảm tối đa lực cản không khí, tấn công uy lực.',
      name: 'Vợt Cầu Lông Lining Aeronaut 9000C',
      price: '4.000.000đ',
      imageFile: 'vot-cau-long-lining.jpg',
      content: 'Vợt cầu lông Lining Aeronaut 9000C được xây dựng trên nền tảng công nghệ hàng không độc đáo, mang lại sự ổn định và tốc độ phản xạ vượt trội.'
    }
  };

  return products[slug] || products['vot-cau-long-yonex-astrox-88d'];
}

interface Props {
  params: Promise<{ slug: string }>;
}

// 2. CODE TẠO THẺ META SEO (Không hiển thị ra web, chỉ để máy tìm kiếm đọc)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return {
    title: product.title,
    description: product.description,
  };
}

// 3. CODE GIAO DIỆN WEB (Hiển thị cho người dùng xem)
export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#fff', fontFamily: 'Arial' }}>
      <Navbar />

      <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Breadcrumb quay lại */}
        <div style={{ marginBottom: '20px' }}>
          <Link href="/category/vot-cau-long" style={{ color: '#aaa', textDecoration: 'none', fontSize: '14px' }}>
            &larr; Quay lại danh mục Vợt Cầu Lông
          </Link>
        </div>

        {/* Bố cục 2 cột sản phẩm */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>

          {/* Cột trái: Hình ảnh */}
          <div style={{
            backgroundColor: '#161616',
            borderRadius: '12px',
            border: '1px solid #333',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '350px'
          }}>
            <img
              src={`/${product.imageFile}`}
              alt={product.name}
              style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px', objectFit: 'contain' }}
            />
          </div>

          {/* Cột phải: Thông tin sản phẩm */}
          <div>
            {/* Luật của thầy: Duy nhất 1 thẻ H1 trên trang */}
            <h1 style={{ color: '#fd7e14', fontSize: '2.2rem', fontWeight: 'bold', lineHeight: '1.3', marginBottom: '15px' }}>
              {product.name}
            </h1>

            <p style={{ color: '#28a745', fontSize: '28px', fontWeight: 'bold', margin: '10px 0 20px 0' }}>
              Giá: {product.price}
            </p>

            <div style={{ height: '1px', backgroundColor: '#333', margin: '20px 0' }} />

            <h2 style={{ color: '#ffc107', fontSize: '18px', marginBottom: '10px' }}>Mô tả sản phẩm</h2>
            <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '16px', marginBottom: '25px' }}>
              {product.content}
            </p>

            {/* Thông số kỹ thuật lấy động */}
            <ProductOptions slug={slug} />

          </div>
        </div>
      </main>
    </div>
  );
}