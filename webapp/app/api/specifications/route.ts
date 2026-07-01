// Bắt buộc: Cấu hình API này chạy trên môi trường Edge Runtime
export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug') || '';

  let specs = [
    { value: '3U', sku: 'GENERIC-3U', stockStatus: 'In stock', stockQty: 10 },
    { value: '4U', sku: 'GENERIC-4U', stockStatus: 'In stock', stockQty: 10 },
  ];

  if (slug === 'vot-cau-long-yonex-astrox-88d') {
    specs = [
      { value: '3U', sku: 'YNX-88D-3U', stockStatus: 'In stock', stockQty: 10 },
      { value: '4U', sku: 'YNX-88D-4U', stockStatus: 'Out of stock', stockQty: 0 },
    ];
  } else if (slug === 'vot-cau-long-victor-thruster-fc') {
    specs = [
      { value: '3U', sku: 'VCT-TF-3U', stockStatus: 'In stock', stockQty: 5 },
      { value: '4U', sku: 'VCT-TF-4U', stockStatus: 'In stock', stockQty: 2 },
    ];
  } else if (slug === 'vot-cau-long-lining-aeronaut-9000c') {
    specs = [
      { value: '3U', sku: 'LNING-9000C-3U', stockStatus: 'In stock', stockQty: 15 },
      { value: '4U', sku: 'LNING-9000C-4U', stockStatus: 'In stock', stockQty: 8 },
    ];
  }

  return Response.json({
    // Trả thêm timestamp để chứng minh đây là dữ liệu Real-time (Thời gian thực)
    timestamp: new Date().toISOString(),
    specifications: specs
  });
}
