'use client';

import Navbar from '@/app/Navbar';

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-8 text-orange-500">Điều Khoản Dịch Vụ</h1>
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>Khi truy cập và mua sắm tại SportStore, quý khách vui lòng tuân thủ các quy định và điều khoản chung của chúng tôi nhằm đảm bảo quyền lợi của chính mình và cửa hàng.</p>
        </div>
      </div>
    </>
  );
}
