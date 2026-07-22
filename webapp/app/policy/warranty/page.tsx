'use client';

import Navbar from '@/app/Navbar';

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-8 text-orange-500">Chính Sách Bảo Hành</h1>
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>Tất cả sản phẩm chính hãng mua tại SportStore đều được bảo hành theo tiêu chuẩn của nhà sản xuất.</p><ul className="list-disc pl-5 mt-2 space-y-1"><li>Vợt cầu lông, tennis: Bảo hành 3 tháng đối với các lỗi từ nhà sản xuất.</li><li>Giày thể thao: Bảo hành keo 6 tháng.</li><li>Phụ kiện: Tùy theo từng loại sản phẩm.</li></ul>
        </div>
      </div>
    </>
  );
}
