'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

// Dữ liệu Cây danh mục (Category Tree) giả lập từ Database
const categoryTree = [
  { id: 1, name: 'Đồ Cầu Lông', slug: 'do-cau-long', children: [{ id: 2, name: 'Vợt Cầu Lông', slug: 'vot-cau-long' }] },
  { id: 3, name: 'Đồ Tennis', slug: 'do-tennis', children: [{ id: 4, name: 'Vợt Tennis', slug: 'vot-tennis' }] }
];

export default function Navbar() {
  const { totalItems, setIsOpen } = useCart();
  const [isBumped, setIsBumped] = useState(false);

  // Hiệu ứng micro-animation nhảy số lượng trên badge khi thêm hàng
  useEffect(() => {
    if (totalItems === 0) return;
    setIsBumped(true);
    const timer = setTimeout(() => setIsBumped(false), 300);
    return () => clearTimeout(timer);
  }, [totalItems]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo/Brand */}
        <div className="flex items-center gap-8">
          <a href="/" className="text-xl font-black tracking-widest text-white hover:text-amber-500 transition-colors duration-200">
            SPORT<span className="text-amber-500 font-medium">STORE</span>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-zinc-300">
            <a href="/" className="hover:text-white transition-colors duration-200">Trang Chủ</a>
            <a href="/about" className="hover:text-white transition-colors duration-200">Giới Thiệu</a>
            <a href="/contact" className="hover:text-white transition-colors duration-200">Liên Hệ</a>
            
            {/* Category Dropdowns */}
            {categoryTree.map((parent) => (
              <div key={parent.id} className="relative group cursor-pointer py-2">
                <span className="hover:text-white text-zinc-300 transition-colors duration-200 flex items-center gap-1">
                  {parent.name}
                  <svg className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
                
                {/* Dropdown Menu */}
                <div className="absolute left-0 mt-1 hidden group-hover:block w-48 rounded-lg bg-zinc-900 border border-zinc-800 p-2 shadow-xl animate-fade-in">
                  {parent.children.map((child) => (
                    <a
                      key={child.id}
                      href={`/category/${child.slug}`}
                      className="block px-4 py-2 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                    >
                      {child.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Action Items (Cart) */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-700 transition-all duration-200"
            aria-label="Xem giỏ hàng"
          >
            {/* Shopping Bag Icon */}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>

            {/* Badge Count */}
            {totalItems > 0 && (
              <span
                className={`absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black text-black ring-2 ring-zinc-950 transition-transform duration-300 ${
                  isBumped ? 'scale-130' : 'scale-100'
                }`}
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}