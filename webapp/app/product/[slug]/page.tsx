import React from 'react';
import { Metadata } from 'next';

// 1. Dữ liệu sản phẩm (Có đầy đủ thông tin chuẩn SEO)
async function getProductBySlug() {
  return {
    title: 'Vợt Cầu Lông Yonex Astrox 88D Chính Hãng - Siêu Phẩm Tấn Công Đỉnh Cao', 
    description: 'Mua ngay Vợt Cầu Lông Yonex Astrox 88D chính hãng giá tốt nhất. Cây vợt thiên công cực kỳ mạnh mẽ, hỗ trợ đập cầu uy lực, giao hàng toàn quốc tại cửa hàng.', 
    name: 'Vợt Cầu Lông Yonex Astrox 88D Chính Hãng',
    price: '4.250.000đ',
    imageFile: 'vot-cau-long-yonex.jpg', 
    content: 'Vợt cầu lông Yonex Astrox 88D là lựa chọn hàng đầu cho lối chơi tấn công.'
  };
}

interface Props { params: { slug: string }; }

// 2. CODE TẠO THẺ META SEO (Không hiển thị ra web, chỉ để máy tìm kiếm đọc)
export async function generateMetadata(): Promise<Metadata> {
  const product = await getProductBySlug();
  return {
    title: product.title,       
    description: product.description, 
  };
}

// 3. CODE GIAO DIỆN WEB (Hiển thị cho người dùng xem)
export default async function ProductDetailPage() {
  const product = await getProductBySlug();

  return (
    <article style={{ padding: '40px', color: '#fff', backgroundColor: '#121212', minHeight: '100vh' }}>
      
      {/* Luật của thầy: Duy nhất 1 thẻ H1 trên trang */}
      <h1 style={{ color: '#fd7e14' }}>{product.name}</h1>
      <p style={{ color: '#28a745', fontSize: '20px' }}>Giá: {product.price}</p>

      {/* Luật của thầy: Thẻ ảnh lấy đúng tên file và có alt chứa từ khóa */}
      <img src={`/${product.imageFile}`} alt="Vợt cầu lông Yonex Astrox 88D chính hãng" style={{ maxWidth: '400px' }} />

      {/* Phân cấp nhỏ hơn phải dùng H2, rồi tới H3 */}
      <h2 style={{ color: '#ffc107', marginTop: '20px' }}>Đặc điểm nổi bật</h2>
      <p>{product.content}</p>

      <h3 style={{ color: '#17a2b8', marginTop: '20px' }}>Thông số kỹ thuật</h3>
      <ul>
        <li>Độ cứng: Cứng (Stiff)</li>
        <li>Trọng lượng: 4U</li>
      </ul>
    </article>
  );
}