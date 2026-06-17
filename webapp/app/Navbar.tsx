import React from 'react';

// Dữ liệu Cây danh mục (Category Tree) giả lập từ Database
const categoryTree = [
  { id: 1, name: 'Đồ Cầu Lông', slug: 'do-cau-long', children: [{ id: 2, name: 'Vợt Cầu Lông', slug: 'vot-cau-long' }] },
  { id: 3, name: 'Đồ Billiards', slug: 'do-billiards', children: [{ id: 4, name: 'Cơ Billiards', slug: 'co-billiards' }] }
];

export default function Navbar() {
  return (
    <nav style={{ background: '#1a1a1a', padding: '15px 30px', color: '#fff', display: 'flex', gap: '30px', alignItems: 'center', fontFamily: 'Arial' }}>
      {/* 1. Các trang Tĩnh */}
      <a href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Trang Chủ</a>
      <a href="/about" style={{ color: '#fff', textDecoration: 'none' }}>Giới Thiệu</a>
      <a href="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Liên Hệ</a>
      
      {/* 2. Vòng lặp lấy dữ liệu Động dùng hàm .map() */}
      {categoryTree.map((parent) => (
        <div key={parent.id} style={{ position: 'relative', cursor: 'pointer' }}>
          <span style={{ color: '#fd7e14', fontWeight: 'bold' }}>{parent.name} ▾</span>
          
          <div style={{ display: 'flex', gap: '15px', paddingLeft: '10px', fontSize: '14px', marginTop: '5px' }}>
            {parent.children.map((child) => (
              <a key={child.id} href={`/category/${child.slug}`} style={{ color: '#bbb', textDecoration: 'none' }}>
                {child.name}
              </a>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}