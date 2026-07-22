const fs = require('fs');
const path = require('path');

const pages = [
  { path: 'about', title: 'Giới Thiệu', content: '<p>SportStore là hệ thống cửa hàng cung cấp dụng cụ thể thao uy tín hàng đầu. Chúng tôi cam kết mang đến những sản phẩm chất lượng nhất phục vụ niềm đam mê thể thao của bạn.</p>' },
  { path: 'policy/return', title: 'Chính Sách Đổi Trả', content: '<p>Quý khách có thể đổi trả hàng trong vòng 7 ngày kể từ ngày nhận hàng nếu sản phẩm có lỗi từ nhà sản xuất hoặc do nhầm lẫn từ phía cửa hàng.</p><ul className="list-disc pl-5 mt-2 space-y-1"><li>Sản phẩm phải còn nguyên tem mác, hộp.</li><li>Cung cấp đầy đủ hóa đơn mua hàng.</li><li>Không áp dụng với sản phẩm đã qua sử dụng.</li></ul>' },
  { path: 'policy/warranty', title: 'Chính Sách Bảo Hành', content: '<p>Tất cả sản phẩm chính hãng mua tại SportStore đều được bảo hành theo tiêu chuẩn của nhà sản xuất.</p><ul className="list-disc pl-5 mt-2 space-y-1"><li>Vợt cầu lông, tennis: Bảo hành 3 tháng đối với các lỗi từ nhà sản xuất.</li><li>Giày thể thao: Bảo hành keo 6 tháng.</li><li>Phụ kiện: Tùy theo từng loại sản phẩm.</li></ul>' },
  { path: 'policy/shipping', title: 'Chính Sách Giao Hàng', content: '<p>SportStore hỗ trợ giao hàng toàn quốc với thời gian nhanh chóng:</p><ul className="list-disc pl-5 mt-2 space-y-1"><li>Nội thành TP.HCM: Giao hàng trong vòng 24h.</li><li>Các tỉnh thành khác: Thời gian từ 2 đến 5 ngày làm việc.</li><li>Miễn phí vận chuyển cho đơn hàng có giá trị từ 1.000.000đ.</li></ul>' },
  { path: 'policy/privacy', title: 'Bảo Mật Thông Tin', content: '<p>Chúng tôi hiểu rằng quyền riêng tư là rất quan trọng đối với khách hàng. Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân của bạn.</p><p className="mt-2">Thông tin chỉ được sử dụng với mục đích hỗ trợ quá trình đặt hàng, giao hàng và cải thiện dịch vụ. Chúng tôi không chia sẻ thông tin cho bên thứ ba với mục đích thương mại.</p>' },
  { path: 'policy/terms', title: 'Điều Khoản Dịch Vụ', content: '<p>Khi truy cập và mua sắm tại SportStore, quý khách vui lòng tuân thủ các quy định và điều khoản chung của chúng tôi nhằm đảm bảo quyền lợi của chính mình và cửa hàng.</p>' },
  { path: 'guide/buying', title: 'Hướng Dẫn Mua Hàng', content: '<p>Để mua hàng trực tuyến tại SportStore, bạn vui lòng thực hiện các bước sau:</p><ol className="list-decimal pl-5 mt-2 space-y-1"><li>Tìm kiếm và chọn sản phẩm ưng ý.</li><li>Thêm vào giỏ hàng và kiểm tra lại thông tin.</li><li>Tiến hành thanh toán và điền địa chỉ giao hàng.</li><li>Xác nhận đơn hàng và chờ nhân viên liên hệ giao hàng.</li></ol>' },
  { path: 'guide/racket', title: 'Hướng Dẫn Chọn Vợt', content: '<p>Để chọn được cây vợt phù hợp nhất, bạn cần cân nhắc các yếu tố:</p><ul className="list-disc pl-5 mt-2 space-y-1"><li><strong>Trọng lượng (U):</strong> Quyết định độ linh hoạt và sức mạnh.</li><li><strong>Kích thước cán (G):</strong> Vừa vặn với cỡ tay của bạn.</li><li><strong>Độ cứng:</strong> Tùy thuộc vào lực tay (cứng cho chuyên nghiệp, dẻo cho người mới).</li><li><strong>Điểm cân bằng:</strong> Nặng đầu cho tấn công, nhẹ đầu cho phòng thủ, cân bằng cho lối chơi công thủ toàn diện.</li></ul>' },
  { path: 'order-tracking', title: 'Kiểm Tra Đơn Hàng', content: '<p>Vui lòng nhập mã đơn hàng và số điện thoại của bạn để tra cứu tình trạng đơn hàng.</p><div className="mt-6 space-y-4 max-w-md"><input type="text" placeholder="Mã đơn hàng (VD: ORD12345)" className="p-3 bg-[#111111] border border-gray-700 rounded w-full focus:outline-none focus:border-orange-500 transition-colors" /><input type="text" placeholder="Số điện thoại" className="p-3 bg-[#111111] border border-gray-700 rounded w-full focus:outline-none focus:border-orange-500 transition-colors" /><button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded w-full transition-colors">Tra cứu đơn hàng</button></div>' },
];

const basePath = path.join(__dirname, 'app');

pages.forEach(p => {
  const dirPath = path.join(basePath, p.path);
  fs.mkdirSync(dirPath, { recursive: true });
  const filePath = path.join(dirPath, 'page.tsx');
  
  const content = `'use client';

import Navbar from '@/app/Navbar';

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-8 text-orange-500">${p.title}</h1>
        <div className="space-y-4 text-gray-300 leading-relaxed">
          ${p.content}
        </div>
      </div>
    </>
  );
}
`;
  fs.writeFileSync(filePath, content);
  console.log('Created: ' + filePath);
});
