import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Dọn dẹp dữ liệu cũ để tránh xung đột khóa ngoại và rác dữ liệu
  await prisma.variation.deleteMany({})
  await prisma.attribute.deleteMany({})
  await prisma.orderItem.deleteMany({})
  await prisma.order.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.user.deleteMany({})

  // 1. Tạo tài khoản Admin mẫu để test hệ thống
  await prisma.user.upsert({
    where: { email: 'admin@sportstore.com' },
    update: {},
    create: {
      name: 'Admin Giang',
      email: 'admin@sportstore.com',
      password: 'password123',
      role: 'Admin',
    },
  })

  // 2. Tạo Danh mục Cha: Đồ Cầu Lông
  const badminton = await prisma.category.upsert({
    where: { slug: 'do-cau-long' },
    update: {},
    create: { name: 'Đồ Cầu Lông', slug: 'do-cau-long' },
  })

  // 3. Tạo Danh mục Con: Vợt Cầu Lông
  const votCauLong = await prisma.category.upsert({
    where: { slug: 'vot-cau-long' },
    update: {},
    create: { name: 'Vợt Cầu Lông', slug: 'vot-cau-long', parentId: badminton.id },
  })

  // 4. Tạo Danh mục Cha: Đồ Tennis
  const tennis = await prisma.category.upsert({
    where: { slug: 'do-tennis' },
    update: {},
    create: { name: 'Đồ Tennis', slug: 'do-tennis' },
  })

  // 5. Tạo Danh mục Con: Vợt Tennis
  const votTennis = await prisma.category.upsert({
    where: { slug: 'vot-tennis' },
    update: {},
    create: { name: 'Vợt Tennis', slug: 'vot-tennis', parentId: tennis.id },
  })

  // 6. Tạo các Sản phẩm Mẫu
  const variableProduct = await prisma.product.upsert({
    where: { slug: 'vot-cau-long-yonex-astrox-88d' },
    update: {},
    create: {
      title: 'Vợt Cầu Lông Yonex Astrox 88D Chính Hãng',
      slug: 'vot-cau-long-yonex-astrox-88d',
      price: 4250000,
      imageUrl: '/vot-cau-long-yonex.jpg',
      description: 'Vợt cầu lông Yonex Astrox 88D chính hãng là siêu phẩm thiên công mạnh mẽ, hỗ trợ những cú đập cầu uy lực từ cuối sân. Đây là lựa chọn hàng đầu của các vận động viên chuyên nghiệp trên toàn thế giới.',
      specifications: 'Độ cứng: Cứng (Stiff) | Trọng lượng: 4U (tb. 83g) | Chu vi cán vợt: G5 | Sức căng tối đa: 28 LBS (12.5 kg) | Xuất xứ: Nhật Bản (Made in Japan)',
      categoryId: votCauLong.id
    }
  })

  await prisma.product.upsert({
    where: { slug: 'vot-cau-long-yonex-astrox-100zz' },
    update: {},
    create: {
      title: 'Vợt Cầu Lông Yonex Astrox 100ZZ Kurenai',
      slug: 'vot-cau-long-yonex-astrox-100zz',
      price: 4890000,
      imageUrl: '/vot-cau-long-yonex.jpg',
      description: 'Yonex Astrox 100ZZ Kurenai là cây vợt cao cấp nhất dòng Astrox, hướng đến lối chơi công thủ toàn diện cực kỳ linh hoạt. Thân vợt siêu cứng và đũa vợt mỏng giúp tối ưu hóa tốc độ vung vợt.',
      specifications: 'Độ cứng: Siêu cứng (Extra Stiff) | Trọng lượng: 3U/4U | Chu vi cán vợt: G5 | Điểm cân bằng: Nặng đầu (Head Heavy) | Xuất xứ: Nhật Bản',
      categoryId: votCauLong.id
    }
  })

  await prisma.product.upsert({
    where: { slug: 'vot-tennis-wilson-pro-staff-97' },
    update: {},
    create: {
      title: 'Vợt Tennis Wilson Pro Staff 97 v14 Chính Hãng',
      slug: 'vot-tennis-wilson-pro-staff-97',
      price: 6250000,
      imageUrl: '/vot-cau-long-yonex.jpg',
      description: 'Vợt tennis Wilson Pro Staff 97 v14 chính hãng là dòng vợt chuyên nghiệp huyền thoại, mang lại cảm giác bóng cực tốt và độ chính xác tối đa trong từng cú đánh. Phiên bản v14 được nâng cấp với công nghệ Braid 45 nâng cao độ ổn định và uốn cong tối ưu.',
      specifications: 'Trọng lượng chưa đan dây: 315g | Mặt vợt: 97 sq.in. | Điểm cân bằng: 31cm | Mật độ dây: 16x19 | Chiều dài: 27 in | Độ cứng: 66 | Xuất xứ: USA/China',
      categoryId: votTennis.id
    }
  })

  await prisma.product.upsert({
    where: { slug: 'vot-tennis-babolat-pure-aero-2023' },
    update: {},
    create: {
      title: 'Vợt Tennis Babolat Pure Aero 2023 Chính Hãng',
      slug: 'vot-tennis-babolat-pure-aero-2023',
      price: 5850000,
      imageUrl: '/vot-cau-long-yonex.jpg',
      description: 'Babolat Pure Aero 2023 chính hãng là dòng vợt tạo xoáy cực đỉnh được huyền thoại Rafael Nadal sử dụng. Vợt sở hữu khung khí động học Aero Modular3 giúp tăng tốc độ vung vợt và công nghệ NF2-Tech giúp giảm rung chấn hiệu quả.',
      specifications: 'Trọng lượng chưa đan dây: 300g | Mặt vợt: 100 sq.in. | Điểm cân bằng: 32cm | Mật độ dây: 16x19 | Chiều dài: 27 in | Độ cứng: 69 | Xuất xứ: Pháp/Trung Quốc',
      categoryId: votTennis.id
    }
  })

  // Đảm bảo tạo Attribute và Variation để tương thích với các nhánh khác
  const weightAttribute = await prisma.attribute.create({
    data: {
      name: 'Trọng lượng',
      productId: variableProduct.id,
    }
  })

  await prisma.variation.create({
    data: {
      value: '3U',
      sku: 'YNX-88D-3U',
      regularPrice: 4250000,
      stockStatus: 'In stock',
      stockQty: 10,
      productId: variableProduct.id,
      attributeId: weightAttribute.id,
    }
  })

  await prisma.variation.create({
    data: {
      value: '4U',
      sku: 'YNX-88D-4U',
      regularPrice: 4250000,
      stockStatus: 'Out of stock',
      stockQty: 0,
      productId: variableProduct.id,
      attributeId: weightAttribute.id,
    }
  })

  console.log('--- Da bom du lieu mau (Seeder) thanh cong vao Database! ---')
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })