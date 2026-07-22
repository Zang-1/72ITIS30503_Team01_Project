'use client';

import Navbar from '@/app/Navbar';

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-8 text-orange-500">Kiểm Tra Đơn Hàng</h1>
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>Vui lòng nhập mã đơn hàng và số điện thoại của bạn để tra cứu tình trạng đơn hàng.</p><div className="mt-6 space-y-4 max-w-md"><input type="text" placeholder="Mã đơn hàng (VD: ORD12345)" className="p-3 bg-[#111111] border border-gray-700 rounded w-full focus:outline-none focus:border-orange-500 transition-colors" /><input type="text" placeholder="Số điện thoại" className="p-3 bg-[#111111] border border-gray-700 rounded w-full focus:outline-none focus:border-orange-500 transition-colors" /><button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded w-full transition-colors">Tra cứu đơn hàng</button></div>
        </div>
      </div>
    </>
  );
}
