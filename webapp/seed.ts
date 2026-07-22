import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Xóa dữ liệu cũ theo thứ tự đúng (foreign key)
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.variation.deleteMany()
  await prisma.attribute.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

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

  // === CATEGORIES ===
  const badminton = await prisma.category.create({
    data: { name: 'Đồ Cầu Lông', slug: 'do-cau-long' },
  })

  const votCauLong = await prisma.category.create({
    data: { name: 'Vợt Cầu Lông', slug: 'vot-cau-long', parentId: badminton.id },
  })

  const giayCauLong = await prisma.category.create({
    data: { name: 'Giày Cầu Lông', slug: 'giay-cau-long', parentId: badminton.id },
  })

  const baloCauLong = await prisma.category.create({
    data: { name: 'Balo Cầu Lông', slug: 'balo-cau-long', parentId: badminton.id },
  })

  const tatCauLong = await prisma.category.create({
    data: { name: 'Tất Cầu Lông', slug: 'tat-cau-long', parentId: badminton.id },
  })

  const pkCauLong = await prisma.category.create({
    data: { name: 'Phụ Kiện Cầu Lông', slug: 'phu-kien-cau-long', parentId: badminton.id },
  })

  const tennis = await prisma.category.create({
    data: { name: 'Tennis', slug: 'tennis' },
  })

  const votTennis = await prisma.category.create({
    data: { name: 'Vợt Tennis', slug: 'vot-tennis', parentId: tennis.id },
  })

  const giayTennis = await prisma.category.create({
    data: { name: 'Giày Tennis', slug: 'giay-tennis', parentId: tennis.id },
  })

  const pkTennis = await prisma.category.create({
    data: { name: 'Bóng & Phụ Kiện Tennis', slug: 'phu-kien-tennis', parentId: tennis.id },
  })

  const pickleball = await prisma.category.create({
    data: { name: 'Pickleball', slug: 'pickleball' },
  })

  const votPickleball = await prisma.category.create({
    data: { name: 'Vợt Pickleball', slug: 'vot-pickleball', parentId: pickleball.id },
  })

  const bongPickleball = await prisma.category.create({
    data: { name: 'Bóng Pickleball', slug: 'bong-pickleball', parentId: pickleball.id },
  })

  const pkPickleball = await prisma.category.create({
    data: { name: 'Phụ Kiện Pickleball', slug: 'phu-kien-pickleball', parentId: pickleball.id },
  })

  // === HELPER ===
  function slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // === SẢN PHẨM - GÁN ĐÚNG CATEGORY ===

  // ---- VỢT CẦU LÔNG ----
  const votCauLongProducts = [
    { title: 'Vợt Cầu Lông Yonex Astrox 99 Pro', price: 4500000, desc: 'Vợt tấn công mạnh mẽ, trọng lượng đầu nặng, phù hợp lối đập cầu uy lực. Công nghệ Rotational Generator System.' },
    { title: 'Vợt Cầu Lông Yonex Nanoflare 800', price: 3800000, desc: 'Vợt tốc độ siêu nhẹ, thiết kế đầu nhẹ cho phản xạ nhanh. Công nghệ Sonic Flare System.' },
    { title: 'Vợt Cầu Lông Victor Thruster K Falcon', price: 3200000, desc: 'Vợt công thủ toàn diện từ Victor, cân bằng giữa sức mạnh và kiểm soát. Vật liệu Free Core.' },
    { title: 'Vợt Cầu Lông Lining Aeronaut 9000C', price: 4200000, desc: 'Vợt cao cấp hàng đầu từ Lining, thiết kế khí động học, siêu nhẹ bền bỉ. Công nghệ Wing Stabilizer.' },
    { title: 'Vợt Cầu Lông Yonex Astrox 100ZZ Kurenai', price: 4800000, desc: 'Phiên bản đặc biệt Astrox 100ZZ, màu đỏ Kurenai sang trọng, dành cho tay vợt chuyên nghiệp.' },
    { title: 'Vợt Cầu Lông Victor DriveX 9X', price: 2900000, desc: 'Vợt cân bằng từ Victor, phù hợp nhiều lối chơi. Công nghệ Dynamic-Hex-Resin và Anti-Torsion.' },
    { title: 'Vợt Cầu Lông Lining Calibar 900C', price: 3500000, desc: 'Vợt điều khiển chính xác, thân cứng, phù hợp lối chơi phòng thủ phản công.' },
    { title: 'Vợt Cầu Lông Yonex Duora Z Strike', price: 3600000, desc: 'Thiết kế 2 mặt khác nhau cho cú thuận và trái, mang lại sự linh hoạt tối đa.' },
  ]

  for (let i = 0; i < votCauLongProducts.length; i++) {
    const p = votCauLongProducts[i]
    await prisma.product.create({
      data: {
        title: p.title,
        slug: slugify(p.title),
        price: p.price,
        categoryId: votCauLong.id,
        imageUrl: '/vot-cau-long-yonex.jpg',
        description: p.desc,
        specifications: 'Chất liệu: Carbon cao cấp | Trọng lượng: 4U (80-84g) | Độ cứng: Cứng vừa | Điểm cân bằng: Đầu nặng | Bảo hành: 3 tháng',
        stockStatus: 'Còn hàng',
        stockQty: Math.floor(Math.random() * 50) + 10,
      },
    })
  }

  // ---- GIÀY CẦU LÔNG ----
  const giayCauLongProducts = [
    { title: 'Giày Cầu Lông Yonex Eclipsion Z3', price: 3200000, desc: 'Giày thi đấu cao cấp, đệm Power Cushion+ siêu êm, bám sân tốt.' },
    { title: 'Giày Cầu Lông Lining Saga Lite', price: 1800000, desc: 'Giày nhẹ thoáng khí, phù hợp tập luyện hàng ngày. Đế cao su chống trượt.' },
    { title: 'Giày Cầu Lông Victor A970ACE', price: 2500000, desc: 'Giày hỗ trợ mắt cá chân, đệm ENERGYMAX, bền bỉ cho lối chơi tốc độ.' },
  ]

  for (const p of giayCauLongProducts) {
    await prisma.product.create({
      data: {
        title: p.title,
        slug: slugify(p.title),
        price: p.price,
        categoryId: giayCauLong.id,
        imageUrl: '/vot-cau-long-yonex.jpg',
        description: p.desc,
        specifications: 'Chất liệu: Mesh + Synthetic Leather | Đế: Cao su non | Đệm: Power Cushion | Size: 39-45',
        stockStatus: 'Còn hàng',
        stockQty: Math.floor(Math.random() * 30) + 10,
      },
    })
  }

  // ---- PHỤ KIỆN CẦU LÔNG ----
  const pkCauLongProducts = [
    { title: 'Quấn Cán Vợt Yonex AC102EX (3 cái)', price: 120000, desc: 'Quấn cán chống trơn, thấm mồ hôi tốt. Hàng chính hãng Yonex.' },
    { title: 'Ống Cầu Lông Yonex Aerosensa 50', price: 650000, desc: 'Cầu lông lông ngỗng tiêu chuẩn thi đấu quốc tế. 12 quả/ống.' },
    { title: 'Bao Vợt Yonex BA92229EX', price: 1800000, desc: 'Bao vợt 9 cây, 3 ngăn chính, có ngăn đựng giày riêng biệt.' },
  ]

  for (const p of pkCauLongProducts) {
    await prisma.product.create({
      data: {
        title: p.title,
        slug: slugify(p.title),
        price: p.price,
        categoryId: pkCauLong.id,
        imageUrl: '/vot-cau-long-yonex.jpg',
        description: p.desc,
        specifications: 'Thương hiệu: Yonex | Xuất xứ: Nhật Bản | Bảo hành: Theo chính sách hãng',
        stockStatus: 'Còn hàng',
        stockQty: Math.floor(Math.random() * 80) + 20,
      },
    })
  }

  // ---- VỢT TENNIS ----
  const votTennisProducts = [
    { title: 'Vợt Tennis Wilson Pro Staff 97 V14', price: 5500000, desc: 'Vợt kiểm soát hàng đầu, sử dụng bởi Roger Federer. Braided Graphite cho cảm giác chắc chắn.' },
    { title: 'Vợt Tennis Babolat Pure Drive 2024', price: 4800000, desc: 'Vợt đa năng phổ biến nhất thế giới. Công nghệ HTR System cho độ cứng và sức mạnh.' },
    { title: 'Vợt Tennis Head Speed MP 2024', price: 4500000, desc: 'Vợt cân bằng giữa tốc độ và kiểm soát. Được Novak Djokovic tin dùng.' },
    { title: 'Vợt Tennis Yonex EZONE 98', price: 4200000, desc: 'Vợt thoải mái và mạnh mẽ, công nghệ Isometric giúp mở rộng sweet spot.' },
    { title: 'Vợt Tennis Wilson Blade 98 V8', price: 5200000, desc: 'Vợt kiểm soát linh hoạt, phù hợp tay vợt toàn diện. Thiết kế sang trọng.' },
  ]

  for (const p of votTennisProducts) {
    await prisma.product.create({
      data: {
        title: p.title,
        slug: slugify(p.title),
        price: p.price,
        categoryId: votTennis.id,
        imageUrl: '/vot-cau-long-yonex.jpg',
        description: p.desc,
        specifications: 'Trọng lượng: 305g | Mặt vợt: 98 sq.in | Pattern: 16x19 | Grip Size: 2-4 | Bảo hành: 6 tháng',
        stockStatus: 'Còn hàng',
        stockQty: Math.floor(Math.random() * 30) + 5,
      },
    })
  }

  // ---- GIÀY TENNIS ----
  const giayTennisProducts = [
    { title: 'Giày Tennis Nike Court Air Zoom Vapor Pro 2', price: 4200000, desc: 'Giày thi đấu chuyên nghiệp, đệm Zoom Air siêu nhạy, bám sân đất nện tốt.' },
    { title: 'Giày Tennis Asics Gel Resolution 9', price: 3500000, desc: 'Giày ổn định vượt trội với công nghệ GEL, phù hợp mọi mặt sân.' },
  ]

  for (const p of giayTennisProducts) {
    await prisma.product.create({
      data: {
        title: p.title,
        slug: slugify(p.title),
        price: p.price,
        categoryId: giayTennis.id,
        imageUrl: '/vot-cau-long-yonex.jpg',
        description: p.desc,
        specifications: 'Chất liệu: Mesh + Synthetic | Đế: Herringbone cao su | Đệm: Zoom Air / GEL | Size: 40-46',
        stockStatus: 'Còn hàng',
        stockQty: Math.floor(Math.random() * 25) + 5,
      },
    })
  }

  // ---- BÓNG & PHỤ KIỆN TENNIS ----
  const pkTennisProducts = [
    { title: 'Bóng Tennis Wilson US Open Extra Duty', price: 180000, desc: 'Bóng tennis chính hãng, tiêu chuẩn giải US Open. 3 quả/lon.' },
    { title: 'Dây Căng Vợt Babolat RPM Blast', price: 350000, desc: 'Dây polyester xoắn, tạo spin mạnh mẽ. Được Rafael Nadal sử dụng.' },
  ]

  for (const p of pkTennisProducts) {
    await prisma.product.create({
      data: {
        title: p.title,
        slug: slugify(p.title),
        price: p.price,
        categoryId: pkTennis.id,
        imageUrl: '/vot-cau-long-yonex.jpg',
        description: p.desc,
        specifications: 'Thương hiệu: Wilson/Babolat | Xuất xứ: Nhập khẩu chính hãng',
        stockStatus: 'Còn hàng',
        stockQty: Math.floor(Math.random() * 100) + 30,
      },
    })
  }

  // ---- VỢT PICKLEBALL ----
  const votPickleballProducts = [
    { title: 'Vợt Pickleball Joola Ben Johns Hyperion CFS 16', price: 5800000, desc: 'Vợt được sử dụng bởi tay vợt số 1 thế giới Ben Johns. Bề mặt Carbon Friction Surface.' },
    { title: 'Vợt Pickleball Selkirk Vanguard Power Air', price: 5200000, desc: 'Vợt công nghệ Air Dynamic Throat, giảm lực cản gió, tăng tốc độ vung vợt.' },
    { title: 'Vợt Pickleball CRBN 1X Power Series', price: 4800000, desc: 'Vợt bề mặt carbon raw T700, tạo spin vượt trội. Được giới chuyên nghiệp ưa chuộng.' },
    { title: 'Vợt Pickleball Head Radical Tour CO', price: 3900000, desc: 'Vợt thiết kế cân bằng, phù hợp mọi lối chơi. Bề mặt Carbon Spin.' },
  ]

  for (const p of votPickleballProducts) {
    await prisma.product.create({
      data: {
        title: p.title,
        slug: slugify(p.title),
        price: p.price,
        categoryId: votPickleball.id,
        imageUrl: '/vot-cau-long-yonex.jpg',
        description: p.desc,
        specifications: 'Trọng lượng: 7.5-8.4 oz | Mặt vợt: 16mm | Core: Polymer Honeycomb | Grip: 4.25" | Bảo hành: 6 tháng',
        stockStatus: 'Còn hàng',
        stockQty: Math.floor(Math.random() * 20) + 5,
      },
    })
  }

  // ---- BÓNG & PHỤ KIỆN PICKLEBALL ----
  const bongPkPickleballProducts = [
    { title: 'Bóng Pickleball Franklin X-40 Outdoor', price: 250000, desc: 'Bóng outdoor tiêu chuẩn USA Pickleball. 3 quả/gói. Bền, bay ổn định.' },
    { title: 'Bóng Pickleball Onix Pure 2 Indoor', price: 180000, desc: 'Bóng indoor nhẹ, 26 lỗ, bay ổn định trong nhà. 3 quả/gói.' },
  ]

  for (const p of bongPkPickleballProducts) {
    await prisma.product.create({
      data: {
        title: p.title,
        slug: slugify(p.title),
        price: p.price,
        categoryId: bongPickleball.id,
        imageUrl: '/vot-cau-long-yonex.jpg',
        description: p.desc,
        specifications: 'Tiêu chuẩn: USA Pickleball Approved | Đường kính: 2.87" | Trọng lượng: 0.9 oz',
        stockStatus: 'Còn hàng',
        stockQty: Math.floor(Math.random() * 100) + 50,
      },
    })
  }

  console.log('✅ Seed hoàn tất! Đã tạo sản phẩm đúng danh mục.')
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
