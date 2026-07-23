'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ProductActions from './ProductActions';

interface ProductDetailContentProps {
  id: number;
  name: string;
  price: number;
  imageFile: string;
  content: string;
  specifications: string;
}

// Dictionary dịch nội dung DB từ Việt → Anh
const viToEnMap: Record<string, string> = {
  // Product names
  'Vợt Cầu Lông': 'Badminton Racket',
  'Vợt Tennis': 'Tennis Racket',
  'Vợt Pickleball': 'Pickleball Paddle',
  'Giày Cầu Lông': 'Badminton Shoes',
  'Giày Tennis': 'Tennis Shoes',
  'Quấn Cán Vợt': 'Racket Grip Tape',
  'Ống Cầu Lông': 'Shuttlecock Tube',
  'Bao Vợt': 'Racket Bag',
  'Bóng Tennis': 'Tennis Ball',
  'Bóng Pickleball': 'Pickleball Ball',
  'Dây Căng Vợt': 'Racket String',
  'Lưới Cầu Lông': 'Badminton Net',
  'Chính Hãng': 'Authentic',
  'Cao Cấp': 'Premium',
  'Tiêu Chuẩn Thi Đấu': 'Tournament Standard',
  'Chống Trơn': 'Anti-Slip',
  // Description terms
  'Vợt tấn công mạnh mẽ': 'Powerful offensive racket',
  'trọng lượng đầu nặng': 'head-heavy balance',
  'phù hợp lối đập cầu uy lực': 'suitable for powerful smash style',
  'Công nghệ': 'Technology',
  'Vợt tốc độ siêu nhẹ': 'Ultra-lightweight speed racket',
  'thiết kế đầu nhẹ cho phản xạ nhanh': 'head-light design for quick reflexes',
  'Vợt công thủ toàn diện': 'All-round attack-defense racket',
  'cân bằng giữa sức mạnh và kiểm soát': 'balanced between power and control',
  'Vật liệu': 'Material',
  'Vợt cao cấp hàng đầu': 'Top premium racket',
  'thiết kế khí động học': 'aerodynamic design',
  'siêu nhẹ bền bỉ': 'ultra-light and durable',
  'Phiên bản đặc biệt': 'Special edition',
  'sang trọng': 'premium',
  'dành cho tay vợt chuyên nghiệp': 'for professional players',
  'Vợt cân bằng': 'Balanced racket',
  'phù hợp nhiều lối chơi': 'suitable for various playing styles',
  'Vợt điều khiển chính xác': 'Precision control racket',
  'thân cứng': 'stiff shaft',
  'phù hợp lối chơi phòng thủ phản công': 'suitable for defensive counter-attack play',
  'Thiết kế 2 mặt khác nhau cho cú thuận và trái': 'Dual-side design for forehand and backhand',
  'mang lại sự linh hoạt tối đa': 'providing maximum flexibility',
  'Giày thi đấu cao cấp': 'Premium competition shoes',
  'đệm': 'cushioning',
  'siêu êm': 'ultra-comfortable',
  'bám sân tốt': 'excellent court grip',
  'Giày nhẹ thoáng khí': 'Lightweight breathable shoes',
  'phù hợp tập luyện hàng ngày': 'suitable for daily training',
  'Đế cao su chống trượt': 'Non-slip rubber sole',
  'Giày hỗ trợ mắt cá chân': 'Ankle-support shoes',
  'bền bỉ cho lối chơi tốc độ': 'durable for speed play',
  'Quấn cán chống trơn': 'Anti-slip grip tape',
  'thấm mồ hôi tốt': 'excellent sweat absorption',
  'Hàng chính hãng': 'Authentic product',
  'Cầu lông lông ngỗng tiêu chuẩn thi đấu quốc tế': 'International tournament-standard goose feather shuttlecocks',
  'quả/ống': 'pcs/tube',
  'Bao vợt': 'Racket bag',
  'ngăn chính': 'main compartments',
  'có ngăn đựng giày riêng biệt': 'with separate shoe compartment',
  'Vợt kiểm soát hàng đầu': 'Top control racket',
  'sử dụng bởi': 'used by',
  'cho cảm giác chắc chắn': 'for a solid feel',
  'Vợt đa năng phổ biến nhất thế giới': "World's most popular versatile racket",
  'cho độ cứng và sức mạnh': 'for stiffness and power',
  'Vợt cân bằng giữa tốc độ và kiểm soát': 'Racket balanced between speed and control',
  'Được': 'Used by',
  'tin dùng': 'trusted',
  'Vợt thoải mái và mạnh mẽ': 'Comfortable and powerful racket',
  'giúp mở rộng': 'helps expand the',
  'Vợt kiểm soát linh hoạt': 'Flexible control racket',
  'phù hợp tay vợt toàn diện': 'suitable for all-round players',
  'Thiết kế sang trọng': 'Premium design',
  'Giày thi đấu chuyên nghiệp': 'Professional competition shoes',
  'siêu nhạy': 'ultra-responsive',
  'bám sân đất nện tốt': 'excellent clay court grip',
  'Giày ổn định vượt trội': 'Superior stability shoes',
  'phù hợp mọi mặt sân': 'suitable for all court surfaces',
  'Vợt được sử dụng bởi tay vợt số 1 thế giới': "Paddle used by the world's #1 player",
  'Bề mặt': 'Surface',
  'Vợt công nghệ': 'Technology paddle',
  'giảm lực cản gió': 'reduces wind resistance',
  'tăng tốc độ vung vợt': 'increases swing speed',
  'Vợt bề mặt carbon': 'Carbon surface paddle',
  'tạo spin vượt trội': 'creates superior spin',
  'Được giới chuyên nghiệp ưa chuộng': 'Favored by professionals',
  'Vợt thiết kế cân bằng': 'Balanced design paddle',
  'phù hợp mọi lối chơi': 'suitable for all playing styles',
  'Bóng outdoor tiêu chuẩn': 'Standard outdoor ball',
  'Bền': 'Durable',
  'bay ổn định': 'stable flight',
  'Bóng indoor nhẹ': 'Lightweight indoor ball',
  'lỗ': 'holes',
  'bay ổn định trong nhà': 'stable flight indoors',
  'quả/gói': 'pcs/pack',
  'Bóng tennis chính hãng': 'Authentic tennis ball',
  'tiêu chuẩn giải': 'tournament standard',
  'Dây polyester xoắn': 'Twisted polyester string',
  'tạo spin mạnh mẽ': 'creates powerful spin',
  'sử dụng': 'used',
  // Specifications
  'Chất liệu': 'Material',
  'Carbon cao cấp': 'Premium Carbon',
  'Trọng lượng': 'Weight',
  'Độ cứng': 'Stiffness',
  'Cứng vừa': 'Medium Stiff',
  'Điểm cân bằng': 'Balance Point',
  'Đầu nặng': 'Head Heavy',
  'Bảo hành': 'Warranty',
  'tháng': 'months',
  'Mesh + Synthetic Leather': 'Mesh + Synthetic Leather',
  'Đế': 'Sole',
  'Cao su non': 'Soft Rubber',
  'Đệm': 'Cushion',
  'Size': 'Size',
  'Mặt vợt': 'Head Size',
  'Pattern': 'Pattern',
  'Grip Size': 'Grip Size',
  'Thương hiệu': 'Brand',
  'Xuất xứ': 'Origin',
  'Nhật Bản': 'Japan',
  'Theo chính sách hãng': 'Per manufacturer policy',
  'Nhập khẩu chính hãng': 'Authentic Import',
  'Tiêu chuẩn': 'Standard',
  'Đường kính': 'Diameter',
  'Core': 'Core',
  'Herringbone cao su': 'Herringbone Rubber',
  'Polymer Honeycomb': 'Polymer Honeycomb',
  'Còn hàng': 'In Stock',
};

function translateViToEn(text: string): string {
  let result = text;
  // Sort by length descending so longer phrases are replaced first
  const sortedKeys = Object.keys(viToEnMap).sort((a, b) => b.length - a.length);
  for (const vi of sortedKeys) {
    const en = viToEnMap[vi];
    result = result.replaceAll(vi, en);
  }
  return result;
}

export default function ProductDetailContent({ id, name, price, imageFile, content, specifications }: ProductDetailContentProps) {
  const { locale, t } = useLanguage();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  // Dịch nội dung DB nếu locale là English
  const displayName = locale === 'en' ? translateViToEn(name) : name;
  const displayContent = locale === 'en' ? translateViToEn(content) : content;
  const displaySpecs = locale === 'en' ? translateViToEn(specifications) : specifications;

  return (
    <article className="p-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
      {/* Cột ảnh */}
      <div className="w-full md:w-1/2">
        <img 
          src={imageFile} 
          alt={displayName} 
          className="w-full rounded-xl border border-gray-800 object-cover bg-zinc-900" 
        />
      </div>
      
      {/* Cột thông tin */}
      <div className="w-full md:w-1/2">
        {/* Luật của thầy: Duy nhất 1 thẻ H1 trên trang */}
        <h1 className="text-3xl font-bold text-orange-500 mb-4">
          {displayName}
        </h1>
        
        <p className="text-3xl font-bold text-emerald-500 mb-6">
          {formatCurrency(price)}
        </p>

        {/* Nút thêm vào giỏ hàng và tùy chọn */}
        <div className="mb-10">
          <ProductActions id={id} title={displayName} price={price} imageUrl={imageFile} />
        </div>

        {/* Phân cấp nhỏ hơn phải dùng H2, rồi tới H3 */}
        <h2 className="text-2xl font-bold text-amber-500 mb-4 pb-2 border-b border-gray-800">
          {t('product_features')}
        </h2>
        <div className="text-gray-300 mb-8 leading-relaxed whitespace-pre-wrap">
          {displayContent}
        </div>

        <h3 className="text-xl font-bold text-cyan-500 mb-4 pb-2 border-b border-gray-800">
          {t('product_specs')}
        </h3>
        <div className="text-gray-300 space-y-2 whitespace-pre-wrap">
          {displaySpecs}
        </div>
      </div>
    </article>
  );
}
