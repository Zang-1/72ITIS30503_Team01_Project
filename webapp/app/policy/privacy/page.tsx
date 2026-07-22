'use client';

import Navbar from '@/app/Navbar';

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-8 text-orange-500">Bảo Mật Thông Tin</h1>
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>Chúng tôi hiểu rằng quyền riêng tư là rất quan trọng đối với khách hàng. Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân của bạn.</p><p className="mt-2">Thông tin chỉ được sử dụng với mục đích hỗ trợ quá trình đặt hàng, giao hàng và cải thiện dịch vụ. Chúng tôi không chia sẻ thông tin cho bên thứ ba với mục đích thương mại.</p>
        </div>
      </div>
    </>
  );
}
