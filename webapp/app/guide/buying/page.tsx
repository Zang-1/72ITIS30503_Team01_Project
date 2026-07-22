'use client';

import Navbar from '@/app/Navbar';

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-8 text-orange-500">Hướng Dẫn Mua Hàng</h1>
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>Để mua hàng trực tuyến tại SportStore, bạn vui lòng thực hiện các bước sau:</p><ol className="list-decimal pl-5 mt-2 space-y-1"><li>Tìm kiếm và chọn sản phẩm ưng ý.</li><li>Thêm vào giỏ hàng và kiểm tra lại thông tin.</li><li>Tiến hành thanh toán và điền địa chỉ giao hàng.</li><li>Xác nhận đơn hàng và chờ nhân viên liên hệ giao hàng.</li></ol>
        </div>
      </div>
    </>
  );
}
