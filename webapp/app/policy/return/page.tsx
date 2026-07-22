'use client';

import Navbar from '@/app/Navbar';

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-8 text-orange-500">Chính Sách Đổi Trả</h1>
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>Quý khách có thể đổi trả hàng trong vòng 7 ngày kể từ ngày nhận hàng nếu sản phẩm có lỗi từ nhà sản xuất hoặc do nhầm lẫn từ phía cửa hàng.</p><ul className="list-disc pl-5 mt-2 space-y-1"><li>Sản phẩm phải còn nguyên tem mác, hộp.</li><li>Cung cấp đầy đủ hóa đơn mua hàng.</li><li>Không áp dụng với sản phẩm đã qua sử dụng.</li></ul>
        </div>
      </div>
    </>
  );
}
