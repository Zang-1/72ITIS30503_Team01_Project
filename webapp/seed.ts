import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
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

  const badminton = await prisma.category.upsert({
    where: { slug: 'do-cau-long' },
    update: {},
    create: { name: 'Đồ Cầu Lông', slug: 'do-cau-long' },
  })

  const votCauLong = await prisma.category.upsert({
    where: { slug: 'vot-cau-long' },
    update: {},
    create: { name: 'Vợt Cầu Lông', slug: 'vot-cau-long', parentId: badminton.id },
  })


  const tennis = await prisma.category.upsert({
    where: { slug: 'tennis' },
    update: {},
    create: { name: 'Tennis', slug: 'tennis' },
  })

  const votTennis = await prisma.category.upsert({
    where: { slug: 'vot-tennis' },
    update: {},
    create: { name: 'Vợt Tennis', slug: 'vot-tennis', parentId: tennis.id },
  })

  const pickleball = await prisma.category.upsert({
    where: { slug: 'pickleball' },
    update: {},
    create: { name: 'Pickleball', slug: 'pickleball' },
  })

  const votPickleball = await prisma.category.upsert({
    where: { slug: 'vot-pickleball' },
    update: {},
    create: { name: 'Vợt Pickleball', slug: 'vot-pickleball', parentId: pickleball.id },
  })

  const categoryIds = [votCauLong.id, votTennis.id, votPickleball.id]

  const tenSanPhamNgon = [
    'Vợt Cầu Lông Yonex Astrox 99', 'Vợt Cầu Lông Victor Thruster K', 'Vợt Cầu Lông Lining Aeronaut 9000',
    'Vợt Cầu Lông Yonex Nanoflare 800', 'Vợt Cầu Lông Lining Calibar 900C', 'Vợt Cầu Lông Victor DriveX 9X',
    'Vợt Tennis Wilson Pro Staff', 'Vợt Tennis Babolat Pure Drive', 'Vợt Tennis Head Speed',
    'Vợt Pickleball Joola', 'Vợt Pickleball Selkirk', 'Vợt Pickleball CRBN',
    'Giày Cầu Lông Yonex Eclipsion', 'Giày Cầu Lông Lining', 'Giày Cầu Lông Victor',
    'Bao Vợt Yonex Chính Hãng', 'Bóng Tennis Wilson Cao Cấp', 'Bóng Pickleball Franklin', 'Lưới Cầu Lông Yonex Tiêu Chuẩn',
    'Quấn Cán Vợt Chống Trơn Yonex', 'Ống Cầu Lông Tiêu Chuẩn Thi Đấu'
  ]


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

  for (let i = 0; i < 30; i++) {
    const baseTitle = faker.helpers.arrayElement(tenSanPhamNgon);
    const suffix = faker.helpers.arrayElement(['Pro', 'Max', 'Elite', 'Tour', 'Lite', 'Plus', '']);
    const title = suffix ? `${baseTitle} ${suffix}` : baseTitle;
    
    await prisma.product.create({
      data: {
        title,
        slug: `${slugify(title)}-${i + 1}`,
        price: faker.number.int({ min: 50, max: 500 }) * 10000,
        categoryId: faker.helpers.arrayElement(categoryIds),
        description: 'Sản phẩm thể thao chính hãng chất lượng cao, thiết kế tối ưu, giúp nâng cao hiệu suất thi đấu và trải nghiệm tuyệt vời cho người chơi ở mọi cấp độ.',
        specifications: 'Chất liệu: Siêu nhẹ, bền bỉ | Bảo hành: 3 tháng chính hãng | Phù hợp: Tập luyện và thi đấu',
        stockStatus: 'Còn hàng',
        stockQty: faker.number.int({ min: 5, max: 100 }),
      },
    })
  }

}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
