'use client';

import Navbar from '@/app/Navbar';

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-8 text-orange-500">Hướng Dẫn Chọn Vợt</h1>
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>Để chọn được cây vợt phù hợp nhất, bạn cần cân nhắc các yếu tố:</p><ul className="list-disc pl-5 mt-2 space-y-1"><li><strong>Trọng lượng (U):</strong> Quyết định độ linh hoạt và sức mạnh.</li><li><strong>Kích thước cán (G):</strong> Vừa vặn với cỡ tay của bạn.</li><li><strong>Độ cứng:</strong> Tùy thuộc vào lực tay (cứng cho chuyên nghiệp, dẻo cho người mới).</li><li><strong>Điểm cân bằng:</strong> Nặng đầu cho tấn công, nhẹ đầu cho phòng thủ, cân bằng cho lối chơi công thủ toàn diện.</li></ul>
        </div>
      </div>
    </>
  );
}
