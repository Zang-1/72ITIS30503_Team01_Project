'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ProductActions from './ProductActions';
import Breadcrumb from './Breadcrumb';

interface ProductDetailContentProps {
  id: number;
  name: string;
  price: number;
  imageFile: string;
  content: string;
  specifications: string;
  slug?: string;
  categoryName?: string;
  categorySlug?: string;
  sku?: string | null;
  stockQty?: number;
}

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

const HOTLINE = '1900 6969 39';

export default function ProductDetailContent({
  id,
  name,
  price,
  imageFile,
  content,
  specifications,
  categoryName = null as unknown as string,
  categorySlug = null as unknown as string,
  sku = null,
  stockQty = 0,
}: ProductDetailContentProps) {
  const { locale, t } = useLanguage();
  const [tab, setTab] = useState<'desc' | 'spec'>('desc');

  const displayName = locale === 'en' ? translateViToEn(name) : name;
  const displayContent = locale === 'en' ? translateViToEn(content) : content;
  const displaySpecs = locale === 'en' ? translateViToEn(specifications) : specifications;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

  // Visual "list price" so the discount is legible, mirroring retail convention
  const listPrice = Math.round((price * 1.15) / 10000) * 10000;
  const percent = Math.round(((listPrice - price) / listPrice) * 100);
  const inStock = stockQty === undefined || stockQty === null ? true : stockQty > 0;

  const specRows = displaySpecs
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const i = s.indexOf(':');
      return i > -1 ? [s.slice(0, i).trim(), s.slice(i + 1).trim()] : [s, ''];
    });

  const trust = [t('pd_trust_1'), t('pd_trust_2'), t('pd_trust_3'), t('pd_trust_4')];

  return (
    <>
      <Breadcrumb
        items={
          categoryName && categorySlug
            ? [{ label: categoryName, href: `/${categorySlug}` }, { label: displayName }]
            : [{ label: displayName }]
        }
      />

      <div className="ss-container py-6">
        {/* ============ TOP: gallery + buy box ============ */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,460px)_1fr]">
          {/* gallery */}
          <div className="ss-card overflow-hidden p-4">
            <div className="relative overflow-hidden rounded-xl bg-ink-50">
              <span className="absolute left-3 top-3 z-10 rounded-md bg-[#dc2626] px-2.5 py-1 text-[12px] font-bold text-white">
                -{percent}%
              </span>
              <img
                src={imageFile}
                alt={displayName}
                className="aspect-square w-full object-cover object-center"
              />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded-lg border bg-ink-50 ${
                    i === 0 ? 'border-accent-500' : 'border-ink-300'
                  }`}
                >
                  <img src={imageFile} alt={`${displayName} ${i + 1}`} className="aspect-square w-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* buy box */}
          <div className="ss-card p-5 md:p-6">
            <h1 className="text-[21px] font-extrabold leading-snug text-ink-900 md:text-[26px]">
              {displayName}
            </h1>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12.5px] text-ink-500">
              <span className="flex items-center gap-1 text-accent-500">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                  </svg>
                ))}
                <span className="ml-1 text-ink-500">(5.0)</span>
              </span>
              {sku && (
                <span>
                  SKU: <b className="font-mono text-ink-700">{sku}</b>
                </span>
              )}
              <span className={inStock ? 'font-semibold text-emerald-600' : 'font-semibold text-[#dc2626]'}>
                {inStock ? t('product_in_stock') : t('product_out_of_stock')}
              </span>
            </div>

            {/* price block */}
            <div className="mt-4 rounded-xl bg-accent-50 px-5 py-4">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-[30px] font-black leading-none text-[#dc2626]">
                  {formatCurrency(price)}
                </span>
                <span className="text-[15px] font-medium text-ink-500 line-through">
                  {formatCurrency(listPrice)}
                </span>
                <span className="rounded-md bg-[#dc2626] px-2 py-0.5 text-[12px] font-bold text-white">
                  -{percent}%
                </span>
              </div>
              <p className="mt-1.5 text-[12.5px] text-ink-700">{t('home_ship_banner')}</p>
            </div>

            <ProductActions id={id} title={displayName} price={price} imageUrl={imageFile} />

            {/* trust list */}
            <ul className="mt-6 grid gap-2.5 border-t border-ink-300 pt-5 sm:grid-cols-2">
              {trust.map((txt) => (
                <li key={txt} className="flex items-start gap-2 text-[13px] text-ink-700">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {txt}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center gap-2.5 rounded-lg bg-brand-50 px-4 py-3 text-[13px] text-brand-700">
              <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.9" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              <span>
                {t('pd_advice')} <b className="font-bold">{HOTLINE}</b>
              </span>
            </div>
          </div>
        </div>

        {/* ============ TABS ============ */}
        <div className="ss-card mt-6 overflow-hidden">
          <div className="flex border-b border-ink-300 bg-ink-50">
            {([
              ['desc', t('pd_tab_desc')],
              ['spec', t('pd_tab_spec')],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-6 py-3.5 text-[14px] font-bold transition-colors ${
                  tab === key
                    ? 'border-b-2 border-accent-500 bg-white text-accent-600'
                    : 'text-ink-500 hover:text-ink-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="p-5 md:p-6">
            {tab === 'desc' ? (
              <>
                <h2 className="mb-3 text-[16px] font-bold text-ink-900">{t('product_features')}</h2>
                <p className="max-w-4xl text-[14.5px] leading-[1.75] text-ink-700">{displayContent}</p>
              </>
            ) : (
              <>
                <h2 className="mb-3 text-[16px] font-bold text-ink-900">{t('product_specs')}</h2>
                <table className="w-full max-w-2xl overflow-hidden rounded-lg text-[14px]">
                  <tbody>
                    {specRows.map(([k, v], i) => (
                      <tr key={`${k}-${i}`} className={i % 2 ? 'bg-white' : 'bg-ink-50'}>
                        <td className="w-[42%] border border-ink-300 px-4 py-2.5 font-semibold text-ink-700">
                          {k}
                        </td>
                        <td className="border border-ink-300 px-4 py-2.5 text-ink-900">{v || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>

        {categorySlug && (
          <div className="mt-5 text-center">
            <Link
              href={`/${categorySlug}`}
              className="inline-block rounded-lg border border-ink-300 bg-white px-6 py-2.5 text-[13.5px] font-semibold text-ink-700 transition-colors hover:border-brand-500 hover:text-brand-600"
            >
              ← {categoryName}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
