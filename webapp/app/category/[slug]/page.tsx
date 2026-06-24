import React from 'react';
import Navbar from '../../Navbar';
import Link from 'next/link';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Giả lập danh sách sản phẩm theo Category (Thực tế sẽ gọi từ Database)
  const products = [
    {
      id: 1,
      name: 'Vợt cầu lông Yonex Astrox 88D chính hãng',
      slug: 'vot-cau-long-yonex-astrox-88d',
      price: '4.250.000đ',
      image: '/vot-cau-long-yonex.jpg',
      badge: 'Bán chạy',
    },
    {
      id: 2,
      name: 'Vợt cầu lông Victor Thruster F C (Mã JP)',
      slug: 'vot-cau-long-victor-thruster-fc',
      price: '3.500.000đ',
      image: '/vot-cau-long-victor-thruster.jpg', 
    },
    {
      id: 3,
      name: 'Vợt cầu lông Lining Aeronaut 9000C',
      slug: 'vot-cau-long-lining-aeronaut-9000c',
      price: '4.000.000đ',
      image: '/vot-cau-long-lining.jpg',
      badge: 'Mới',
    }
  ];

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
      <Navbar />
      <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#fd7e14', fontSize: '2rem', marginBottom: '10px', textTransform: 'capitalize' }}>
          Danh mục: {slug.replace(/-/g, ' ')}
        </h1>
        <p style={{ color: '#aaa', marginBottom: '40px' }}>
          Khám phá các sản phẩm đồ thể thao chuyên nghiệp với thông số kỹ thuật chuẩn xác.
        </p>

        {/* Lưới sản phẩm */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
          {products.map((product) => (
            <Link 
              href={`/product/${product.slug}`} 
              key={product.id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ 
                backgroundColor: '#1a1a1a', 
                borderRadius: '12px', 
                overflow: 'hidden', 
                border: '1px solid #333',
                transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                cursor: 'pointer',
              }}
              >
                {/* Khu vực ảnh */}
                <div style={{ position: 'relative', height: '250px', backgroundColor: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                  />
                  {product.badge && (
                    <span style={{ 
                      position: 'absolute', top: '10px', left: '10px', 
                      backgroundColor: product.badge === 'Mới' ? '#28a745' : '#dc3545', 
                      color: '#fff', fontSize: '12px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px' 
                    }}>
                      {product.badge}
                    </span>
                  )}
                </div>
                
                {/* Thông tin sản phẩm */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '18px', margin: '0 0 10px 0', lineHeight: '1.4' }}>{product.name}</h3>
                  <p style={{ color: '#fd7e14', fontSize: '20px', fontWeight: 'bold', margin: '0 0 15px 0' }}>{product.price}</p>
                  
                  <button style={{ 
                    width: '100%', padding: '10px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' 
                  }}>
                    Xem chi tiết
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