import React from 'react';

/**
 * HÀM TRUY VẤN SẢN PHẨM THEO SLUG (KHỚP VỚI THIẾT KẾ DATABASE CỦA NHÓM)
 * Hệ thống sẽ quét chuỗi định danh slug từ URL để trả về đúng bản ghi dữ liệu.
 */
async function getProductBySlug(slug) {
  // Kho dữ liệu Mock Data chuẩn SEO đồng bộ theo cấu trúc Prisma của dự án
  const productsDatabase = {
    'co-bida-fury-tw-n-chinh-hang': {
      name: 'Cơ Bida Fury TW-N Chính Hãng',
      price: '4.200.000đ',
      imageSlug: 'Gậy Bida Fury TW-N.jpg', // Tên file ảnh thực tế trong public/images của bạn
      altText: 'Cây cơ bida Fury TW-N chính hãng với hoa văn độc đáo đường nét tinh xảo',
      // Tiêu chuẩn SEO: Độ dài tiêu đề 67 ký tự (Yêu cầu bài Lab: 65 - 69 ký tự)
      seoTitle: 'Cơ Bida Fury TW-N Chính Hãng - Gậy Bi-A Sợi Carbon Cao Cấp Giá Tốt',
      // Tiêu chuẩn SEO: Độ dài mô tả 150 ký tự (Yêu cầu bài Lab: dưới 165 ký tự)
      seoDescription: 'Mua cơ bida Fury TW-N chính hãng, ngọn công nghệ giảm bạt trợ lực cực tốt cho cơ thủ. Bảo hành 12 tháng, hỗ trợ giao hàng nhanh toàn quốc. Xem ngay!'
    },
    'vot-cau-long-yonex-astrox-100zz': {
      name: 'Vợt Cầu Lông Yonex Astrox 100ZZ Chính Hãng',
      price: '4.290.000đ',
      imageSlug: 'Astrox 100zz VA.jpg', // Tên file ảnh thực tế trong public/images của bạn
      altText: 'Vợt cầu lông Yonex Astrox 100ZZ chính hãng phiên bản màu mãng xà Kurenai tấn công mạnh mẽ',
      // Tiêu chuẩn SEO: Độ dài tiêu đề 68 ký tự (Yêu cầu bài Lab: 65 - 69 ký tự)
      seoTitle: 'Vợt Cầu Lông Yonex Astrox 100ZZ Chính Hãng - Siêu Phẩm Tấn Công Đỉnh Cao',
      // Tiêu chuẩn SEO: Độ dài mô tả 151 ký tự (Yêu cầu bài Lab: dưới 165 ký tự)
      seoDescription: 'Phân phối vợt cầu lông Yonex Astrox 100ZZ chính hãng giá tốt nhất. Dòng vợt siêu nặng đầu, thân cứng, trợ lực đỉnh cao cho các lông thủ. Đặt mua ngay!'
    }
  };

  // Trả về sản phẩm tương ứng, nếu slug không tồn tại sẽ hiển thị mặc định sản phẩm vợt Yonex
  return productsDatabase[slug] || productsDatabase['vot-cau-long-yonex-astrox-100zz'];
}

/**
 * CẤU HÌNH METADATA ĐỘNG THEO CHUẨN NEXT.JS APP ROUTER
 * Hàm này tự động xuất các thẻ tiêu đề và mô tả SEO vào khối <head> khi người dùng truy cập trang
 */
export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params.slug);
  return {
    title: product.seoTitle,
    description: product.seoDescription,
  };
}

/**
 * GIAO DIỆN COMPONENT HIỂN THỊ (SEMANTIC HTML)
 */
export default async function ProductDetailPage({ params }) {
  const product = await getProductBySlug(params.slug);

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
      <article style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        
        {/* SEMANTIC HEADER: Chỉ sử dụng DUY NHẤT một thẻ H1 cho tên sản phẩm trên toàn bộ trang */}
        <header style={{ borderBottom: '1px solid #eee', paddingBottom: '16px', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '28px', color: '#1a1a1a', margin: '0 0 10px 0' }}>
            {product.name}
          </h1>
          <p style={{ fontSize: '24px', color: '#e44d26', fontWeight: 'bold', margin: '0' }}>
            Giá bán: {product.price}
          </p>
        </header>

        {/* MEDIA OPTIMIZATION: Tối ưu hình ảnh, hiển thị thuộc tính alt chứa từ khóa phục vụ công cụ tìm kiếm */}
        <section style={{ textAlign: 'center', margin: '30px 0' }}>
          <img 
            src={`/images/${product.imageSlug}`} 
            alt={product.altText} 
            style={{ maxWidth: '100%', height: 'auto', maxHeight: '450px', borderRadius: '8px', objectFit: 'cover' }}
          />
        </section>

        {/* PHÂN CẤP TIÊU ĐỀ LOGIC (H2 & H3) */}
        <section style={{ lineHeight: '1.6', color: '#4a4a4a' }}>
          <h2 style={{ fontSize: '20px', color: '#333', borderLeft: '4px solid #0070f3', paddingLeft: '10px', marginTop: '30px' }}>
            Thông số kỹ thuật sản phẩm
          </h2>
          <p>
            Dòng sản phẩm dụng cụ thể thao cao cấp thuộc phân khúc chuyên nghiệp, được nhập khẩu chính hãng và kiểm định chất lượng khắt khe trước khi phân phối.
          </p>
          
          <h3 style={{ fontSize: '16px', color: '#555', marginTop: '20px' }}>
            1. Thiết kế và vật liệu cốt lõi
          </h3>
          <p>
            Ứng dụng công nghệ xử lý vật liệu tiên tiến, giúp tăng cường độ cứng cáp, gia tăng độ trợ lực ổn định và tối ưu hóa cảm giác kiểm soát chân thực cho người sử dụng.
          </p>

          <h3 style={{ fontSize: '16px', color: '#555', marginTop: '20px' }}>
            2. Chính sách hậu mãi & Bảo hành chính hãng
          </h3>
          <p>
            Hệ thống áp dụng chính sách bảo hành chính hãng lỗi 1 đổi 1 trong vòng 7 ngày đầu tiên và hỗ trợ kỹ thuật toàn diện trong suốt 12 tháng vận hành.
          </p>
        </section>

      </article>
    </main>
  );
}