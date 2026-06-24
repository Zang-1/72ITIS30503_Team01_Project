import React from 'react';

export default function Navbar() {
  return (
    <nav style={{ background: '#1a1a1a', padding: '15px 30px', color: '#fff', display: 'flex', gap: '30px', alignItems: 'center', fontFamily: 'Arial' }}>
      {/* 1. Các trang Tĩnh */}
      <a href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Trang Chủ</a>
      <a href="/shop" style={{ color: '#fff', textDecoration: 'none' }}>Shop</a>
      <a href="/cart" style={{ color: '#fff', textDecoration: 'none' }}>Giỏ Hàng</a>
      <a href="/checkout" style={{ color: '#fff', textDecoration: 'none' }}>Thanh Toán</a>
      <a href="/account" style={{ color: '#fff', textDecoration: 'none' }}>Tài Khoản</a>
    </nav>
  );
}