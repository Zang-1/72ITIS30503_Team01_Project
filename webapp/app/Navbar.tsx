import React from 'react';

const categoryTree = [
  { 
    id: 1, 
    name: 'Cầu Lông', 
    slug: 'cau-long', 
    children: [
      { id: 11, name: 'Vợt Cầu Lông', slug: 'vot-cau-long' },
      { id: 12, name: 'Giày Cầu Lông', slug: 'giay-cau-long' },
      { id: 13, name: 'Balo Cầu Lông', slug: 'balo-cau-long' },
      { id: 14, name: 'Tất Cầu Lông', slug: 'tat-cau-long' },
      { id: 15, name: 'Phụ Kiện', slug: 'phu-kien-cau-long' }
    ] 
  },
  { 
    id: 2, 
    name: 'Tennis', 
    slug: 'tennis', 
    children: [
      { id: 21, name: 'Vợt Tennis', slug: 'vot-tennis' },
      { id: 22, name: 'Giày Tennis', slug: 'giay-tennis' },
      { id: 23, name: 'Bóng & Phụ Kiện', slug: 'phu-kien-tennis' }
    ] 
  },
  { 
    id: 3, 
    name: 'PickleBall', 
    slug: 'pickleball', 
    children: [
      { id: 31, name: 'Vợt PickleBall', slug: 'vot-pickleball' },
      { id: 32, name: 'Bóng PickleBall', slug: 'bong-pickleball' },
      { id: 33, name: 'Phụ Kiện', slug: 'phu-kien-pickleball' }
    ] 
  }
];

export default function Navbar() {
  return (
    <nav className="bg-[#1a1a1a] px-8 py-4 flex flex-wrap gap-8 items-center text-white font-sans border-b border-gray-800">
      {/* 1. Static Pages */}
      <a href="/" className="text-white hover:text-orange-500 font-bold">Home</a>
      <a href="/about" className="text-gray-300 hover:text-white">About</a>
      <a href="/contact" className="text-gray-300 hover:text-white">Contact</a>
      
      {/* 2. Dynamic Categories */}
      {categoryTree.map((parent) => (
        <details key={parent.id} className="relative group cursor-pointer">
          <summary className="text-orange-500 font-bold list-none outline-none select-none flex items-center [&::-webkit-details-marker]:hidden">
            {parent.name} <span className="ml-1 text-sm group-open:rotate-180 transition-transform">▾</span>
          </summary>
          
          <div className="flex flex-col absolute top-full left-0 mt-3 bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 min-w-max z-50 shadow-xl">
            {parent.children.map((child) => (
              <a key={child.id} href={`/category/${child.slug}`} className="text-gray-300 hover:text-white py-1.5 px-2 hover:bg-gray-800 rounded transition-colors">
                {child.name}
              </a>
            ))}
          </div>
        </details>
      ))}
    </nav>
  );
}