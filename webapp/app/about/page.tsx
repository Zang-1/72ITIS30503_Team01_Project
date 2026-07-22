'use client';

import Navbar from '@/app/Navbar';

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-8 text-orange-500">Giới Thiệu</h1>
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>SportStore là hệ thống cửa hàng cung cấp dụng cụ thể thao uy tín hàng đầu. Chúng tôi cam kết mang đến những sản phẩm chất lượng nhất phục vụ niềm đam mê thể thao của bạn.</p>
        </div>
      </div>
    </>
  );
}
