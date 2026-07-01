import React from 'react';
import Navbar from '../Navbar';
import Link from 'next/link';

export default function ShopPage() {
  const categories = [
    {
      id: 1,
      name: 'Đồ Cầu Lông',
      slug: 'vot-cau-long',
      image: '/vot-cau-long-yonex.jpg', // Dùng tạm ảnh vợt
      description: 'Khám phá các dòng vợt và phụ kiện cầu lông chuyên nghiệp, mang đến độ chính xác tuyệt đối.'
    },
    {
      id: 2,
      name: 'Đồ Tennis',
      slug: 'vot-tennis',
      image: '/vot-cau-long-yonex.jpg', // Dùng tạm ảnh
      description: 'Cung cấp vợt tennis và trang phục thể thao chất lượng cao cho các tay vợt.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
      <Navbar />
      <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#fd7e14', fontSize: '2rem', marginBottom: '10px', textAlign: 'center' }}>
          Chọn Môn Thể Thao Của Bạn
        </h1>
        <p style={{ color: '#aaa', marginBottom: '40px', textAlign: 'center' }}>
          Bạn đang tìm kiếm thiết bị cho môn thể thao nào?
        </p>

        {/* Lưới danh mục */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px', justifyContent: 'center' }}>
          {categories.map((cat) => (
            <Link 
              href={`/category/${cat.slug}`} 
              key={cat.id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ 
                backgroundColor: '#1a1a1a', 
                borderRadius: '12px', 
                overflow: 'hidden', 
                border: '1px solid #333',
                transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                cursor: 'pointer',
                textAlign: 'center'
              }}
              >
                {/* Khu vực ảnh danh mục */}
                <div style={{ position: 'relative', height: '250px', backgroundColor: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: '8px' }} 
                  />
                </div>
                
                {/* Thông tin danh mục */}
                <div style={{ padding: '30px' }}>
                  <h3 style={{ fontSize: '24px', margin: '0 0 15px 0', color: '#fd7e14' }}>{cat.name}</h3>
                  <p style={{ color: '#aaa', fontSize: '15px', lineHeight: '1.6', margin: '0 0 25px 0' }}>{cat.description}</p>
                  
                  <button style={{ 
                    width: '100%', padding: '15px', backgroundColor: '#fd7e14', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px'
                  }}>
                    Khám phá ngay
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
