'use client';

import Navbar from '@/app/Navbar';

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-8 text-orange-500">Chính Sách Giao Hàng</h1>
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>SportStore hỗ trợ giao hàng toàn quốc với thời gian nhanh chóng:</p><ul className="list-disc pl-5 mt-2 space-y-1"><li>Nội thành TP.HCM: Giao hàng trong vòng 24h.</li><li>Các tỉnh thành khác: Thời gian từ 2 đến 5 ngày làm việc.</li><li>Miễn phí vận chuyển cho đơn hàng có giá trị từ 1.000.000đ.</li></ul>
        </div>
      </div>
    </>
  );
}
